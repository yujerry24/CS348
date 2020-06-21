const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 8080;

const { getPlaylist1, addSongPlaylist1, removeSongPlaylist1 } = require('./queries');
const song = require('./endpoints/song');
const playlist = require('./endpoints/playlist');

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

app.get('/playlist1', getPlaylist1);
app.post('/playlist1', addSongPlaylist1);
app.delete('/playlist1', removeSongPlaylist1);

// app.use('/playlist1', db.getPlaylist1); -- don't think this is necessary, but leaving here for now in case I'm wrong

app.use('/song', song);
app.use('/playlist', playlist);

// Future endpoints:
//    /artist/:text -- find artists by searching text (will look by artist name, song name, and album name)

//    /album/:text -- find albums by searching text (will look by artist name, song name, and album name)

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});