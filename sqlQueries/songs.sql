SELECT S.song_id, S.name as song_name, AR.name as artist_name, AL.name as album_name, video_duration, video_id,
  ( S.song_id IN (
    SELECT song_id 
    FROM in_playlist
    WHERE playlist_id='Timothy')
    ) as isFavourite
FROM song S
  INNER JOIN wrote W ON S.song_id = W.song_id
  INNER JOIN artist AR ON W.artist_id = AR.artist_id
  INNER JOIN album AL ON AL.album_id = S.album_id
WHERE (
  S.song_id IN (
    SELECT song_id 
    FROM song
    WHERE LOWER(song.name) LIKE LOWER('%Flower%')
  )
)
LIMIT 5;
