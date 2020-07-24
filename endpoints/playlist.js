var express = require('express');
var router = express.Router();

var queries = require('../endpointImpl/playlistQueries');

router.post('/', queries.createPlaylist);
router.get('/getUserPlaylists/:playlistId/:userId', queries.getPlaylist);
router.delete('/:playlistId', queries.deletePlaylist);
router.post('/add', queries.addSong);
router.delete('/remove/:playlistId', queries.removeSong);
router.get('/list/:userId', queries.listPlaylists);
router.post('/createFromExisting', queries.addToPlaylistFromExisting);

router.post('/search/:text', queries.playlistSearch);
// Future endpoints:
//    /playlist               POST      createPlaylist
//    /playlist/:playlistId   DELETE    deletePlaylist
//    /playlist/:playlistId   PATCH     renamePlaylist

module.exports = router;
