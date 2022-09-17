import React from "react";
import './ProgressBar.css';

interface Props {
    wateringPeriod: number;
    waterEta: number;
    filerColor: string;
}

export const ProgressBar = (props: Props) => {
    const progressWidth = Number(100 / props.wateringPeriod);
    const progress = progressWidth * props.waterEta;

    const containerStyles = {
        height: 20,
        width: '50%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 10
    }

    const fillerStyles = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: props.filerColor,
        borderRadius: 50,
        // textAlign: 'right',
    }

    const labelStyles = {
        padding: 10,
        color: 'black',
        fontWeight: 'bold',
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${props.waterEta} days`}</span>
            </div>
        </div>
    );
};
