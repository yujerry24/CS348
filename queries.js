require('dotenv').config()
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
})

// const uuidv4 = require('uuid').v4
// console.log(uuidv4());

/* 
* /playlist1
*/
const getPlaylist1 = (request, response) => {
  pool
    .query('SELECT * FROM playlist1')
    .then(results => response.status(200).json(results.rows))
    .catch(error => {
      console.log(error);
      response.status(400).json(error.error)
    })
}

/*
* POST
* /playlist1
*/
const addSongPlaylist1 = (req, response) => {
  pool
    .query(`INSERT INTO playlist1 (artist, title, year) VALUES ('${req.body.artist}','${req.body.title}', ${req.body.year})`)
    .then(results => {
      console.log(results)
      response.status(200).send('Successful insert')
    })
    .catch(error => {
      console.log(error);
      response.status(400).json(error)
    })
}

/*
* DELETE
* /playlist1
*/
const removeSongPlaylist1 = (req, response) => {
  pool
    .query(`DELETE FROM playlist1 WHERE artist='${req.body.artist}' AND title='${req.body.title}'`)
    .then(results => response.status(200).json(results.rows))
    .catch(error => {
      console.log(error);
      response.status(400).json(error)
    })
  }

/*
* /song/:text
*/
const songSearchText = (req, response) => {
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

/*
* GET
* /playlist/:playlistId
*/
const getPlaylist = (req, response) => {
  pool
    .query(`
        SELECT S.song_id, S.name as song_name, video_duration, A.name as artist_name
        FROM song S 
          INNER JOIN in_playlist ON S.song_id = in_playlist.song_id
          INNER JOIN wrote W ON S.song_id = W.song_id
          INNER JOIN artist A ON W.artist_id = A.artist_id
        WHERE in_playlist.playlist_id = $1::text
      `, [req.params.playlistId])
    .then(results => { response.status(200).json(results.rows) })
    .catch(error => {
        console.log(error);
        response.status(400).json(error);
    })
}

/*
* POST
* /playlist/:playlistId/:songId
*/
const addSong = (req, response) => {
  pool
    .query(`INSERT INTO in_playlist VALUES ($1::text, $2::text)`, [req.params.songId, req.params.playlistId])
    .then(results => response.status(200).json(results.rows))
    .catch(error => {
      console.log(error);
      response.status(400).json(error)
    })
}

/*
* DELETE
* /playlist/:playlistId/:songId
*/
const removeSong = (req, response) => {
  pool
    .query(`DELETE FROM in_playlist WHERE song_id = $1::text AND playlist_id = $2::text`, [req.params.songId, req.params.playlistId])
    .then(results => response.status(200).json(results.rows))
    .catch(error => {
      console.log(error);
      response.status(400).json(error)
    })
  }
    
/*
* GET
* /playlist/list/:userId
*/
const listPlaylists = (req, response) => {
  pool
    .query(`
        SELECT playlist_id, name 
        FROM playlist
        WHERE user_id = $1::text
      `, [req.params.userId])
    .then(results => 
      response.status(200).json(results.rows))
    .catch(error => {
      console.log(error);
      response.status(400).json(error)
    })
  }

module.exports = {
  getPlaylist1,
  addSongPlaylist1,
  removeSongPlaylist1,
  songQueries: {
    songSearchText
  },
  playlistQueries: {
    getPlaylist,
    addSong,
    removeSong,
    listPlaylists
  }
}
