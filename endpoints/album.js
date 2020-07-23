var express = require('express');
var router = express.Router();

var queries = require('../endpointImpl/albumQueries');

router.get('/minisearch/:text', queries.miniAlbumSearcb);

module.exports = router;
