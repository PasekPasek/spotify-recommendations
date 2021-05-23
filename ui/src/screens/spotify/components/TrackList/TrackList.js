import React from 'react';
import PropTypes from 'prop-types';
import TrackListTile from './TrackListTile';

const TrackList = ({ recommended = [] }) => {
    const renderTile = (item, index) => {
        const {
            name, album, artists, uri, external_urls: externalUrls,
        } = item;
        return (
            <div
                key={`${index}-${name}`}
                style={{
                    overflow: 'hidden',
                    flexBasis: 300,
                    flexGrow: 1,
                }}
            >
                <TrackListTile
                    name={name}
                    album={album}
                    artists={artists}
                    uri={uri}
                    externalUrls={externalUrls}
                />
            </div>
        );
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 15,
        }}
        >
            {
                recommended.map(renderTile)
            }
        </div>
    );
};

TrackList.defaultProps = {
    recommended: [],
};

TrackList.propTypes = {
    recommended: PropTypes.arrayOf(PropTypes.object),
};

export default TrackList;
