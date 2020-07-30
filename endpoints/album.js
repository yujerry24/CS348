var express = require('express');
var router = express.Router();

var queries = require('../endpointImpl/albumQueries');

router.post('/search/:text', queries.albumSearch);

module.exports = router;
