var express = require('express');
var router = express.Router();

var queries = require('../endpointImpl/songQueries');
var popQueries = require('../endpointImpl/mostPopQueries');

router.get('/search/:userId/:text', queries.searchText);
router.get('/searchMore/:text', queries.searchText);
router.post('/search/:text', queries.searchSong);

// Future endpoints:
//    /popularity             GET       getPopular
//    /mostPlaylist ????      GET       inMostPlaylists
router.get('/popularSongs', popQueries.getTop20Songs);
router.get('/popularArtists', popQueries.getTop20Artists);

module.exports = router;
