const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./queries')
const PORT = process.env.PORT || 8080;

app.set('port', PORT);
app.use(cors());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/playlist1', db.getPlaylist1);

app.use('/playlist1', db.getPlaylist1);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});