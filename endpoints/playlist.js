var express = require('express')
var router = express.Router()

var { playlistQueries } = require('../queries')

router.get('/:playlistId', playlistQueries.getPlaylist);
router.post('/:playlistId/:songId', playlistQueries.addSong);
router.delete('/:playlistId/:songId', playlistQueries.removeSong);
router.get('/list/:userId', playlistQueries.listPlaylists);

// Future endpoints:
//    /playlist               POST      createPlaylist
//    /playlist/:playlistId   DELETE    deletePlaylist
//    /playlist/:playlistId   PATCH     renamePlaylist

module.exports = router
