var express = require('express');
var router = express.Router();

var queries = require('../endpointImpl/songQueries');

router.get('/:text', queries.searchText);

// Future endpoints:
//    /popularity             GET      getPopular
//    /mostPlaylist ????      GET       inMostPlaylists

module.exports = router;
