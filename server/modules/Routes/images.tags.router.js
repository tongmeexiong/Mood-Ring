
const express = require('express')
const pool = require('../pool')
const router = express.Router();

router.get('/', (req, res) => {
    let query = `SELECT "tags"."name", "images_tags"."images_id" FROM "tags"
    JOIN "images_tags" ON "images_tags"."tags_id" = "tags"."id"
    JOIN "images" ON "images"."id" = "images_tags"."images_id"
    `
    pool.query(query).then(result => {
        console.log('TAGS & IMAGES', result.rows);
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in GET Owners', err);
        res.sendStatus(500)
    })
})
module.exports = router