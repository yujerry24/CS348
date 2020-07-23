const formatSongs = results => {
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
  return formatData;
};

const formatAlbums = results => {
  const formatData = {};
  results.rows.forEach(row => {
    formatData[row.album_id] = {};
    const currRowObj = formatData[row.album_id];

    Object.entries(row)
      .splice(1)
      .forEach(([key, val]) => {
        currRowObj[key] = val;
      });
    // There should only be one entry per album
  });
  return formatData;
};

const formatArtists = results => {
  const formatData = {};
  results.rows.forEach(row => {
    formatData[row.artist_id] = {};
    const currRowObj = formatData[row.artist_id];

    Object.entries(row)
      .splice(1)
      .forEach(([key, val]) => {
        currRowObj[key] = val;
      });
    // There should only be one entry per artist
  });
  return formatData;
};

const formatPlaylists = results => {
  const formatData = {};
  results.rows.forEach(row => {
    formatData[row.playlist_id] = {};
    const currRowObj = formatData[row.playlist_id];

    Object.entries(row)
      .splice(1)
      .forEach(([key, val]) => {
        currRowObj[key] = val;
      });
    // There should only be one entry per artist
  });
  return formatData;
};

module.exports = {
  formatSongs,
  formatAlbums,
  formatArtists,
  formatPlaylists,
};
