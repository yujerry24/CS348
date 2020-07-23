const { pool } = require('../dbPool');
const { formatArtists } = require('./utils');

/*
 * GET
 * /artist/minisearch/:text
 *
 * Returns: {
 *   'artist_id': {
 *      artist_name: string
 *   },
 *   ...
 * }
 */
const miniArtistSearcb = (req, response) => {
  pool
    .query(
      `
          SELECT artist_id, name FROM artist 
          WHERE LOWER(name) LIKE LOWER($1::text)
          LIMIT 5
        `,
      [`%${req.params.text}%`]
    )
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
  miniArtistSearcb,
};