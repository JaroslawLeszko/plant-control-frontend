import React, {FormEvent, useState} from 'react';


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

    const [loading, setLoading] = useState<boolean>(false);

    const updateForm = (key:string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await fetch(`http://localhost:3001/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            // const data: PlantEntity = await res.json();
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>
    }

    return <form onSubmit={sendForm}>
        <h2>Add plant to collection</h2>
        <p>
            <label>
                Name: <br/>
                <input
                    type="text"
                    value={form.name}
                    onChange={e => updateForm('name', e.target.value)}
                />
            </label>
        </p>
        <p>
            <label>
                Last watering: <br/>
                <input
                    type="date"
                    value={form.lastWatering}
                    onChange={e => updateForm('lastWatering', e.target.value)}
                />
            </label>
        </p>
        <p>
            <label>
                Watering period (days): <br/>
                <input
                    type="number"
                    value={form.wateringPeriod}
                    onChange={e => updateForm('wateringPeriod', Number(e.target.value))}
                />
            </label>
        </p>
        <p>
            <label>
                Last Fertilization: <br/>
                <input
                    type="date"
                    value={form.lastFertilization}
                    onChange={e => updateForm('lastFertilization', e.target.value)}
                />
            </label>
        </p>

        <p>
            <label>
                Fertilization period (days): <br/>
                <input
                    type="number"
                    value={form.fertilizationPeriod}
                    onChange={e => updateForm('fertilizationPeriod', Number(e.target.value))}
                />
            </label>
        </p>

        <p>
            <label>
                Last Dust removal: <br/>
                <input
                    type="date"
                    value={form.lastDustRemoval}
                    onChange={e => updateForm('lastDustRemoval', e.target.value)}
                />
            </label>
        </p>
        <p>
            <label>
                Quarantine: <br/>
                <button type="reset" onClick={e => updateForm('quarantine', 1)}>Yes</button>
                <button type="reset" onClick={e => updateForm('quarantine', 0)}>No</button>
             </label>
        </p>
        <p>
            <label>
                Image (add URL): <br/>
                <input
                    type="url"
                    value={form.image}
                    onChange={e => updateForm('image', e.target.value)}
                />
            </label>
        </p>
        <button type="submit">Save</button>
    </form>;
};