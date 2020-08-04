const { pool } = require('../dbPool');
const { formatAlbums, formatSongs } = require('./utils');

/*
 * GET
 * /album/search/:text
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
const albumSearch = (req, response) => {
  let query = `SELECT album_id, name FROM album
            WHERE LOWER(name) LIKE LOWER($1::text)`;
  if (req.body.limit && req.body.limit > 0) {
    query += ` LIMIT ${req.body.limit}`;
  }
  pool
    .query(query, [`%${req.params.text}%`])
    .then(results => {
      const formatData = formatAlbums(results);
      response.status(200).json(formatData);
    })
    .catch(error => {
      console.log(error);
      response.status(400).send(`An error occurred during the query`);
    });
};

/*
 * GET
 * /album/songs/:albumId/:userId
 *
 * Returns: {
 *   'song_id': {
 *      song_name: string
 *      artist_name: string
 *      album_name: string,
 *      video_duration: number,
 *      video_id: string,
 *      isfavourite: boolean
 *   },
 *   ...
 * }
 */
const albumSongs = (req, response) => {
  let query = `SELECT song_id, song_num, name, video_duration, disc_num, video_id,
  ( song_id IN (
    SELECT song_id 
    FROM in_playlist
    WHERE playlist_id=$2::text)
    ) as isFavourite
  FROM song
  WHERE album_id = $1::text
  ORDER BY song_num`;
  pool
    .query(query, [req.params.albumId, `${req.params.userId}-liked-songs`])
    .then(results => {
      const formatData = formatSongs(results);
      response.status(200).json(formatData);
    })
    .catch(error => {
      console.log(error);
      response.status(400).send(`An error occurred during the query`);
    });
};

module.exports = {
  albumSearch,
  albumSongs,
};
