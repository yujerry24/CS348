var express = require('express')
var router = express.Router()

var queries = require('../endpointImpl/playlistQueries')

router.get('/:playlistId', queries.getPlaylist);
router.post('/add/:playlistId', queries.addSong);
router.delete('/:playlistId/:songId', queries.removeSong);
router.get('/list/:userId', queries.listPlaylists);

// Future endpoints:
//    /playlist               POST      createPlaylist
//    /playlist/:playlistId   DELETE    deletePlaylist
//    /playlist/:playlistId   PATCH     renamePlaylist

module.exports = router
