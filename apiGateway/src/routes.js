var express = require('express')
var router = express.Router();

router.use('/auth', (req, res) => {
    res.send('Auth service');
});

router.use('/exercises', (req, res) => {
    res.send('Auth service');
});

router.use('/sets', (req, res) => {
    res.send('Auth service');
});

module.exports = router;
