import React, {MouseEvent, SetStateAction, useMemo, useState} from "react";
import { PlantEntity } from "types";
import {Btn} from "../common/Btn";
import './PlantActions.css';


interface Props {
    plant: PlantEntity;
    onPlantsChange: () => void;
    // onPlantsCare: () => void;
}

export const PlantActions = (props: Props) => {
    // const watering = async (event: MouseEvent) => {
    //     event.preventDefault();
    //     setWater(new Date() as SetStateAction<any>);
    //
    //     await fetch(`http://localhost:3001/water/${props.plant.id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             lastWatering: new Date(),
    //         }),
    //     });
    //
    //     // props.onPlantsChange();
    // };

    // const fertilization = async (event: MouseEvent) => {
    //     event.preventDefault();
    //
    //     await fetch(`http://localhost:3001/fertilize/${props.plant.id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             lastFertilization: new Date(),
    //         }),
    //     });
    //     props.onPlantsChange();
    // };

    // const removeDust = async (event: MouseEvent) => {
    //     event.preventDefault();
    //     setDust(new Date() as SetStateAction<any>)
    //
    //     await fetch(`http://localhost:3001/dust/${props.plant.id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             lastDustRemoval: new Date(),
    //         }),
    //     });
    //     // props.onPlantsChange();
    // };


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

    return <>
        <div className="actions">
            <Btn className="btn" to={`/edit/${props.plant.id}`} text="Edit"/>
            {/*<button className="action-water" onClick={watering}>Water</button>*/}
            {/*<button className="action-fertilize" onClick={fertilization}>Fertilize</button>*/}
            {/*<button className="action-dust" onClick={removeDust}>Remove Dust</button>*/}
            <button className="action-delete" onClick={deletePlant}>Delete</button>
        </div>
        </>
}
