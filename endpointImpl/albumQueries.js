const { pool } = require('../dbPool');
const { formatAlbums } = require('./utils');

/*
 * GET
 * /album/minisearch/:text
 *
 * body: {
 *   limit: [int], // optional maximum number of results to return
 * }
 * Returns: {
 *   'album_id': {
 *      album_name: string
 *   },
 *   ...
 * }
 */
const albumSearcb = (req, response) => {
  let query = `SELECT album_id, name FROM album
            WHERE LOWER(name) LIKE LOWER($1::text)`;
  if (req.body.limit && req.body.limit > 0) {
    query += ` LIMIT ${req.body.limit}`
  }
  pool
    .query(
      query,
      [`%${req.params.text}%`]
    )
    .then(results => {
      const formatData = formatAlbums(results);
      response.status(200).json(formatData);
    })
    .catch(error => {
      console.log(error);
      response.status(400).send(`An error occurred during the query`);
    });
};

module.exports = {
  albumSearcb,
};