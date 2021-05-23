import { makeStyles } from '@material-ui/core';

const useTrackListTileStyles = makeStyles({
    root: {
        width: '100%',
    },
    textLabel: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        margin: '0px 5px'
    },
    textWithIcon: {
        display: "flex",
        marginBottom: 8
    },
    trackName: {},
    image: {},
    artistName: {},
    albumName: {},
});

export default useTrackListTileStyles;
