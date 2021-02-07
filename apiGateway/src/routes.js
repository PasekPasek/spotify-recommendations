const express = require('express');
const config = require('config');
const proxy = require('express-http-proxy');

const router = express.Router();

const { spotifyService } = config.get('Enpoints');

router.use('/auth', (req, res) => {
    res.send('Auth service');
});

router.use('/spotify', proxy(spotifyService));

router.use('/exercises', (req, res) => {
    res.send('Auth service');
});

router.use('/sets', (req, res) => {
    res.send('Auth set service');
});

module.exports = router;
