const express = require('express');

const router = express.Router();

router.use('/auth', (req, res) => {
    res.send('Auth service');
});

router.use('/exercises', (req, res) => {
    res.send('Auth service');
});

router.use('/sets', (req, res) => {
    res.send('Auth set service');
});

module.exports = router;
