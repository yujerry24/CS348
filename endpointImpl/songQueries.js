const { pool } = require('../dbPool');

/*
 * /song/search/:text
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
        SELECT S.song_id, S.name as song_name, AR.name as artist_name, AL.name as album_name, S.video_duration
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
      [`%${req.params.text}%`]
    )
    .then(results => {
      const formatData = {};
      results.rows.forEach(row => {
        if (!formatData[row.song_id]) {
          formatData[row.song_id] = {};
          const currRowObj = formatData[row.song_id];

          Object.entries(row)
            .splice(1)
            .forEach(([key, val]) => {
              currRowObj[key] = val;
            });
        } else {
          const currRowObj = formatData[row.song_id];
          // for duplicate songs (same id) but with a different artist, create a list of artists
          const key = 'artist_name';
          if (!Array.isArray(currRowObj[key])) {
            currRowObj[key] = [currRowObj[key], row[key]];
          } else {
            currRowObj[key].push(val);
          }
        }
      });
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
