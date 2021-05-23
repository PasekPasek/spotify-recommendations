import { makeStyles } from '@material-ui/core';

const useRecommendationsStyles = makeStyles({
    root: {},
    seeds: {
        display: 'flex',
        width: '100%',
        margin: '20px 0',
        gap: 15,
    },
    seedSelect: {
        flexBasis: '50%',
    },
    sticky: {
        position: 'fixed',
    },
    toolbar: {
        padding: '15px 0',
    },
});

export default useRecommendationsStyles;
