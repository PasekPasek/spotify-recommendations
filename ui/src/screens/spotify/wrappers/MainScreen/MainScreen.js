import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core';

import { SpotifyAuthContext } from '../../contexts/auth';
import SpotifyIcon from '../../../../icons/SpotifyIcon';

const styles = {
    appbar: {},
};

const MainScreen = ({
    children, classes,
}) => {
    const { handleLogin, isLoggedIn, userData } = useContext(SpotifyAuthContext);

    return (
        <>
            <AppBar position="static" className={classes.appbar} maxWidth="xl" color="default">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5">
                        Spotify Recommendations
                    </Typography>
                    {isLoggedIn ? (
                        <Typography component="p">
                            {`Hello, ${userData.display_name}`}
                        </Typography>
                    )
                        : (
                            <Button
                                variant="outlined"
                                startIcon={<SpotifyIcon />}
                                onClick={() => handleLogin()}
                            >
                                Log in
                            </Button>
                        )}
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl">
                {isLoggedIn && children}
            </Container>
        </>
    );
};

MainScreen.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(MainScreen);
