import React, {ChangeEvent, FormEvent, SetStateAction, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {apiUrl} from "../../config/api";
import Form from "react-bootstrap/Form";
import {Button, Col, Spinner} from "react-bootstrap";

export const EditPlant = () => {
    const [editPlant, setEditPlant] = useState({
        name: '',
        wateringPeriod: '',
        fertilizationPeriod: '',
        image: '',
        quarantine: 0,

    });

    useEffect(() => {
        (async () => {
            const res = await fetch(`${apiUrl}/${id}`);
            const result = await res.json();
            setEditPlant(result);
        })();
    }, []);

    const {id} = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [image, setImage] = useState({preview: '', data: ''});


    if (editPlant === null) {
        return null;
    }

    const updatePlant = (key: string, value: any) => {
        setEditPlant(editPlant => ({
            ...editPlant,
            [key]: value,
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return

        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img as SetStateAction<any>);
        const filePath = e.target.files[0].name;
        setEditPlant(editPlant => ({
            ...editPlant,
            image: filePath,
        }));

    }

    const sendForm = async (event: FormEvent) => {
        event.preventDefault();

        setLoading(true);

        try {
            const formData = new FormData()
            formData.append('file', image.data)
            await fetch(`${apiUrl}/add/image`, {
                method: "POST",
                body: formData,

            })

            await fetch(`${apiUrl}/edit/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: editPlant.name,
                    wateringPeriod: editPlant.wateringPeriod,
                    fertilizationPeriod: editPlant.fertilizationPeriod,
                    image: editPlant.image,
                    quarantine: editPlant.quarantine,
                }),
            });

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner animation="border" variant="primary"/>
    }

    return <>
        <Col xs={12} md={6} xl={4} className="offset-xl-4 offset-md-3 text-center">
            <h2 className="p-4">EDIT PLANT INFO</h2>

            <Form className="px-5 " onSubmit={sendForm}>
                <Button variant="danger" className="mx-5 my-2" onClick={e => updatePlant('image', null)}>Delete
                    image</Button>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Change image</Form.Label>
                    <Form.Control
                        type="file"
                        name='file'
                        onChange={handleFileChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        minLength={3}
                        maxLength={50}
                        defaultValue={editPlant.name}
                        onChange={e => updatePlant('name', e.target.value)}
                        placeholder="Enter plant name"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formWateringPeriod">
                    <Form.Label>Watering period (days)</Form.Label>
                    <Form.Control
                        type="number"
                        min={0}
                        defaultValue={editPlant.wateringPeriod}
                        onChange={e => updatePlant('wateringPeriod', Number(e.target.value))}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFertilizationPeriod">
                    <Form.Label>Fertilization period (days)</Form.Label>
                    <Form.Control
                        type="number"
                        min={0}
                        defaultValue={editPlant.fertilizationPeriod}
                        onChange={e => updatePlant('fertilizationPeriod', Number(e.target.value))}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formQuarantine">
                    <Form.Label>Quarantine</Form.Label>
                    <Form.Check
                        type="checkbox"
                        defaultValue={editPlant.quarantine}
                        onChange={e => updatePlant('quarantine', editPlant.quarantine === 0 ? 1 : 0)}
                        checked={editPlant.quarantine === 1}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
            <a className="btn btn-primary mx-5 my-2" href="/" role="button">Back</a>
        </Col>
    </>
};