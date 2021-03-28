import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { CardContent, Typography } from '@material-ui/core';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import AlbumIcon from '@material-ui/icons/Album';
import PersonIcon from '@material-ui/icons/Person';
import useTrackListTileStyles from './TrackListTile.styles';

const TrackListTile = (props) => {
    const { artists, album, name } = props;
    const classes = useTrackListTileStyles(props);
    const { images } = album;
    return (
        <Card
            className={classes.root}
        >
            <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                    <AudiotrackIcon />
                    {name}
                </Typography>
                <Typography gutterBottom variant="p" component="p">
                    <AlbumIcon />
                    {album.name}
                </Typography>
                <Typography gutterBottom variant="p" component="p">
                    <PersonIcon />
                    {artists.map((artistData) => artistData.name).join(', ')}
                </Typography>
            </CardContent>
            <CardMedia
                image={images?.[0]?.url}
                title={name}
                height="300"
                component="img"
            />
        </Card>
    );
};

TrackListTile.propTypes = {
    artists: PropTypes.arrayOf(PropTypes.object).isRequired,
    album: PropTypes.objectOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
};

export default TrackListTile;
