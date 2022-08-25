import React, {SetStateAction, useEffect, useState} from "react";

interface Props {
    plantSrc: string | undefined;
}

export const PlantImage = (props: Props) => {
    const [img, setImg] = useState();

    const fetchImage = async () => {
        const res = await fetch(`http://localhost:3001/${props.plantSrc}`);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL as SetStateAction<any>);
    };

    useEffect(() => {
        fetchImage();
    }, []);

    return <img src={img} alt=""/>
}

