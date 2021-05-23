import React, {
    useContext, useEffect, useRef, useState,
} from 'react';
import URI from 'urijs';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useTheme } from '@material-ui/core';
import { SpotifyAuthContext } from '../../contexts/auth';
import TrackList from '../TrackList';
import SeedSelect from '../SeedSelect';
import useRecommendationsStyles from './Recommendations.styles';

const Recommendations = () => {
    const classes = useRecommendationsStyles();
    const { isLoggedIn } = useContext(SpotifyAuthContext);
    const [artists, setArtists] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [isStickyHeader, setStickyHeader] = useState(false);
    const theme = useTheme();
    const toolbarRef = useRef(null);

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
            const { tracks: recommendedTracks } = jsonResult;

            if (Array.isArray(recommendedTracks)) {
                setRecommended(recommendedTracks);
            }
        } catch (err) {
            setRecommended([]);
            console.error(err);
        }
    };

    const handleScroll = () => {
        if (window.pageYOffset > 64) {
            if (!isStickyHeader) setStickyHeader(true);
        } else {
            setStickyHeader(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll');
        };
    }, []);

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

    const toolbarStyles = isStickyHeader ? {
        position: 'fixed',
        top: 0,
        width: '100%',
        background: theme.palette.background.default,
        paddingRight: 48,
    } : {};

    const listStyles = isStickyHeader ? {
        paddingTop: toolbarRef.current.clientHeight,
    } : {};

    return (
        <>
            <div className={classes.toolbar} style={toolbarStyles} ref={toolbarRef}>
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
            </div>
            <div style={listStyles}>
                <TrackList recommended={recommended} />
            </div>
        </>
    );
};

Recommendations.propTypes = {};

export default Recommendations;
