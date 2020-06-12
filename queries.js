require('dotenv').config()
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
})

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
* /song/:text
*/
const songSearch = (req, response) => {
  pool
    .query(`
      (SELECT * FROM playlist1 WHERE LOWER(title) LIKE LOWER('%${req.params.text}%') LIMIT 20)
      UNION
      (SELECT * FROM playlist1 WHERE LOWER(artist) LIKE LOWER('%${req.params.text}%') LIMIT 20)
    `)
    // .query(`
    //     (SELECT S.songId, S.name, S.length, A.name
    //     FROM Song S
    //       INNER JOIN Wrote W ON S.songId = W.songId
    //       INNER JOIN Artist A ON W.artistId = A.artistId
    //     WHERE LOWER(S.name) LIKE LOWER('%${req.params.text}%') 
    //     LIMIT 20)
    //     UNION
    //      (SELECT S.songId, S.name, S.length, A.name
    //     FROM Song S
    //       INNER JOIN Wrote W ON S.songId = W.songId
    //       INNER JOIN Artist A ON W.artistId = A.artistId
    //     WHERE LOWER(A.name) LIKE LOWER('%${req.params.text}%') 
    //     LIMIT 20)
    //   `)
    .then(results => 
      response.status(200).json(results.rows))
    .catch(error => {
      console.log(error);
      response.status(400).send(`An error occured during the query`)
    })
}

/*
* /song/songName/:name
*/
const songByName = (req, response) => {
  pool
    .query(`SELECT * FROM playlist1 WHERE LOWER(title) LIKE LOWER('%${req.params.name}%') LIMIT 20`)
    // .query(`
    //     SELECT S.songId, S.name, S.length, A.name
    //     FROM Song S
    //       INNER JOIN Wrote W ON S.songId = W.songId
    //       INNER JOIN Artist A ON W.artistId = A.artistId
    //     WHERE S.name LIKE '%${req.params.name}%' 
    //     LIMIT 20
    //   `)
    .then(results => 
      response.status(200).json(results.rows))
    .catch(error => {
      console.log(error);
      response.status(400).json(error)
    })
}

/*
* /song/artist/:name
*/
const songByArtist = (req, response) => {
  pool
    .query(`SELECT * FROM playlist1 WHERE LOWER(artist) LIKE LOWER('%${req.params.name}%') LIMIT 20`)
    // .query(`
    //     SELECT S.songId, S.name, S.length, A.name
    //     FROM Song S
    //       INNER JOIN Wrote W ON S.songId = W.songId
    //       INNER JOIN Artist A ON W.artistId = A.artistId
    //     WHERE A.name LIKE '%${req.params.name}%' 
    //     LIMIT 20
    //   `)
    .then(results => 
      response.status(200).json(results.rows))
    .catch(error => {
      console.log(error);
      response.status(400).json(error)
    })
}

/*
* /playlist/:playlistId
*/
const getPlaylist = (req, response) => {
  pool
    .query(`
        SELECT songId, name, length
        FROM Song 
          INNER JOIN InPlaylist ON Song.song_id = InPlaylist.song_id
        WHERE InPlaylist.playListId = ${req.params.playlistId}
      `)
    .then(results => { response.status(200).json(results.rows) })
    .catch(error => {
        console.log(error);
        response.status(400).json(error);
    })
}

/*
* /playlist/:playlistId/add/:songId
*/
const addSong = (req, response) => {
  pool
    .query(`INSERT INTO InPlaylist (songId, playlistId) (${req.params.songId}, ${req.params.playlistId})`)
    .then(results => response.status(200).json(results.rows))
    .catch(error => {
      console.log(error);
      response.status(400).json(error)
    })
}

/*
* /playlist/:playlistId/remove/:songId
*/
const removeSong = (req, response) => {
  pool
    .query(`DELETE FROM InPlaylist WHERE songId=${req.params.songId} AND playlistId=${req.params.playlistId})`)
    .then(results => response.status(200).json(results.rows))
    .catch(error => {
      console.log(error);
      response.status(400).json(error)
    })
  }
    
/*
* /filter/playlist/:userId
*/
const listPlaylists = (req, response) => {
  pool
    .query(`
        SELECT P.name 
        FROM Playlist
          INNER JOIN Created ON Playlist.playlistId = Created.playlistId
        WHERE Created.userId = ${req.params.userId}
      `)
    .then(results => 
      response.status(200).json(results.rows))
    .catch(error => {
      console.log(error);
      response.status(400).json(error)
    })
  }

module.exports = {
  getPlaylist1,
  songQueries: {
    songSearch,
    songByName,
    songByArtist
  },
  playlistQueries: {
    getPlaylist,
    addSong,
    removeSong,
    listPlaylists
  }
}
