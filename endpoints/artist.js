var express = require('express');
var router = express.Router();

var queries = require('../endpointImpl/artistQueries');

router.post('/search/:text', queries.artistSearch);

module.exports = router;
