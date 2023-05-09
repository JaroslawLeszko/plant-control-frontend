import React, {ChangeEvent, FormEvent, SetStateAction, useState} from 'react';
import {apiUrl} from "../../config/api";
import Form from 'react-bootstrap/Form';
import {Button, Col} from "react-bootstrap";

export const AddPlant = () => {

    const [form, setForm] = useState({
        name: '',
        lastWatering: '',
        wateringPeriod: 0,
        lastFertilization: '',
        fertilizationPeriod: 0,
        lastDustRemoval: '',
        quarantine: 0,
        image: '',

    });

    const [image, setImage] = useState({preview: '', data: ''});
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
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
        const filePath = e.target.files[0].name
        setForm(form => ({
            ...form,
            image: filePath
        }));

    }
    const sendForm = async (event: FormEvent) => {
        event.preventDefault();

        setLoading(true);

        try {
            await fetch(`${apiUrl}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const formData = new FormData()
            formData.append('file', image.data)
            const response = await fetch(`${apiUrl}/add/image`, {
                method: "POST",
                body: formData,

            })
            if (response) setStatus(response.statusText);

        } finally {
            setLoading(false);
        }

    };

    if (loading) {
        return <p>Loading...</p>
    }

    return <>
        <Col xs={12} md={6} xl={4} className="offset-xl-4 offset-md-3 text-center">
            <h2 className="p-4">ADD PLANT TO COLLECTION</h2>

            <Form className="px-5 " onSubmit={sendForm}>
                {image.preview && <img src={image.preview} width='50%' height='auto' />}
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Add image</Form.Label>
                    <Form.Control
                        type="file"
                        name='file'
                        onChange={handleFileChange}
                    />
                    {status && <p>{status}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        minLength={3}
                        maxLength={50}
                        defaultValue={form.name}
                        onChange={e => updateForm('name', e.target.value)}
                        placeholder="Enter plant name"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLastWaterin">
                    <Form.Label>Last watering</Form.Label>
                    <Form.Control
                        type="date"
                        max={new Date().toISOString().split("T")[0]}
                        defaultValue={form.lastWatering}
                        onChange={e => updateForm('lastWatering', e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formWateringPeriod">
                    <Form.Label>Watering period (days)</Form.Label>
                    <Form.Control
                        type="number"
                        min={0}
                        defaultValue={form.wateringPeriod}
                        onChange={e => updateForm('wateringPeriod', Number(e.target.value))}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLastFertilization">
                    <Form.Label>Last Fertilization</Form.Label>
                    <Form.Control
                        type="date"
                        max={new Date().toISOString().split("T")[0]}
                        defaultValue={form.lastFertilization}
                        onChange={e => updateForm('lastFertilization', e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFertilizationPeriod">
                    <Form.Label>Fertilization period (days)</Form.Label>
                    <Form.Control
                        type="number"
                        min={0}
                        defaultValue={form.fertilizationPeriod}
                        onChange={e => updateForm('fertilizationPeriod', Number(e.target.value))}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLastDustRemoval">
                    <Form.Label>Last Dust removal</Form.Label>
                    <Form.Control
                        type="date"
                        max={new Date().toISOString().split("T")[0]}
                        defaultValue={form.lastDustRemoval}
                        onChange={e => updateForm('lastDustRemoval', e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formQuarantine">
                    <Form.Label>Quarantine</Form.Label>
                    <Form.Check
                        type="checkbox"
                        onClick={e => updateForm('quarantine', 1)}
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