const { pool } = require('../dbPool');
const uuidv4 = require('uuid').v4;


/*
  GET
  /user/:name

  Returns :{
    'user_id': string
  }

*/

const findUser = (req, response) => {
  pool.query(
    `
      SELECT * FROM "user" WHERE user_id = '${req.params.name}'
    `
  )
  .then((results) => {response.status(200).json(results.rows)})
  .catch(error => {
    console.log(error.detail);
    response.status(400).json(error.detail);
  });
}

/*
  POST
  /user/new
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


const createUser = (req, response) => {
  pool.query(
    `
      INSERT INTO "user" VALUES ($1::text)
    `,
    [req.body.userId]
  )
  .then(() => {
    pool
        .query(
          `
          INSERT INTO playlist VALUES ($1::text, $2::text, 0, $3::text)
        `,
          [req.body.userId+'-liked-songs', 'My Liked Songs', req.body.userId]
        )
        .then(() => {
          output += 'Deleted the playlist.\n';
          response.status(200).send(output);
        });
  })
  .then(() => {
    response.status(200).json(`Created new user "${req.body.userId}"`);
  })
  .catch((error) => {
    console.log(error.detail);
    response.status(400).json(error.detail);
  })
}

module.exports = {
  findUser,
  createUser
}