const { pool } = require('../dbPool');

/*
 * /song/:text
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
        WHERE (LOWER(S.name) LIKE LOWER($1::text)) OR (LOWER(AR.name) LIKE LOWER($1::text)) OR (LOWER(AL.name) LIKE LOWER($1::text))
        LIMIT 30
      `,
      [`%${req.params.text}%`]
    )
    .then(results => response.status(200).json(results.rows))
    .catch(error => {
      console.log(error);
      response.status(400).send(`An error occured during the query`);
    });
};

module.exports = {
  searchText,
};
