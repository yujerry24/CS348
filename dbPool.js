require('dotenv').config();
const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

// const uuidv4 = require('uuid').v4
// console.log(uuidv4());

// end points for sample database

/*
 * /playlist1
 */
const getPlaylist1 = (request, response) => {
  pool
    .query('SELECT * FROM playlist1')
    .then(results => response.status(200).json(results.rows))
    .catch(error => {
      console.log(error);
      response.status(400).json(error.error);
    });
};

/*
 * POST
 * /playlist1
 */
const addSongPlaylist1 = (req, response) => {
  pool
    .query(
      `INSERT INTO playlist1 (artist, title, year) VALUES ('${req.body.artist}','${req.body.title}', ${req.body.year})`
    )
    .then(results => {
      console.log(results);
      response.status(200).send('Successful insert');
    })
    .catch(error => {
      console.log(error);
      response.status(400).json(error);
    });
};

/*
 * DELETE
 * /playlist1
 */
const removeSongPlaylist1 = (req, response) => {
  pool
    .query(
      `DELETE FROM playlist1 WHERE artist='${req.body.artist}' AND title='${req.body.title}'`
    )
    .then(results => response.status(200).json(results.rows))
    .catch(error => {
      console.log(error);
      response.status(400).json(error);
    });
};

module.exports = {
  getPlaylist1,
  addSongPlaylist1,
  removeSongPlaylist1,
  pool,
};
