import React from "react";
import {PlantEntity} from 'types';
import { PlantTableRow } from "./PlantTableRow";
import './PlantTable.css'

interface Props {
    plants: PlantEntity[];
    onPlantsChange: () => void;
    // onPlantsCare: () => void;
}

export const PlantTable = (props: Props) => (
    <table className="plant-table">
        <tbody>
        {
            props.plants.map(plant =>
                <PlantTableRow
                    plant={plant} key={plant.id}
                    onPlantsChange={props.onPlantsChange}
                    // onPlantsCare={props.onPlantsCare}
                />
            )
        }
        </tbody>
    </table>
)