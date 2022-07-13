import React, {useEffect, useState} from "react";
import axios from "axios";
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

    const [src, setSrc] = useState<string>('');

    const fetchImage = async () => {
        const url = `http://localhost:3001/${props.plant.image}`
        axios.get(url, {responseType: 'blob'})
            .then(res => {
                const imageUrl = URL.createObjectURL(res.data);
                setSrc(imageUrl);
            })
    }
    console.log(src)

    useEffect(() => {
        fetchImage();
    }, []);


    return (
        <tr>
            <th><img src={src}  alt={props.plant.image} width="100" height="100"/></th>
            <tr>{props.plant.name}</tr>
            <tr>{`Next watering ${daysToWater} days`}</tr>
            <tr>{`Next fertilization ${daysToFertilizer} days`}</tr>
            <tr>{`Last dust removal ${(new Date(props.plant.lastDustRemoval)).toDateString()}`}</tr>
            <tr>{props.plant.quarantine === 0 ? null : "quarantine"}</tr>


            <tr>
                <PlantActions
                    plant={props.plant}
                    onPlantsChange={props.onPlantsChange}
                />
            </tr>
        </tr>
    )
}