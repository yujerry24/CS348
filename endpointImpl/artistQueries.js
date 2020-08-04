const { pool } = require('../dbPool');
const { formatArtists, formatSongs } = require('./utils');

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

/*
 * GET
 * /artist/songs/:artistId/:userId
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
const artistSongs = (req, response) => {
  let query = `SELECT song.song_id, song.name as song_name, video_duration, video_id,
  ( song.song_id IN (
    SELECT song_id 
    FROM in_playlist
    WHERE playlist_id=$2::text)
    ) as isFavourite
  FROM wrote INNER JOIN song ON wrote.song_id = song.song_id
  WHERE wrote.artist_id = $1::text
  ORDER BY song.name`;
  pool
    .query(query, [req.params.artistId, `${req.params.userId}-liked-songs`])
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
  artistSearch,
  artistSongs,
};
