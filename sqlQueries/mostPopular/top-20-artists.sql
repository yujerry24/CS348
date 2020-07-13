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
