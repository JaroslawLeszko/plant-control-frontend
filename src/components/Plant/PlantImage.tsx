import React, { useEffect, useState} from "react";
import axios from "axios";
import {apiUrl} from "../../config/api";
import './PlantImage.css'

interface Props {
    plantSrc: string | undefined;
}

export const PlantImage = (props: Props) => {
    const [img, setImg] = useState('');
    const url = `${apiUrl}/getImage/${props.plantSrc}`;
    // const url = `http://localhost:3001/get/${props.plantSrc}`;


    const fetchImage = async () => {

        // const res = await fetch(url, {
        //     method: 'GET',
        //     mode: 'cors',
        //     cache: 'no-cache',
        //     headers: {
        //         'Content-Type': 'image/png'
        //     },
        // });
        //
        // const imageBlob = await res.blob();
        // const imageObjectURL: string = URL.createObjectURL(imageBlob);
        // setImg(imageObjectURL);
        //
        const res = await axios.get(url, {
            responseType: "arraybuffer"
        });
        const imgFile = new Blob([res.data]);
        const imgUrl: string = URL.createObjectURL(imgFile);
        setImg(imgUrl);

        // console.log(res.json());
    };

    useEffect(() => {
        fetchImage();
    }, [url]);

    return (
        <img src={img} alt={props.plantSrc}/>
    )
}

