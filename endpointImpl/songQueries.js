const { pool } = require('../dbPool');
const { formatSongs } = require('./utils');

/*
 * /song/search/:userId/:text
 *
 * Returns: {
 *   'song_id': {
 *      song_name: string,
 *      artist_name: string,
 *      album_name: string,
 *      video_duration: number
 *   },
 *   ...
 * }
 */
const searchText = (req, response) => {
  pool
    .query(
      `
        SELECT S.song_id, S.name as song_name, AR.name as artist_name, AL.name as album_name, video_duration,
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
        ) OR (
          S.song_id IN (
            SELECT song_id 
            FROM wrote INNER JOIN artist ON wrote.artist_id = artist.artist_id 
            WHERE LOWER(artist.name) LIKE LOWER($1::text)
          )
        ) OR (
          S.song_id IN (
            SELECT song_id 
            FROM song INNER JOIN album ON song.album_id = album.album_id 
            WHERE LOWER(album.name) LIKE LOWER($1::text)
          )
        )
        LIMIT 30
      `,
      [`%${req.params.text}%`, `${req.params.userId}-liked-songs`]
    )
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
  searchText,
};
