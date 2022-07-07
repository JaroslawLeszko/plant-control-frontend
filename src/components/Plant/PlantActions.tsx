import React, {MouseEvent} from "react";

interface Props {
    lastWatering: string,
    lastFertilization: string,
    lastDustRemoval: string,
    id: string,
    name :string,
    onPlantsChange: () => void,
}

export const PlantActions = (props: Props) => {

    const watering = async (event: MouseEvent) => {
        event.preventDefault();

        await fetch(`http://localhost:3001/water/${props.id}`, {
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

        await fetch(`http://localhost:3001/fertilize/${props.id}`, {
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

        await fetch(`http://localhost:3001/dust/${props.id}`, {
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

    // const editPlant = async (event: MouseEvent) => {
    //     event.preventDefault();
    //
    //     await fetch(`http://localhost:3001/edit/${props.id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             lastDustRemoval: new Date(),
    //         }),
    //     });
    //     props.onPlantsChange();
    // };

    const deletePlant = async (event: MouseEvent) => {
        event.preventDefault();

        if (!window.confirm(`Are you sure you want to remove ${props.name}?`)) {
            return;
        }

        const res = await fetch(`http://localhost:3001/${props.id}`, {
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
        <button onClick={watering}>Water</button>
        <button onClick={fertilization}>Fertilize</button>
        <button onClick={removeDust}>Remove Dust</button>
        <button onClick={deletePlant}>Delete</button>
    </>
}
