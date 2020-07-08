-- list the songs that are in a playlist
-- $1: playlist id 
-- ex.8092bcc7-37ee-4114-bc5e-eac125b3bb9b
SELECT S.song_id, S.name as song_name, artist.name as artist_name, album.name as album_name, video_duration
FROM song S 
  INNER JOIN in_playlist ON S.song_id = in_playlist.song_id
  INNER JOIN wrote ON S.song_id = wrote.song_id
  INNER JOIN artist ON wrote.artist_id = artist.artist_id
  INNER JOIN album ON album.album_id = S.album_id
WHERE in_playlist.playlist_id = '8092bcc7-37ee-4114-bc5e-eac125b3bb9b';

-- create a playlist
-- $1: playlist_id, $2: playlist_name, $3: user_id
-- ex. playlist_id = ?? playlist_name = 'MyFavs', user_id = '63e439ec-8625-4912-8b03-e34d5a7cfaee'
INSERT INTO playlist VALUES ($1::text, 'MyFavs', 0, '63e439ec-8625-4912-8b03-e34d5a7cfaee')

-- delete a playlist
-- $1: playlist_id
-- ex. ???
DELETE FROM in_playlist WHERE playlist_id = $1::text; -- first delete all songs in the playlist
DELETE FROM playlist WHERE playlist_id = $1::text; -- delete the playlist

-- add a song to a playlist
-- $1: song_id, $2: playlist_id
-- ex. song_id = '0SdMLlsw5FOEbHJmJs8aUA', playlist_id = '8092bcc7-37ee-4114-bc5e-eac125b3bb9b'
INSERT INTO in_playlist VALUES ('0SdMLlsw5FOEbHJmJs8aUA', '8092bcc7-37ee-4114-bc5e-eac125b3bb9b');

-- delete a song from a playlist
-- $1: song_id, $2: playlist_id
-- ex. song_id = '0SdMLlsw5FOEbHJmJs8aUA', playlist_id = '8092bcc7-37ee-4114-bc5e-eac125b3bb9b'
DELETE FROM in_playlist WHERE song_id = '0SdMLlsw5FOEbHJmJs8aUA' AND playlist_id = '8092bcc7-37ee-4114-bc5e-eac125b3bb9b';

-- get all the playlists created by a certain user
-- $1: user_id
-- ex. $1 = '63e439ec-8625-4912-8b03-e34d5a7cfaee'
SELECT playlist_id, name 
  FROM playlist
  WHERE user_id = '63e439ec-8625-4912-8b03-e34d5a7cfaee';