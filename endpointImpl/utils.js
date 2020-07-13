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

module.exports = {
  formatSongs,
};
