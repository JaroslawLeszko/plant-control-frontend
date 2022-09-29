import React, {ChangeEvent, FormEvent, SetStateAction, useState} from 'react';
import {Link} from "react-router-dom";
import './AddPlant.css';
import {apiUrl} from "../../config/api";



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
            const res = await fetch(`${apiUrl}/`, {
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
            await res.json();
        } finally {
            setLoading(false);
        }

    };

    if (loading) {
        return <p>Loading...</p>
    }

    return <>
        <div className="add">
            <h2>ADD PLANT TO COLLECTION</h2>

            <form className="add-form" onSubmit={sendForm}>
                <p>
                    <label>
                        Image: <br/>
                        {image.preview && <img src={image.preview} alt={"image"} width='512' height='512' />}
                        <input
                            type="file"
                            name='file'
                            onChange={handleFileChange}

                        />
                        {status && <p>{status}</p>}
                    </label>
                </p>

                <p>
                    <label>
                        Name: <br/>
                        <input
                            type="text"
                            minLength={3}
                            maxLength={50}
                            defaultValue={form.name}
                            onChange={e => updateForm('name', e.target.value)}

                        />
                    </label>
                </p>
                <p>
                    <label>
                        Last watering: <br/>
                        <input
                            type="date"
                            defaultValue={form.lastWatering}
                            onChange={e => updateForm('lastWatering', e.target.value)}
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Watering period (days): <br/>
                        <input
                            type="number"
                            min={0}
                            defaultValue={form.wateringPeriod}
                            onChange={e => updateForm('wateringPeriod', Number(e.target.value))}
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Last Fertilization: <br/>
                        <input
                            type="date"
                            defaultValue={form.lastFertilization}
                            onChange={e => updateForm('lastFertilization', e.target.value)}
                        />
                    </label>
                </p>

                <p>
                    <label>
                        Fertilization period (days): <br/>
                        <input
                            type="number"
                            min={0}
                            defaultValue={form.fertilizationPeriod}
                            onChange={e => updateForm('fertilizationPeriod', Number(e.target.value))}
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Last Dust removal: <br/>
                        <input
                            type="date"
                            defaultValue={form.lastDustRemoval}
                            onChange={e => updateForm('lastDustRemoval', e.target.value)}
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Quarantine: <br/>
                        <input
                            type="checkbox"
                            onClick={e => updateForm('quarantine', 1)}/>
                    </label>
                </p>

                <button type="submit">Save</button>
            </form>
            <Link className="add-back-btn" to="/">Back</Link>
        </div>
    </>
};