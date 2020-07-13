var express = require('express');
var router = express.Router();

var queries = require('../endpointImpl/userQueries');

router.post('/new', queries.createUser);

router.get('/:name', queries.findUser);

module.exports = router;