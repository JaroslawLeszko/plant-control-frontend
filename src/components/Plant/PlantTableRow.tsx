import React, {MouseEvent, SetStateAction, useState} from "react";
import {apiUrl} from "../../config/api";
import {PlantEntity} from 'types';
import {PlantImage} from "./PlantImage";
import {Btn} from "../common/Btn";
// import {ProgressBar} from "../common/ProgressBar";
import {Progress} from "../common/ProgressBar";
// import './PlantTableRow.css'
import {Row, Col, Container, Button} from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";

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


    // return (
    //     <table>
    //         <tbody>
    //         <div className="table">
    //             <tr className="table-row">
    //                 <PlantImage plantSrc={props.plant.image}/>
    //                 <div className="table-row-info-actions">
    //                     <div className="table-row-info">
    //                         <tr className="item-name">{(props.plant.name).toUpperCase()}</tr>
    //                         <tr>{`Next watering`}</tr>
    //                         <ProgressBar filerColor={'#a8bcce'} wateringPeriod={props.plant.wateringPeriod}
    //                                      waterEta={daysToWater}/>
    //                         <tr>{`Next fertilization`}</tr>
    //                         <ProgressBar wateringPeriod={props.plant.fertilizationPeriod} waterEta={daysToFertilizer}
    //                                      filerColor={'#83603c'}/>
    //                         <tr>{`Last dust removal: ${(new Date(dust)).toDateString()}`}</tr>
    //
    //                         <tr className="quarantine">{props.plant.quarantine === 0 ? null : "QUARANTINE"}</tr>
    //                     </div>
    //
    //                     <tr className="table-row-actions">
    //                         <Btn className="btn" to={`/edit/${props.plant.id}`} text="Edit"/>
    //                         <button className="waterBtn" onClick={watering} title="water plant">WATER</button>
    //                         <button className="fertilizeBtn" onClick={fertilization} title="fertilize plant">FERTILIZE
    //                         </button>
    //                         <button className="dustBtn" onClick={removeDust} title="remove dust">DUST</button>
    //                         <button className="deleteBtn" onClick={deletePlant} title="delete plant">❌</button>
    //                     </tr>
    //                 </div>
    //             </tr>
    //         </div>
    //         </tbody>
    //     </table>
    // )
    return (
        <Container fluid="sm" className="bg-primary mx-5 my-2 p-4 rounded-3">
            <Row>
                <Col xs={12} md={6} xl={4} className="">
                    <PlantImage plantSrc={props.plant.image}/>
                </Col>
                <Col xs={12} md={6} xl={4} className="">
                    <Row className="my-2 mx-0 py-3">
                        <h4>{(props.plant.name).toUpperCase()}</h4>
                    </Row>
                    <Row className="my-2 mx-0 py-1">Next watering</Row>
                    <Progress variant="info" period={props.plant.wateringPeriod} eta={daysToWater}/>
                    <Row className="my-2 mx-0 py-1">Next fertilization</Row>
                    <Progress variant="warning" period={props.plant.fertilizationPeriod} eta={daysToFertilizer}/>
                    <Row className="my-2 mx-0 py-3">
                        Last dust removal: {(new Date(dust)).toDateString()}
                    </Row>
                    <Row className="my-2 mx-0 py-3">
                        {props.plant.quarantine === 0 ? null : <div className="alert alert-danger" role="alert">
                            QUARANTINE
                        </div>}

                    </Row>
                </Col>
                <Col xs={12} md={6} xl={4}>
                    <Row>
                        <a className="btn btn-primary px-5 my-3" href={`/edit/${props.plant.id}`} role="button">Edit</a>
                    </Row>
                    <Row className="px-5">
                        <Button className="m-1" variant="info" onClick={watering}>Water</Button>
                        <Button className="m-1" variant="warning" onClick={fertilization}>fertilize</Button>
                        <Button className="m-1" variant="dark" onClick={removeDust}>remove dust</Button>
                        <Button className="m-1" variant="primary" onClick={deletePlant}>❌</Button>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}