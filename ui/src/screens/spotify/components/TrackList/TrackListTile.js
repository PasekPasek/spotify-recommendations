import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

const TrackListTile = ({
    artists, album, name,
}) => {
    const { images } = album;
    return (
        <Card>
            <CardHeader
                title={name}
                subheader={artists.map((artistData) => artistData.name).join(', ')}
            />
            <CardMedia
                image={images?.[0]?.url}
                title={name}
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
