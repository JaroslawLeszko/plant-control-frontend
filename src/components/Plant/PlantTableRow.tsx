import React, {MouseEvent, SetStateAction, useState} from "react";
import {apiUrl} from "../../config/api";
import {PlantEntity} from 'types';
import {PlantImage} from "./PlantImage";
import {Progress} from "../common/ProgressBar";
import './PlantTableRow.css'
import {Row, Col, Container, Button} from "react-bootstrap";


interface Props {
    plant: PlantEntity;
    onPlantsChange: () => void;
}

export const PlantTableRow = (props: Props) => {
    const [dust, setDust] = useState(props.plant.lastDustRemoval);
    const [water, setWater] = useState(props.plant.lastWatering);
    const [fertilize, setFertilize] = useState(props.plant.lastFertilization);

    const waterEta = Date.parse(String(water)) + ((props.plant.wateringPeriod + 1) * 1000 * 60 * 60 * 24) - Date.now();
    const daysToWater = waterEta > 0 ? Math.floor(waterEta / (1000 * 60 * 60 * 24)) : 0;

    const fertilizerEta = Date.parse(String(fertilize)) + ((props.plant.fertilizationPeriod + 1) * 1000 * 60 * 60 * 24) - Date.now();
    const daysToFertilizer = fertilizerEta > 0 ? Math.floor(fertilizerEta / (1000 * 60 * 60 * 24)) : 0;


    const watering = async (event: MouseEvent) => {
        event.preventDefault();
        setWater(new Date() as SetStateAction<any>);

        await fetch(`${apiUrl}/water/${props.plant.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastWatering: new Date(),
            }),
        });
    };

    const fertilization = async (event: MouseEvent) => {
        event.preventDefault();
        setFertilize(new Date() as SetStateAction<any>);

        await fetch(`${apiUrl}/fertilize/${props.plant.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastFertilization: new Date(),
            }),
        });
    };

    const removeDust = async (event: MouseEvent) => {
        event.preventDefault();
        setDust(new Date() as SetStateAction<any>)

        await fetch(`${apiUrl}/dust/${props.plant.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastDustRemoval: new Date(),
            }),
        })
    };
    const deletePlant = async (event: MouseEvent) => {
        event.preventDefault();

        if (!window.confirm(`Are you sure you want to remove ${props.plant.name}?`)) {
            return;
        }

        const res = await fetch(`${apiUrl}/${props.plant.id}`, {
            method: 'DELETE',
        });

        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            alert(`Error occurred: ${error.message}`);
            return;
        }
        props.onPlantsChange();
    };
    return (
        <Container className="bg-primary rounded-3 w-auto">
            <Row className="text-center mb-2 py-3">
                <Col sm={12} md={8} lg={4}>
                    <PlantImage plantSrc={props.plant.image}/>
                </Col>
                <Col sm={12} md={8} lg={4}>
                    <Row className="my-3">
                        <h4>{(props.plant.name).toUpperCase()}</h4>
                    </Row>
                    <Row className="m-1 pt-1 mt-lg-5">Next watering</Row>
                    <Progress variant="info" period={props.plant.wateringPeriod} eta={daysToWater}/>
                    <Row className="m-1 pt-1 mt-lg-5">Next fertilization</Row>
                    <Progress variant="warning" period={props.plant.fertilizationPeriod} eta={daysToFertilizer}/>
                    <Row className="m-1 pt-1 mt-lg-5">
                        Last dust removal: {(new Date(dust)).toDateString()}
                    </Row>
                    <Row className="m-1 my-lg-5">
                        {props.plant.quarantine === 0 ? null : <div className="alert alert-custom" role="alert">
                            QUARANTINE
                        </div>}

                    </Row>
                </Col>
                <Col sm={12} md={8} lg={4}>
                    <Row>
                        <a className="btn btn-primary my-3 text-white text-uppercase" href={`/edit/${props.plant.id}`} role="button">Edit</a>
                    </Row>
                    <Row className="m-1 mt-lg-5">
                        <Button className="my-1 my-lg-2" variant="info" onClick={watering}>Water</Button>
                        <Button className="my-1 my-lg-2" variant="warning" onClick={fertilization}>fertilize</Button>
                        <Button className="my-1 my-lg-2" variant="dark" onClick={removeDust}>remove dust</Button>
                        <Button className="my-1 my-lg-2" variant="primary" onClick={deletePlant}>❌</Button>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}