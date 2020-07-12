var express = require('express')
var router = express.Router()

var queries = require('../endpointImpl/songQueries')
var popQueries = require('../endpointImpl/mostPopQueries')

router.get('/:text', queries.searchText);

// Future endpoints:
//    /popularity             GET      getPopular
//    /mostPlaylist ????      GET       inMostPlaylists
router.get('/:');
router.get('/:');

module.exports = router
