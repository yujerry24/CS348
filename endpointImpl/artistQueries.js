const { pool } = require('../dbPool');
const { formatArtists } = require('./utils');

/*
 * GET
 * /artist/search/:text
 *
 * body: {
 *   limit: [int], // optional maximum number of results to return
 * }
 * Returns: {
 *   'artist_id': {
 *      artist_name: string
 *   },
 *   ...
 * }
 */
const artistSearch = (req, response) => {
  let query = `SELECT artist_id, name FROM artist 
            WHERE LOWER(name) LIKE LOWER($1::text)`;
  if (req.body.limit && req.body.limit > 0) {
    query += ` LIMIT ${req.body.limit}`;
  }
  pool
    .query(query, [`%${req.params.text}%`])
    .then(results => {
      const formatData = formatArtists(results);
      response.status(200).json(formatData);
    })
    .catch(error => {
      console.log(error);
      response.status(400).send(`An error occurred during the query`);
    });
};

module.exports = {
  artistSearch,
};
