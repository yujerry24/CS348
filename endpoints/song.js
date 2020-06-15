var express = require('express')
var router = express.Router()

var { songQueries } = require('../queries')

router.get('/:text', songQueries.songSearchText);

// Future endpoints:
//    /popularity             GET      getPopular
//    /mostPlaylist ????      GET       inMostPlaylists

module.exports = router
