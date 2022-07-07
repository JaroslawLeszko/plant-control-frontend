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


    return (
        <tr>
            <th>{props.plant.image}</th>
            <tr>{props.plant.name}</tr>
            <tr>{`Next watering ${daysToWater} days`}</tr>
            <tr>{`Next fertilization ${daysToFertilizer} days`}</tr>
            <tr>{`Last dust removal ${(new Date(props.plant.lastDustRemoval)).toDateString()}`}</tr>
            <tr>{props.plant.quarantine === 0 ? null : "quarantine"}</tr>


            <tr>
                <PlantActions
                    lastWatering={props.plant.lastWatering}
                    lastFertilization={props.plant.lastFertilization}
                    lastDustRemoval={props.plant.lastDustRemoval}
                    name={props.plant.name}
                    id={props.plant.id as string}
                    onPlantsChange={props.onPlantsChange}
                />
            </tr>
        </tr>
    )
}