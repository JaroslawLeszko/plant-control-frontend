import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';

interface Props {
    period: number;
    eta: number;
    variant: string;
}

export const Progress = (props: Props) => {
    const progressWidth = Number(100 / props.period);
    const progress = progressWidth * props.eta;
    return <ProgressBar className="" variant={`${props.variant}`} now={progress} label={`${props.eta} days`}/>;
}

