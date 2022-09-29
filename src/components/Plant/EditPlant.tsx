import React, {ChangeEvent, FormEvent, SetStateAction, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {apiUrl} from "../../config/api";
import {Spinner} from "../common/Spinner";
import './EditPlant.css';


export const EditPlant = () => {
    const [editPlant, setEditPlant] = useState({
        name: '',
        wateringPeriod: '',
        fertilizationPeriod: '',
        image: '',
        quarantine: 0,

    });
    const {id} = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [image, setImage] = useState({preview: '', data: ''});
    const [status, setStatus] = useState('');


    useEffect(() => {
        (async () => {
            const res = await fetch(`${apiUrl}/${id}`);
            const result = await res.json();
            setEditPlant(result);
        })();
    }, []);


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
        const filePath = e.target.files[0].name
        setEditPlant(editPlant => ({
            ...editPlant,
            image: filePath,
        }));

    }

    const sendForm = async (event: FormEvent) => {
        event.preventDefault();

        setLoading(true);

        try {
            const res = await fetch(`${apiUrl}/edit/${id}`, {
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
        return <Spinner/>
    }

    return <>
        <div className="edit">
            <h2>EDIT PLANT INFO</h2>
            <form className="add-form" onSubmit={sendForm}>

                <p>
                    <label>
                        Name: <br/>
                        <input
                            type="text"
                            minLength={3}
                            maxLength={50}
                            defaultValue={editPlant.name}
                            onChange={e => updatePlant('name', e.target.value)}
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Watering period: <br/>
                        <input
                            type="number"
                            min={0}
                            defaultValue={editPlant.wateringPeriod}
                            onChange={e => updatePlant('wateringPeriod', e.target.value)}
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Fertilization period: <br/>
                        <input
                            type="number"
                            min={0}
                            defaultValue={editPlant.fertilizationPeriod}
                            onChange={e => updatePlant('fertilizationPeriod', e.target.value)}
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Image: <br/>
                        {image.preview && <img src={image.preview} alt={"image"} width='500' height='500' />}
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
                        Quarantine: <br/>
                        <input
                            type="checkbox"
                            defaultValue={editPlant.quarantine}
                            onChange={e => updatePlant('quarantine', editPlant.quarantine === 0 ? 1 : 0)}
                            checked={editPlant.quarantine === 1}
                        />
                    </label>
                </p>
                <button type="submit">Save</button>
            </form>
            <Link className="edit-back-btn" to="/">Back</Link>
        </div>
    </>
};