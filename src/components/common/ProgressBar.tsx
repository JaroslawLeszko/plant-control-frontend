import React from "react";

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
    }

    const fillerStyles = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: props.filerColor,
        borderRadius: 50,
    }

    const labelStyles = {
        padding: 10,
        color: 'black',
        fontWeight: 'bold',
        whiteSpace: 'nowrap' as 'nowrap',
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${props.waterEta} days`}</span>
            </div>
        </div>
    );
};
