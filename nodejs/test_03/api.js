const express = require('express');
const router = express.Router();

router.get(
    '/foo1',
    (req, res) => {
        res.send('foo1\n');
    }
);

router.get(
    '/foo2',
    (req, res) => {
        res.send('foo2\n');
    }
);

module.exports.router = router;