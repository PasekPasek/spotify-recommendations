import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import URI from 'urijs';
import isEmpty from 'lodash/isEmpty';
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

const RecommendationList = ({ recommended = [] }) => {
    const renderTile = (item) => {
        const { name, album } = item;
        return (
            <div key={name} style={{ width: 200, height: 200 }}>
                <img alt={name} src={album.images[1].url} style={{ width: '100%' }} />
            </div>
        );
    };

    return (
        <div style={{
            display: 'grid',
            gridGap: 0,
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 200px))',
        }}
        >
            {
                recommended.map((item) => renderTile(item))
            }
        </div>
    );
};

RecommendationList.defaultProps = {
    recommended: [],
};

RecommendationList.propTypes = {
    recommended: PropTypes.arrayOf(PropTypes.object),
};

export default () => {
    const { isLoggedIn } = useContext(SpotifyAuthContext);

    const [artists, setArtists] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [recommended, setRecommended] = useState([]);

    if (!isLoggedIn) {
        return (<p>Log in, please</p>);
    }

    const getRecommendations = async () => {
        try {
            const recommendedURL = new URI('/api/spotify/recommendations');
            recommendedURL.query({
                seed_tracks: tracks.map(({ value }) => value).join(','),
                seed_artists: artists.map(({ value }) => value).join(','),
                limit: 50,
            });
            const result = await fetch(recommendedURL.toString());
            if (!result.ok) {
                setRecommended([]);
            }
            const jsonResult = await result.json();
            const { tracks: recommendedTracks } = jsonResult;

            if (Array.isArray(recommendedTracks) && recommendedTracks.length) {
                setRecommended(recommendedTracks);
            }
        } catch (err) {
            setRecommended([]);
            console.error(err);
        }
    };

    useEffect(() => {
        if (!isEmpty(artists, tracks)) {
            getRecommendations();
        }
    }, [artists, tracks]);

    const loadArtistsOptions = async (input) => {
        let options = [];

        if (!input) {
            return options;
        }

        try {
            const result = await fetch(`/api/spotify/search?type=artist&q=${input.trim()}`);
            const { artists: { items = [] } = {} } = await result.json();
            options = items.map((el) => ({ value: el.id, label: el.name }));
        } catch (err) {
            console.error(err);
        }
        return options;
    };

    const loadTracksOptions = async (input) => {
        let options = [];

        if (!input) {
            return options;
        }

        try {
            const result = await fetch(`/api/spotify/search?type=track&q=${input.trim()}`);
            const { tracks: { items = [] } = {} } = await result.json();
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
                onChange={(selectedArtists) => setArtists(selectedArtists)}
                isMulti
                cacheOptions
                defaultOptions
                loadOptions={loadArtistsOptions}
            />
            <Typography id="discrete-slider-restrict" gutterBottom>
                Tracks
            </Typography>
            <AsyncSelect
                onChange={(selectedTracks) => setTracks(selectedTracks)}
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
            <RecommendationList recommended={recommended} />
        </>
    );
};
