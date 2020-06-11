var express = require('express')
var router = express.Router()

var { songQueries } = require('../queries')

router.get('/songName/:name', songQueries.songByName);
router.get('/artist/:name', songQueries.songByArtist);

module.exports = router