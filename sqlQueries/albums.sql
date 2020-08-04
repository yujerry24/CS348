SELECT album_id, name FROM album WHERE LOWER(name) LIKE LOWER('%play%') LIMIT 5;

SELECT song_id, song_num, name, video_duration, disc_num, video_id,
  ( song_id IN (
    SELECT song_id 
    FROM in_playlist
    WHERE playlist_id='Timothy-liked-songs')
    ) as isFavourite
  FROM song
  WHERE album_id = '03eUMhwODEJRYsYEiqtOpo'
  ORDER BY song_num;