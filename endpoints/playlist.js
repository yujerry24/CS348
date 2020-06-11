var express = require('express')
var router = express.Router()

var { playlistQueries } = require('../queries')

router.get('/:playlistId', playlistQueries.getPlaylist);
router.post('/:playlistId/add/:songId', playlistQueries.addSong);
router.delete('/:playlistId/remove/:songId', playlistQueries.removeSong);
router.get('/list/:userId', playlistQueries.listPlaylists);

// Future endpoints:
//    /playlist/new
//    /playlist/delete/:playlistId
//    /playlist/rename/:playlistId

module.exports = router