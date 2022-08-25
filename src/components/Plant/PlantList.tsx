import React, {useEffect, useState} from "react";
import {PlantEntity} from 'types';
import { PlantTable } from "./PlantTable";
import './PlantList.css';

export const PlantList = () => {
    const [data, setData] = useState<PlantEntity[] | null>(null);

    const refreshPlants = async () => {
        setData(null);
        const res = await fetch(`http://localhost:3001/`);
        const result = await res.json();
        setData(result.plantList);
    };

    // const carePlants = async () => {
    //     setData(null);
    //     const res = await fetch(`http://localhost:3001/`);
    //     const result = await res.json();
    //     console.log(result);
    //     setData(result.plantCare);
    // };
    useEffect(() => {
        refreshPlants();
    }, []);

    // useEffect(() => {
    //     carePlants();
    // }, []);

    if (data === null) {
        return <p>Loading...</p>
    }

    return <div className="plant-list">
        <PlantTable
            plants={data}
            onPlantsChange={refreshPlants}
            // onPlantsCare={carePlants}
        />
    </div>
}
