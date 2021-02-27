import React from 'react';
import PropTypes from 'prop-types';

const TrackList = ({ recommended = [] }) => {
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

TrackList.defaultProps = {
    recommended: [],
};

TrackList.propTypes = {
    recommended: PropTypes.arrayOf(PropTypes.object),
};

export default TrackList;
