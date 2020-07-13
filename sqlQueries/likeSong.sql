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