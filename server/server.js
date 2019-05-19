const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const tagsRouter = require('./modules/Routes/tags.router')
const imagesRouter = require('./modules/Routes/images.router')
const images_tagsRouter = require('./modules/Routes/images.tags.router')

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
app.use('/api/tags', tagsRouter)
app.use('/api/images', imagesRouter)
app.use('/api/imagestags', images_tagsRouter)



/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});