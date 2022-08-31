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

    useEffect(() => {
        refreshPlants();
    }, []);


    if (data === null) {
        return <p>Loading...</p>
    }

    return <div className="plant-list">
        <PlantTable
            plants={data}
            onPlantsChange={refreshPlants}
        />
    </div>
}
