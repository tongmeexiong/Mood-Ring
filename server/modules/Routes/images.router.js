const express = require('express')
const pool = require('../modules/pool')
const router = express.Router();

router.get('/', (req, res) => {
    // Get all the owners

    let query = `SELECT * FROM "tags"`
    pool.query(query).then(result => {
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in GET Owners', err);
        res.sendStatus(500)
    })
})

// router.post('/addtag', (req, res) => {
//     console.log('POST', req.body.img_url);

//     const sqlQuery = `
//   INSERT INTO "favorites" ("img_url")
//   VALUES ($1)`;

//     pool.query(sqlQuery, [req.body.img_url])
//         .then(() => {
//             res.sendStatus(201);
//         })
//         .catch((err) => {
//             console.log('Error completing SELECT GIF query', err);
//             res.sendStatus(500);
//         });
// });

module.exports = router