import React, {MouseEvent} from "react";
import {PlantEntity} from 'types';
import {PlantActions} from "./PlantActions";

interface Props {
    plant: PlantEntity;
    onPlantsChange: () => void;
}

export const PlantTableRow = (props: Props) => {
    const waterEta = Date.parse(String(props.plant.lastWatering)) + ((props.plant.wateringPeriod + 1) * 1000 * 60 * 60 * 24) - Date.now();
    const daysToWater = waterEta > 0 ? Math.floor(waterEta / (1000 * 60 * 60 * 24)) : 0;

    const fertilizerEta = Date.parse(String(props.plant.lastFertilization)) + ((props.plant.fertilizationPeriod + 1) * 1000 * 60 * 60 * 24) - Date.now();
    const daysToFertilizer = fertilizerEta > 0 ? Math.floor(fertilizerEta / (1000 * 60 * 60 * 24)) : 0;

    // const dustRemoveEta = Date.parse(String(props.plant.lastDustRemoval)) - Date.now();
    // const daysToDustRemove = dustRemoveEta > 0 ? Math.floor(dustRemoveEta / (1000 * 60 * 60 * 24)) : 0;


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
        <tr>
            <th>{props.plant.image}</th>
            <tr>{props.plant.name}</tr>
            <tr>{`Next watering ${daysToWater} days`}</tr>
            <tr>{`Next fertilization ${daysToFertilizer} days`}</tr>
            <tr>{`Last dust removal ${Date.parse(props.plant.lastDustRemoval)}`}</tr>
            <tr>{props.plant.quarantine}</tr>

            <tr>
                <button onClick={deletePlant}>Delete</button>
            </tr>
            <tr>
                <PlantActions
                    lastWatering={props.plant.lastWatering}
                    lastFertilization={props.plant.lastFertilization}
                    lastDustRemoval={props.plant.lastDustRemoval}
                    id={props.plant.id as string}
                    onPlantsChange={props.onPlantsChange}
                />
            </tr>
        </tr>
    )
}