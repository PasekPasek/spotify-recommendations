import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import URI from 'urijs';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import { SpotifyAuthContext } from '../../contexts/auth';
import TrackList from '../TrackList';
import SeedSelect from '../SeedSelect';

const Recommendations = ({ classes }) => {
    const { isLoggedIn } = useContext(SpotifyAuthContext);

    const [artists, setArtists] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [genres, setGenres] = useState([]);
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
                seed_genres: genres.map(({ value }) => value).join(','),
                limit: 100,
            });
            const result = await fetch(recommendedURL.toString());
            if (!result.ok) {
                setRecommended([]);
            }
            const jsonResult = await result.json();
            console.log('🚀 ~ file: Recommendations.js ~ line 86 ~ getRecommendations ~ jsonResult', jsonResult);
            const { tracks: recommendedTracks } = jsonResult;

            if (Array.isArray(recommendedTracks)) {
                setRecommended(recommendedTracks);
            }
        } catch (err) {
            setRecommended([]);
            console.error(err);
        }
    };

    useEffect(() => {
        getRecommendations();
    }, [artists, tracks, genres]);

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

    const loadGenresOptions = async (input) => {
        let options = [];

        if (!input) {
            return options;
        }

        try {
            const result = await fetch('/api/spotify/genre-seeds');
            console.log('🚀 ~ file: Recommendations.js ~ line 96 ~ loadGenresOptions ~ result', result);
            const { genres: fetchedGenres } = await result.json();
            options = fetchedGenres.map((el) => ({ value: el, label: `${el.split('-').join(' ')}` }));
        } catch (err) {
            console.error(err);
        }
        return options;
    };

    return (
        <>
            <div className={classes.seeds}>
                <div className={classes.seedSelect}>
                    <SeedSelect
                        label="Artists"
                        setSelected={setArtists}
                        loadOptions={loadArtistsOptions}
                    />
                </div>
                <div className={classes.seedSelect}>
                    <SeedSelect
                        className={classes.seedSelect}
                        label="Tracks"
                        setSelected={setTracks}
                        loadOptions={loadTracksOptions}
                    />
                </div>
                <div className={classes.seedSelect}>
                    <SeedSelect
                        className={classes.seedSelect}
                        label="Genres"
                        setSelected={setGenres}
                        loadOptions={loadGenresOptions}
                    />
                </div>
            </div>
            <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={() => getRecommendations()}
            >
                Refresh
            </Button>
            <TrackList recommended={recommended} />
        </>
    );
};

Recommendations.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const styles = {
    seeds: {
        display: 'flex',
        width: '100%',
        margin: '20px 0',
        gap: 15,
    },
    seedSelect: {
        flexBasis: '50%',
    },
};

export default withStyles(styles)(Recommendations);
