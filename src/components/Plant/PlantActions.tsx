import React, {MouseEvent} from "react";

interface Props {
    lastWatering: string,
    lastFertilization: string,
    lastDustRemoval: string,
    id: string,
    onPlantsChange: () => void,
}

export const PlantActions = (props: Props) => {

    const watering = async (event: MouseEvent) => {
        event.preventDefault();

        await fetch(`http://localhost:3001/${props.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastWatering: new Date(),
            }),
        });
        props.onPlantsChange();
    };

    const fertilization = async (event: MouseEvent) => {
        event.preventDefault();

        await fetch(`http://localhost:3001/${props.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastFertilization: new Date(),
            }),
        });
        props.onPlantsChange();
    };

    const removeDust = async (event: MouseEvent) => {
        event.preventDefault();

        await fetch(`http://localhost:3001/${props.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastDustRemoval: new Date(),
            }),
        });
        props.onPlantsChange();
    };

    return <>
        <button onClick={watering}>Water</button>
        <button onClick={fertilization}>Fertilize</button>
        <button onClick={removeDust}>Remove Dust</button>

    </>
}
