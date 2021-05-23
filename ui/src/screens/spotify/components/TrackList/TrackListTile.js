import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { CardContent, Link, Typography } from '@material-ui/core';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import AlbumIcon from '@material-ui/icons/Album';
import PersonIcon from '@material-ui/icons/Person';
import useTrackListTileStyles from './TrackListTile.styles';

const TrackListTile = (props) => {
    const {
        artists, album, name, externalUrls,
    } = props;
    const classes = useTrackListTileStyles(props);
    const { images } = album;
    return (
        <Card
            className={classes.root}
        >
            <CardContent>
                <Link color="textPrimary" className={classes.textWithIcon} href={externalUrls.spotify} target="_blank">
                    <AudiotrackIcon />
                    <Typography gutterBottom variant="h5" component="h5" className={classes.textLabel}>
                        {name}
                    </Typography>
                </Link>
                <Link color="textPrimary" className={classes.textWithIcon} href={album.external_urls.spotify} target="_blank">
                    <AlbumIcon />
                    <Typography gutterBottom variant="h6" component="h6" className={classes.textLabel}>
                        {album.name}
                    </Typography>
                </Link>
                <div className={classes.textWithIcon}>
                    <PersonIcon />
                    <Typography gutterBottom variant="h6" component="h6" className={classes.textLabel}>
                        {artists.map((artistData) => artistData.name).join(', ')}
                    </Typography>
                </div>
            </CardContent>
            <CardMedia
                image={images?.[0]?.url}
                title={name}
                height="200"
                component="img"
            />
        </Card>
    );
};

TrackListTile.propTypes = {
    artists: PropTypes.arrayOf(PropTypes.object).isRequired,
    album: PropTypes.shape({
        images: PropTypes.arrayOf(PropTypes.object),
        name: PropTypes.string,
        external_urls: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
    name: PropTypes.string.isRequired,
    externalUrls: PropTypes.shape({
        spotify: PropTypes.string,
    }).isRequired,
};

export default TrackListTile;
