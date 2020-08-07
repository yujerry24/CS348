SELECT * FROM "user" WHERE user_id = 'Timothy';

--create a new user
INSERT INTO "user" VALUES 'Timothy';

-- create a new user's liked playlist
INSERT INTO playlist VALUES ('Timothy-liked-songs', 'My Liked Songs', 0, 'Timothy');
