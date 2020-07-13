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

const createUser = (req, response) => {
  pool.query(
    `
      INSERT INTO "user" VALUES ($1::text)
    `,
    [req.body.userId]
  )
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