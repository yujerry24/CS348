const { pool } = require('../dbPool')

/*
    GET
    /song/popularSongs
*/
const getTop20Songs = (response) => {
    pool.query(
        `
            SELECT S.song_id, S.name as song_name, video_duration, Al.name as album_name, A.name as artist_name 
            FROM song S 
                INNER JOIN wrote W on S.song_id = W.song_id
                INNER JOIN artist A on W.artist_id = A.artist_id
                INNER JOIN album Al ON S.album_id = Al.album_id
            WHERE(
                S.song_id in (
                    SELECT * FROM (
                        SELECT P.song_id FROM in_playlist P
                        GROUP BY P.song_id
                        ORDER BY count(P.song_id) DESC
                    ) AS in_play LIMIT 20
                )
            );
        `
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
        console.log(error.detail);
        response.status(400).json(error.detail);
    })
}

/*
    GET
    /song/popularArtists
*/
const getTop20Artists = (req, response) => {
    pool.query(
        `
            SELECT DISTINCT * FROM (
                SELECT A.name AS artist_name, inPlay.in_num_of_playlists
                FROM artist A
                    INNER JOIN wrote W ON A.artist_id = W.artist_id
                    INNER JOIN song S ON S.song_id = W.song_id
                    INNER JOIN (
                        -- get the most popular artist in terms of number of playlists they are in
                        SELECT * FROM (
                            SELECT A2.artist_id, count(A2.artist_id) AS in_num_of_playlists
                            FROM (
                                SELECT DISTINCT A2.artist_id, P.playlist_id FROM artist A2
                                    INNER JOIN wrote W2 ON A2.artist_id = W2.artist_id
                                    INNER JOIN in_playlist P ON W2.song_id = P.song_id
                            ) AS A2
                            GROUP BY A2.artist_id
                            ORDER BY count(A2.artist_id) DESC
                        ) AS playlist_songs LIMIT 20
                    ) inPlay ON A.artist_id = inPlay.artist_id
            ) AS most_pop_artists
            ORDER BY in_num_of_playlists DESC;
        `
    )
    .then(results => { response.status(200).json(results.rows) })
    .catch(error => {
        console.log(error.detail);
        response.status(400).json(error.detail);
    })
}

module.exports = {
    getTop20Songs,
    getTop20Artists
}