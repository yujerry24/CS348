const { pool } = require('../dbPool');
const { formatSongs } = require('./utils');

/*
 * GET
 * /song/search/:userId/:text
 *
 * body: {
 *   limit: [int], // optional maximum number of results to return
 * }
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
const searchSong = (req, response) => {
  let query = `
  SELECT S.song_id, S.name as song_name, AR.name as artist_name, AL.name as album_name, video_duration, video_id,
  ( S.song_id IN (
    SELECT song_id 
    FROM in_playlist
    WHERE playlist_id=$2::text)
    ) as isFavourite
  FROM song S
    INNER JOIN wrote W ON S.song_id = W.song_id
    INNER JOIN artist AR ON W.artist_id = AR.artist_id
    INNER JOIN album AL ON AL.album_id = S.album_id
  WHERE (
    S.song_id IN (
      SELECT song_id 
      FROM song
      WHERE LOWER(song.name) LIKE LOWER($1::text)
    )
  ) 
  `;
  if (req.body.limit && req.body.limit > 0) {
    query += ` LIMIT ${req.body.limit}`;
  }
  pool
    .query(query, [`%${req.params.text}%`, `${req.params.userId}-liked-songs`])
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
  searchSong,
};
