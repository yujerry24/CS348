var express = require('express');
var router = express.Router();

var queries = require('../endpointImpl/artistQueries');

router.get('/minisearch/:text', queries.miniArtistSearcb);

module.exports = router;
