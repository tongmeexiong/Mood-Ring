const express = require('express')
const pool = require('../pool')
const router = express.Router();

router.get('/', (req, res) => {

    const query = `SELECT * FROM "tags"`
    pool.query(query).then(result => {
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in GET tags', err);
        res.sendStatus(500)
    })
})


module.exports = router