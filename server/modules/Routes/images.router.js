const express = require('express')
const pool = require('../pool')
const router = express.Router();

router.get('/', (req, res) => {
    let query = `SELECT * FROM "images"`
    pool.query(query).then(result => {
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in GET Owners', err);
        res.sendStatus(500)
    })
})

router.post('/addtag', (req, res) => {
    console.log('POST', req.params.id);

    const sqlQuery = `
  INSERT INTO "images_tags" ("images_id","tags_id" )
  VALUES ($1, 2)`;

    pool.query(sqlQuery, [req.body.id])
        .then(() => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('Error completing POST query', err);
            res.sendStatus(500);
        });
});

module.exports = router