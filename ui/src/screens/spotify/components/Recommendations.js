import React, { useContext } from 'react';
import {
    Slider, Typography,
} from '@material-ui/core';
import { SpotifyAuthContext } from '../contexts/auth';

const marks = [
    {
        value: 0,
        label: '0°C',
    },
    {
        value: 20,
        label: '20°C',
    },
    {
        value: 37,
        label: '37°C',
    },
    {
        value: 100,
        label: '100°C',
    },
];

export default () => {
    const { isLoggedIn } = useContext(SpotifyAuthContext);

    if (!isLoggedIn) {
        return (<p>Log in, please</p>);
    }

    return (
        <>
            <p>Recommendations</p>
            <Typography id="discrete-slider-restrict" gutterBottom>
                Simple slider
            </Typography>
            <Slider
                defaultValue={20}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
            />
        </>
    );
};
