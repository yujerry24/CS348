-- list the songs that are in a playlist
-- $1: playlist id 
-- ex.8092bcc7-37ee-4114-bc5e-eac125b3bb9b
SELECT S.song_id, S.name as song_name, artist.name as artist_name, album.name as album_name, video_duration,
 ( S.song_id IN (
   SELECT song_id 
   FROM in_playlist
   WHERE playlist_id='Timothy-liked-songs')
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

---Create a new playlist containing all the songs from 2 existing playlists created by a certain user
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

SELECT playlist_id, name, user_id FROM playlist
  WHERE LOWER(name) LIKE LOWER('%play%') AND playlist_id NOT LIKE '%-liked-songs';

SELECT S.song_id, S.name as song_name, AR.name as artist_name, AL.name as album_name, S.video_duration,
 ( S.song_id IN (
   SELECT song_id 
   FROM in_playlist
   WHERE playlist_id='Timothy-liked-songs')
   ) as isFavourite
FROM song S
  INNER JOIN wrote W ON S.song_id = W.song_id
  INNER JOIN artist AR ON W.artist_id = AR.artist_id
  INNER JOIN album AL ON AL.album_id = S.album_id
WHERE (
  S.song_id IN (
    SELECT song_id 
    FROM song
    WHERE LOWER(song.name) LIKE LOWER('%book%')
  )
) OR (
  S.song_id IN (
    SELECT song_id 
    FROM wrote INNER JOIN artist ON wrote.artist_id = artist.artist_id 
    WHERE LOWER(artist.name) LIKE LOWER('%book%')
  )
) OR (
  S.song_id IN (
    SELECT song_id 
    FROM song INNER JOIN album ON song.album_id = album.album_id 
    WHERE LOWER(album.name) LIKE LOWER('%book%')
  )
)
LIMIT 30;

-- This query will return the top 20 most popular artists
-- Popularity is determined by the number of occurances
-- of an artist in a playlist across all users

-- NOTE:
-- - The order the songs are returned in is not
-- reflective of how popular they are.



SELECT DISTINCT * FROM (
    SELECT A.name AS artist_name, inPlay.in_num_of_playlists
    FROM artist A
        INNER JOIN wrote W ON A.artist_id = W.artist_id
        INNER JOIN song S ON S.song_id = W.song_id
        INNER JOIN (
            -- get the most popular artist in terms of number of playlists they are in
            SELECT * FROM (
                SELECT A2.artist_id, count(A2.artist_id) AS in_num_of_playlists
                FROM (
                    SELECT DISTINCT A2.artist_id, P.playlist_id FROM artist A2
                        INNER JOIN wrote W2 ON A2.artist_id = W2.artist_id
                        INNER JOIN in_playlist P ON W2.song_id = P.song_id
                ) AS A2
                GROUP BY A2.artist_id
                ORDER BY count(A2.artist_id) DESC
            ) AS playlist_songs LIMIT 20
        ) inPlay ON A.artist_id = inPlay.artist_id
) AS most_pop_artists
ORDER BY in_num_of_playlists DESC;

-- This query will return the top 20 most popular songs
-- Popularity is determined by the number of occurances
-- of a song in a playlist across all users

-- NOTE: The order the songs are returned in is not
--      reflective of how popular they are.


SELECT S.song_id, S.name as song_name, video_duration, Al.name as album_name, A.name as artist_name 
FROM song S 
    INNER JOIN wrote W on S.song_id = W.song_id
    INNER JOIN artist A on W.artist_id = A.artist_id
    INNER JOIN album Al ON S.album_id = Al.album_id
WHERE(
    S.song_id in (
        SELECT * FROM (
            SELECT P.song_id FROM in_playlist P
            GROUP BY P.song_id
            ORDER BY count(P.song_id) DESC
        ) AS in_play LIMIT 20
    )
);

INSERT INTO playlist (playlist_id, name, views, user_id) VALUES (
	'63e439ec-8625-4912-8b03-e34d5a7cfaee-liked-songs',
	'myPlaylistName',
	0,
	'63e439ec-8625-4912-8b03-e34d5a7cfaee'
) ON CONFLICT DO NOTHING;

INSERT INTO in_playlist (song_id, playlist_id) VALUES (
	'00Jrzl6fENQd3XEWGDtowy',
	'63e439ec-8625-4912-8b03-e34d5a7cfaee-liked-songs'
) ON CONFLICT DO NOTHING;

SELECT * FROM "user" WHERE user_id = 'Timothy';

INSERT INTO "user" VALUES ('Timothy');

INSERT INTO playlist VALUES ('Timothy-liked-songs', 'My Liked Songs', 0, 'Timothy');

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