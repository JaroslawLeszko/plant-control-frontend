import React, {useEffect, useState} from "react";
import {PlantEntity} from 'types';
import { PlantTable } from "./PlantTable";
import {apiUrl} from "../../config/api";
import {Spinner} from "react-bootstrap";

export const PlantList = () => {
    const [data, setData] = useState<PlantEntity[] | null>(null);

    const refreshPlants = async () => {
        setData(null);
        const res = await fetch(`${apiUrl}/`);
        const result = await res.json();
        setData(result.plantList);
    };

    useEffect(() => {
        refreshPlants();
    }, []);

    if (data === null) {
        return <Spinner animation="border" variant="primary"/>
    }

    return <div className="plant-list">
        <PlantTable
            plants={data}
            onPlantsChange={refreshPlants}
        />
    </div>
}
