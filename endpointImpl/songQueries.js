const { pool } = require('../dbPool')

/*
* /song/:text
*/
const searchText = (req, response) => {
  pool
    .query(`
        (SELECT S.song_id, S.name as song_name, S.video_duration, A.name as artist_name
        FROM song S
          INNER JOIN wrote W ON S.song_id = W.song_id
          INNER JOIN artist A ON W.artist_id = A.artist_id
        WHERE LOWER(S.name) LIKE LOWER($1::text) 
        LIMIT 20)
        UNION
         (SELECT S.song_id, S.name, S.video_duration, A.name
        FROM song S
          INNER JOIN wrote W ON S.song_id = W.song_id
          INNER JOIN artist A ON W.artist_id = A.artist_id
        WHERE LOWER(A.name) LIKE LOWER($1::text) 
        LIMIT 20)
      `, [`%${req.params.text}%`])
    .then(results => 
      response.status(200).json(results.rows))
    .catch(error => {
      console.log(error);
      response.status(400).send(`An error occured during the query`)
    })
}

module.exports = {
  searchText
}