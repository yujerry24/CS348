SELECT artist_id, name FROM artist WHERE LOWER(name) LIKE LOWER('%Day%') LIMIT 5;

SELECT song.song_id, song.name as song_name, video_duration, video_id,
  ( song.song_id IN (
    SELECT song_id 
    FROM in_playlist
    WHERE playlist_id = 'Timothy-liked-songs')
    ) as isFavourite
  FROM wrote INNER JOIN song ON wrote.song_id = song.song_id
  WHERE wrote.artist_id = '5TnQc2N1iKlFjYD7CPGvFc'
  ORDER BY song.name;