-- This query will return the top 20 most popular songs
-- Popularity is determined by the number of occurances
-- of a song in a playlist across all users

-- NOTE: The order the songs are returned in is not
--      reflective of how popular they are.

SELECT S.song_id, S.name as song_name, A.name as artist_name, Al.name as album_name, video_duration, video_id,
    ( S.song_id IN (
        SELECT song_id 
        FROM in_playlist
        WHERE playlist_id='Timothy')
        ) as isFavourite
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
