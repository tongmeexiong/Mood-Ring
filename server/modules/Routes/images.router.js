const express = require('express')
const pool = require('../pool')
const router = express.Router();

// Get request to junction table to obtain images. 
router.get('/', (req, res) => {
    let query = `SELECT * FROM "images"`
    pool.query(query).then(result => {
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in GET Owners', err);
        res.sendStatus(500)
    })
})

// POST request to send tag name and image id. 
router.post('/addtag', (req, res) => {
    console.log('POST', req.body.tags_id, req.body.images_id);

    const sqlQuery = `
  INSERT INTO "images_tags" ("tags_id", "images_id" )
  VALUES ($1, $2)`;

    pool.query(sqlQuery, [req.body.tags_id, req.body.images_id])
        .then(() => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('Error completing POST query', err);
            res.sendStatus(500);
        });
});

module.exports = router