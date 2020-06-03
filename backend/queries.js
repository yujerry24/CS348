const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '35.237.58.41',
  database: 'postgres',
  password: 'cs348',
  port: 5432,
})

const getPlaylist1 = (request, response) => {
  pool.query('SELECT * FROM playlist1', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getPlaylist1,
}
