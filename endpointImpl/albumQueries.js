const { pool } = require('../dbPool');
const { formatAlbums } = require('./utils');

/*
 * GET
 * /album/minisearch/:text
 *
 * Returns: {
 *   'album_id': {
 *      album_name: string
 *   },
 *   ...
 * }
 */
const miniAlbumSearcb = (req, response) => {
  pool
    .query(
      `
          SELECT album_id, name FROM album
          WHERE LOWER(name) LIKE LOWER($1::text)
          LIMIT 5
        `,
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
  miniAlbumSearcb,
};