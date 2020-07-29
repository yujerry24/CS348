var express = require('express');
var router = express.Router();

var queries = require('../endpointImpl/songQueries');
var popQueries = require('../endpointImpl/mostPopQueries');

router.post('/search/:userId/:text', queries.searchSong);

router.get('/popularSongs', popQueries.getTop20Songs);
router.get('/popularArtists', popQueries.getTop20Artists);

module.exports = router;
