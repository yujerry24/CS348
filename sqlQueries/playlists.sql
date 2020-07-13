-- list the songs that are in a playlist
-- $1: playlist id 
-- ex.8092bcc7-37ee-4114-bc5e-eac125b3bb9b
SELECT S.song_id, S.name as song_name, artist.name as artist_name, album.name as album_name, video_duration,
 ( S.song_id IN (
   SELECT song_id 
   FROM playlist INNER JOIN in_playlist ON playlist.playlist_id = in_playlist.playlist_id 
   WHERE playlist.playlist_id='Timothy-liked-song')
   ) as isFavourite
FROM song S 
  INNER JOIN in_playlist ON S.song_id = in_playlist.song_id
  INNER JOIN wrote ON S.song_id = wrote.song_id
  INNER JOIN artist ON wrote.artist_id = artist.artist_id
  INNER JOIN album ON album.album_id = S.album_id
WHERE in_playlist.playlist_id = '8092bcc7-37ee-4114-bc5e-eac125b3bb9b';

-- create a playlist
-- $1: playlist_id, $2: playlist_name, $3: user_id
-- ex. playlist_id = 'fakeId' playlist_name = 'MyFavs', user_id = 'Timothy'
INSERT INTO playlist VALUES ('fakeId', 'MyFavs', 0, 'Timothy');

---Create a new playlist containing all the songs from multiple existing playlists created by a certain user
-- $1: new playlist_id $2: first playlist_id $3: second playlist_id
-- ex. new playlist_id = 0c1966b6-4903-4caa-b997-706f6f174095,
--     first playlist_id = 2d7f55f0-6c7b-460c-948b-74b6e6cee6cd,
--     second playlist_id = 8092bcc7-37ee-4114-bc5e-eac125b3bb9b
INSERT INTO in_playlist (
  SELECT song_id, 'fakeId' AS playlist_id 
  FROM in_playlist 
  WHERE playlist_id = '2d7f55f0-6c7b-460c-948b-74b6e6cee6cd' 
  UNION
  SELECT song_id, 'fakeId' AS playlist_id 
  FROM in_playlist 
  WHERE playlist_id = '8092bcc7-37ee-4114-bc5e-eac125b3bb9b'
  UNION
  ...
);

-- delete a playlist
-- $1: playlist_id
-- ex. ???
DELETE FROM in_playlist WHERE playlist_id = 'fakeId'; -- first delete all songs in the playlist
DELETE FROM playlist WHERE playlist_id = 'fakeId'; -- delete the playlist

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
-- ex. $1 = 'Timothy'
SELECT playlist_id, name 
  FROM playlist
  WHERE user_id = 'Timothy';
