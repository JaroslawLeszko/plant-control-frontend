import React, {MouseEvent, SetStateAction, useState} from "react";
import {apiUrl} from "../../config/api";
import {PlantEntity} from 'types';
import {PlantImage} from "./PlantImage";
import {Btn} from "../common/Btn";
import {ProgressBar} from "../common/ProgressBar";
import './PlantTableRow.css'

interface Props {
    plant: PlantEntity;
    onPlantsChange: () => void;
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

        await fetch(`${apiUrl}/water/${props.plant.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastWatering: new Date(),
            }),
        });
    };

    const fertilization = async (event: MouseEvent) => {
        event.preventDefault();
        setFertilize(new Date() as SetStateAction<any>);

        await fetch(`${apiUrl}/fertilize/${props.plant.id}`, {
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

        await fetch(`${apiUrl}/dust/${props.plant.id}`, {
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

        const res = await fetch(`${apiUrl}/${props.plant.id}`, {
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
        <table>
            <tbody>
            <div className="table">
                <tr className="table-row">
                    <PlantImage plantSrc={props.plant.image}/>
                    <div className="table-row-info-actions">
                        <div className="table-row-info">
                            <tr className="item-name">{(props.plant.name).toUpperCase()}</tr>
                            <tr>{`Next watering`}</tr>
                            <ProgressBar filerColor={'#a8bcce'} wateringPeriod={props.plant.wateringPeriod}
                                         waterEta={daysToWater}/>
                            <tr>{`Next fertilization`}</tr>
                            <ProgressBar wateringPeriod={props.plant.fertilizationPeriod} waterEta={daysToFertilizer}
                                         filerColor={'#83603c'}/>
                            <tr>{`Last dust removal: ${(new Date(dust)).toDateString()}`}</tr>

                            <tr className="quarantine">{props.plant.quarantine === 0 ? null : "QUARANTINE"}</tr>
                        </div>

                        <tr className="table-row-actions">
                            <Btn className="btn" to={`/edit/${props.plant.id}`} text="Edit"/>
                            <button className="waterBtn" onClick={watering} title="water plant">WATER</button>
                            <button className="fertilizeBtn" onClick={fertilization} title="fertilize plant">FERTILIZE
                            </button>
                            <button className="dustBtn" onClick={removeDust} title="remove dust">DUST</button>
                            <button className="deleteBtn" onClick={deletePlant} title="delete plant">❌</button>
                        </tr>
                    </div>
                </tr>
            </div>
            </tbody>
        </table>
    )
}