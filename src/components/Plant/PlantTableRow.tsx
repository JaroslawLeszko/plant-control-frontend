import React, {MouseEvent, SetStateAction, useEffect, useState} from "react";
import {PlantEntity} from 'types';
import {PlantActions} from "./PlantActions";
import './PlantTableRow.css'
import './PlantActions.css'
import {PlantImage} from "./PlantImage";


interface Props {
    plant: PlantEntity;
    onPlantsChange: () => void;
    // onPlantsCare: () => void;
}

export const PlantTableRow = (props: Props) => {
    const [dust, setDust] = useState(props.plant.lastDustRemoval);
    const [water, setWater] = useState(props.plant.lastWatering);
    const [fertilize, setFertilize] = useState(props.plant.lastFertilization);

    const waterEta = Date.parse(String(water)) + ((props.plant.wateringPeriod + 1) * 1000 * 60 * 60 * 24) - Date.now();
    const daysToWater = waterEta > 0 ? Math.floor(waterEta / (1000 * 60 * 60 * 24)) : 0;

    const fertilizerEta = Date.parse(String(fertilize)) + ((props.plant.fertilizationPeriod + 1) * 1000 * 60 * 60 * 24) - Date.now();
    const daysToFertilizer = fertilizerEta > 0 ? Math.floor(fertilizerEta / (1000 * 60 * 60 * 24)) : 0;

    const watering = async (event: MouseEvent) => {
        event.preventDefault();
        setWater(new Date() as SetStateAction<any>);

        await fetch(`http://localhost:3001/water/${props.plant.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastWatering: new Date(),
            }),
        });

        // props.onPlantsChange();
    };

    const fertilization = async (event: MouseEvent) => {
        event.preventDefault();
        setFertilize(new Date() as SetStateAction<any>);

        await fetch(`http://localhost:3001/fertilize/${props.plant.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastFertilization: new Date(),
            }),
        });
    };

    const removeDust = async (event: MouseEvent) => {
        event.preventDefault();
        setDust(new Date() as SetStateAction<any>)

        await fetch(`http://localhost:3001/dust/${props.plant.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastDustRemoval: new Date(),
            }),
        })
    };
    const deletePlant = async (event: MouseEvent) => {
        event.preventDefault();

        if (!window.confirm(`Are you sure you want to remove ${props.plant.name}?`)) {
            return;
        }

        const res = await fetch(`http://localhost:3001/${props.plant.id}`, {
            method: 'DELETE',
        });

        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            alert(`Error occurred: ${error.message}`);
            return;
        }

        props.onPlantsChange();
    };


    return (
        <div>
            <tr className="table-row">
                <PlantImage plantSrc={props.plant.image}/>
                <div className="table-row-info-actions">
                    <div className="table-row-info">
                        <tr className="item-name">{(props.plant.name).toUpperCase()}</tr>
                        <tr>{`Next watering: ${daysToWater} days`} </tr>
                        <tr>{`Next fertilization: ${daysToFertilizer} days`} </tr>
                        <tr>{`Last dust removal: ${(new Date(dust)).toDateString()}`}</tr>

                        <tr className="quarantine">{props.plant.quarantine === 0 ? null : "QUARANTINE"}</tr>
                    </div>

                    <tr className="table-row-actions">
                        <button onClick={watering}>woda</button>
                        <button onClick={fertilization}>nawóz</button>
                        <button onClick={removeDust}>kurz</button>
                        <button onClick={deletePlant}>usuń</button>
                    </tr>
                </div>
            </tr>
        </div>
    )
}