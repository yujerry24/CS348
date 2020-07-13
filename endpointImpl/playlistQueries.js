const { pool } = require('../dbPool');
const uuidv4 = require('uuid').v4;

/*
 * POST
 * /playlist
 *
 * body: { playlistName: string, userId: string }
 */
const createPlaylist = (req, response) => {
  const playlistId = uuidv4();
  pool
    .query(
      `
      INSERT INTO playlist VALUES ($1::text, $2::text, 0, $3::text)
      `,
      [playlistId, req.body.playlistName, req.body.userId]
    )
    .then(() => {
      response.status(200).json({ playlistId: playlistId });
    })
    .catch(error => {
      console.log(error.detail);
      response.status(400).json(error.detail);
    });
};

/*
 * GET
 * /playlist/:playlistId
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
const getPlaylist = (req, response) => {
  pool
    .query(
      `
        SELECT S.song_id, S.name as song_name, artist.name as artist_name, album.name as album_name, video_duration
        FROM song S 
          INNER JOIN in_playlist ON S.song_id = in_playlist.song_id
          INNER JOIN wrote ON S.song_id = wrote.song_id
          INNER JOIN artist ON wrote.artist_id = artist.artist_id
          INNER JOIN album ON album.album_id = S.album_id
        WHERE in_playlist.playlist_id = $1::text
      `,
      [req.params.playlistId]
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
          const val = row[key];
          if (!Array.isArray(currRowObj[key])) {
            currRowObj[key] = [currRowObj[key], val];
          } else {
            currRowObj[key].push(val);
          }
        }
      });
      response.status(200).json(formatData);
    })
    .catch(error => {
      console.log(error);
      response.status(400).json(error.detail);
    });
};

/*
 * DELETE
 * /playlist/:playlistId
 */
const deletePlaylist = (req, response) => {
  let output = '';
  pool
    .query(
      `
        DELETE FROM in_playlist WHERE playlist_id = $1::text;
      `,
      [req.params.playlistId]
    )
    .then(() => {
      output += 'Deleted all songs from the playlist.\n';
    })
    .then(() => {
      pool
        .query(
          `
          DELETE FROM playlist WHERE playlist_id = $1::text
        `,
          [req.params.playlistId]
        )
        .then(() => {
          output += 'Deleted the playlist.\n';
          response.status(200).send(output);
        });
    })
    .catch(error => {
      console.log(error);
      response.status(400).json(error.detail);
    });
};

/*
 * POST
 * /playlist/add
 *
 * body: {
 *   songIds: [string],
 *   playlistIds: [string],
 * }
 */
const addSong = async (req, response) => {
  if (req.body.playlistIds) {
    if (req.body.songIds) {
      await Promise.all(
        req.body.playlistIds.reduce((arr, playlistId) => {
          return arr.concat(
            req.body.songIds.map(songId => {
              return pool
                .query(`INSERT INTO in_playlist VALUES ($1::text, $2::text)`, [
                  songId,
                  playlistId,
                ])
                .then(() => {
                  return `Succesfully added ${songId} into ${playlistId}`;
                })
                .catch(error => {
                  console.log(error);
                  return error.detail;
                });
            })
          );
        }, [])
      )
        .then(results => response.status(200).send(results))
        .catch(err => response.status(400).json(err));
    } else {
      response.status(400).json('No song ids were provided');
    }
  } else {
    response.status(400).json('No playlist ids were provided');
  }
};

/*
 * DELETE
 * /playlist/remove/:playlistId
 * body: {
 *    songIds: [string]
 * }
 */
const removeSong = (req, response) => {
  if (req.body.songIds) {
    req.body.songIds.forEach(songId => {
      pool
        .query(
          `DELETE FROM in_playlist WHERE song_id = $1::text AND playlist_id = $2::text`,
          [songId, req.params.playlistId]
        )
        .then(results => response.status(200).json(results.rows))
        .catch(error => {
          console.log(error.detail);
          response.status(400).json(error.detail);
        });
    });
  } else {
    response.status(400).json('No song ids were provided');
  }
};

/*
 * GET
 * /playlist/list/:userId
 */
const listPlaylists = (req, response) => {
  pool
    .query(
      `
        SELECT playlist_id, name 
        FROM playlist
        WHERE user_id = $1::text
      `,
      [req.params.userId]
    )
    .then(results => response.status(200).json(results.rows))
    .catch(error => {
      console.log(error);
      response.status(400).json(error);
    });
};

/*
 * POST
 * /playlist/createFromExisting
 *
 * body: {
 *   existingPlaylistIds: [string], // playlists of songs to include
 *   newPlaylistId: string, // new playlists that is being filled
 * }
 */
const addToPlaylistFromExisting = (req, response) => {
  if (req.body.newPlaylistId) {
    if (
      req.body.existingPlaylistIds &&
      req.body.existingPlaylistIds.length > 0
    ) {
      let unionIds = req.body.existingPlaylistIds.slice(1);
      let query =
        'INSERT INTO in_playlist (SELECT song_id, $1::text AS playlist_id FROM in_playlist WHERE playlist_id = $2::text)';
      unionIds.forEach((id, index) => {
        query += ` UNION (SELECT song_id, $1::text AS playlist_id FROM in_playlist WHERE playlist_id = $${
          index + 3
        }::text)`;
      });
      unionIds.unshift(req.body.newPlaylistId, req.body.existingPlaylistIds[0]);
      pool
        .query(query, unionIds)
        .then(results => response.status(200).json(results.rows))
        .catch(error => {
          console.log(error.detail);
          response.status(400).json(error.detail);
        });
    } else {
      response.status(400).json('No existing playlist ids were provided');
    }
  } else {
    response.status(400).json('No new playlist id provided');
  }
};

module.exports = {
  createPlaylist,
  getPlaylist,
  deletePlaylist,
  addSong,
  removeSong,
  listPlaylists,
  addToPlaylistFromExisting,
};
