import React, {SetStateAction, useEffect, useState} from "react";
import {PlantEntity} from 'types';
import {PlantActions} from "./PlantActions";
import './PlantTableRow.css'


interface Props {
    plant: PlantEntity;
    onPlantsChange: () => void;
}

export const PlantTableRow = (props: Props) => {
    const waterEta = Date.parse(String(props.plant.lastWatering)) + ((props.plant.wateringPeriod + 1) * 1000 * 60 * 60 * 24) - Date.now();
    const daysToWater = waterEta > 0 ? Math.floor(waterEta / (1000 * 60 * 60 * 24)) : 0;

    const fertilizerEta = Date.parse(String(props.plant.lastFertilization)) + ((props.plant.fertilizationPeriod + 1) * 1000 * 60 * 60 * 24) - Date.now();
    const daysToFertilizer = fertilizerEta > 0 ? Math.floor(fertilizerEta / (1000 * 60 * 60 * 24)) : 0;

    const [img, setImg] = useState();

    const fetchImage = async () => {
        const res = await fetch(`http://localhost:3001/${props.plant.image}`);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL as SetStateAction<any>);
    };

    useEffect(() => {
        fetchImage();
    }, []);


    return (
        <div >
            <tr className="table-row">
                <img src={img}  alt={props.plant.image}/>
                <div className="table-row-info-actions">
                    <div className="table-row-info">
                        <tr className="item-name">{(props.plant.name).toUpperCase()}</tr>
                        <tr>{`Next watering ${daysToWater} days`}</tr>
                        <tr>{`Next fertilization ${daysToFertilizer} days`}</tr>
                        <tr>{`Last dust removal ${(new Date(props.plant.lastDustRemoval)).toDateString()}`}</tr>
                        <tr className="quarantine">{props.plant.quarantine === 0 ? null : "QUARANTINE"}</tr>
                    </div>

                    <tr className="table-row-actions">
                        <PlantActions
                            plant={props.plant}
                            onPlantsChange={props.onPlantsChange}
                        />
                    </tr>
                </div>
            </tr>
        </div>
    )
}