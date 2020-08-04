var express = require('express');
var router = express.Router();

var queries = require('../endpointImpl/albumQueries');

router.post('/search/:text', queries.albumSearch);
router.get('/songs/:albumId/:userId', queries.albumSongs);

module.exports = router;
