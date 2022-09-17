import React, {FormEvent, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import './EditPlant.css';
import {Spinner} from "../common/Spinner";

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


    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/${id}`);
            const result = await res.json();
            setEditPlant(result);
        })();
    }, []);
    console.log(editPlant)


    if (editPlant === null) {
        return null;
    }

    const updatePlant = (key: string, value: any) => {
        setEditPlant(editPlant => ({
            ...editPlant,
            [key]: value,
        }));
    };

    const sendForm = async (event: FormEvent) => {
        event.preventDefault();

        setLoading(true);

        try {
            await fetch(`http://localhost:3001/edit/${id}`, {
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
                        <input
                            type="text"
                            defaultValue={editPlant.image}
                            onChange={e => updatePlant('image', e.target.value)}
                        />
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