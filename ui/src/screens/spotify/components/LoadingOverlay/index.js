import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';

const styles = {
    root: {
        width: '100%',
        height: '100%',
    },
};

const LoadingOverlay = ({ isLoading, children, classes }) => {
    if (!isLoading) {
        return (
            <>
                {children}
            </>
        );
    }

    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    );
};

LoadingOverlay.propTypes = {
    isLoading: PropTypes.bool,
    children: PropTypes.node.isRequired,
    classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

LoadingOverlay.defaultProps = {
    isLoading: true,
};

export default withStyles(styles)(LoadingOverlay);
