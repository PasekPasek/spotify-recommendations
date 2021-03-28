import React from 'react';
import PropTypes from 'prop-types';
import TrackListTile from './TrackListTile';

const TrackList = ({ recommended = [] }) => {
    console.log('🚀 ~ file: TrackList.js ~ line 6 ~ TrackList ~ recommended', recommended);
    const renderTile = (item) => {
        const {
            name, album, artists, uri,
        } = item;
        return (
            <div
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
                />
            </div>
        );
        // return (
        //     <div key={name} style={{ width: 200, height: 200 }}>
        //         <img alt={name} src={album.images[1].url} style={{ width: '100%' }} />
        //     </div>
        // );
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
        }}
        >
            {
                recommended.map((item) => renderTile(item))
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
