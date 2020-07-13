SELECT S.song_id, S.name as song_name, AR.name as artist_name, AL.name as album_name, S.video_duration
FROM song S
  INNER JOIN wrote W ON S.song_id = W.song_id
  INNER JOIN artist AR ON W.artist_id = AR.artist_id
  INNER JOIN album AL ON AL.album_id = S.album_id
WHERE (
  S.song_id IN (
    SELECT song_id 
    FROM song
    WHERE LOWER(song.name) LIKE LOWER('%hey%')
  )
) OR (
  S.song_id IN (
    SELECT song_id 
    FROM wrote INNER JOIN artist ON wrote.artist_id = artist.artist_id 
    WHERE LOWER(artist.name) LIKE LOWER('%hey%')
  )
) OR (
  S.song_id IN (
    SELECT song_id 
    FROM song INNER JOIN album ON song.album_id = album.album_id 
    WHERE LOWER(album.name) LIKE LOWER('%hey%')
  )
)
LIMIT 30;