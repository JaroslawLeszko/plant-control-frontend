import React, { useEffect, useState} from "react";
import axios from "axios";
import {apiUrl} from "../../config/api";
// import './PlantImage.css'
import Image from 'react-bootstrap/Image'

interface Props {
    plantSrc: string | undefined;
}

export const PlantImage = (props: Props) => {
    const [img, setImg] = useState('');
    const url = `${apiUrl}/getImage/${props.plantSrc}`;


    const fetchImage = async () => {

        const res = await axios.get(url, {
            responseType: "arraybuffer"
        });
        const imgFile = new Blob([res.data]);
        const imgUrl: string = URL.createObjectURL(imgFile);
        setImg(imgUrl);
    };

    useEffect(() => {
        fetchImage();
    }, [url]);

    return (
        <Image src={img} className="img-fluid rounded-3" alt={props.plantSrc}/>
        // <img src={img} alt={props.plantSrc}/>
    )
}

