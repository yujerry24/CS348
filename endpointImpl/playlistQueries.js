const { pool } = require('../dbPool')

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
        console.log(error.detail);
        response.status(400).json(error.detail);
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
      console.log(error.detail);
      response.status(400).json(error.detail)
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
      console.log(error.detail);
      response.status(400).json(error.detail)
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
    getPlaylist,
    addSong,
    removeSong,
    listPlaylists
  }
