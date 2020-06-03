const Pool = require('pg').Pool
// idk what this is. fill in the credentials i guess?
const pool = new Pool({
  user: 'postgres',
  host: '35.237.58.41',
  database: 'postgres',
  password: 'cs348',
  port: 5432,
})

const getUsers = (request, response) => {
  // this is temporary, fill in the actual query here
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.export = {
  getUsers,
}
