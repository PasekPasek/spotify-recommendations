import React, { useContext } from 'react';
import {
    Slider, Typography,
} from '@material-ui/core';
import AsyncSelect from 'react-select/async';
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

    const loadArtistsOptions = async (input) => {
        let options = [];
        try {
            const result = await fetch(`/api/spotify/search?type=artist&q=${input.trim()}`);
            const { artists: { items = {} } = {} } = await result.json();
            options = items.map((el) => ({ value: el.id, label: el.name }));
        } catch (err) {
            console.error(err);
        }
        return options;
    };

    const loadTracksOptions = async (input) => {
        let options = [];
        try {
            const result = await fetch(`/api/spotify/search?type=track&q=${input.trim()}`);
            const { tracks: { items = {} } = {} } = await result.json();
            options = items.map((el) => ({ value: el.id, label: `${el.artists[0].name} - ${el.name}` }));
        } catch (err) {
            console.error(err);
        }
        return options;
    };

    return (
        <>
            <p>Recommendations</p>
            <Typography id="discrete-slider-restrict" gutterBottom>
                Artists
            </Typography>
            <AsyncSelect
                isMulti
                cacheOptions
                defaultOptions
                loadOptions={loadArtistsOptions}
            />
            <Typography id="discrete-slider-restrict" gutterBottom>
                Tracks
            </Typography>
            <AsyncSelect
                isMulti
                cacheOptions
                defaultOptions
                loadOptions={loadTracksOptions}
            />
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
