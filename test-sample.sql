-- search for songs
-- $1: any string to search
-- ex. $1 = '%luv%'
(SELECT S.song_id, S.name as song_name, S.video_duration, A.name as artist_name
  FROM song S
    INNER JOIN wrote W ON S.song_id = W.song_id
    INNER JOIN artist A ON W.artist_id = A.artist_id
  WHERE LOWER(S.name) LIKE LOWER('%luv%') 
  LIMIT 20)
  UNION
    (SELECT S.song_id, S.name, S.video_duration, A.name
  FROM song S
    INNER JOIN wrote W ON S.song_id = W.song_id
    INNER JOIN artist A ON W.artist_id = A.artist_id
  WHERE LOWER(A.name) LIKE LOWER('%luv%') 
  LIMIT 20);

-- list the songs that are in a playlist
-- $1: playlist id 
-- ex.8092bcc7-37ee-4114-bc5e-eac125b3bb9b
SELECT S.song_id, S.name as song_name, video_duration, A.name as artist_name
  FROM song S 
    INNER JOIN in_playlist ON S.song_id = in_playlist.song_id
    INNER JOIN wrote W ON S.song_id = W.song_id
    INNER JOIN artist A ON W.artist_id = A.artist_id
  WHERE in_playlist.playlist_id = '8092bcc7-37ee-4114-bc5e-eac125b3bb9b';

-- add a song to a playlist
-- $1: song_id, $2: playlist_id
-- ex. $1 = '0SdMLlsw5FOEbHJmJs8aUA', playlist_id = '8092bcc7-37ee-4114-bc5e-eac125b3bb9b'
INSERT INTO in_playlist VALUES ('0SdMLlsw5FOEbHJmJs8aUA', '8092bcc7-37ee-4114-bc5e-eac125b3bb9b');

-- delete a song from a playlist
-- $1: song_id, $2: playlist_id
-- ex. $1 = '0SdMLlsw5FOEbHJmJs8aUA', playlist_id = '8092bcc7-37ee-4114-bc5e-eac125b3bb9b'
DELETE FROM in_playlist WHERE song_id = '0SdMLlsw5FOEbHJmJs8aUA' AND playlist_id = '8092bcc7-37ee-4114-bc5e-eac125b3bb9b';

-- get all the playlists created by a certain user
-- $1: user_id
-- ex. $1 = '63e439ec-8625-4912-8b03-e34d5a7cfaee'
SELECT playlist_id, name 
  FROM playlist
  WHERE user_id = '63e439ec-8625-4912-8b03-e34d5a7cfaee';
