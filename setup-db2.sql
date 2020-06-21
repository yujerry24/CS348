-- entity sets

CREATE TABLE album (
    album_id VARCHAR(30) NOT NULL PRIMARY KEY,
    name VARCHAR(100),
    release_date DATE
);

CREATE TABLE artist (
    artist_id VARCHAR(30) NOT NULL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE song (
    song_id VARCHAR(30) NOT NULL PRIMARY KEY,
    name VARCHAR(100),
    video_duration INT,
    popularity INT,
    video_id VARCHAR(30),
    album_id VARCHAR(30),
    song_num INT,
    disc_num INT,
    FOREIGN KEY(album_id) REFERENCES album
);

CREATE TABLE playlist (
    playlist_id VARCHAR(30) NOT NULL PRIMARY KEY,
    name VARCHAR(100),
    views INT,
    user_id VARCHAR(30),
    FOREIGN KEY(user_id) REFERENCES "user"
);

CREATE TABLE "user" (
    user_id VARCHAR(30) NOT NULL PRIMARY KEY,
    name VARCHAR(100)
);

-- relationship sets

CREATE TABLE produced (
    artist_id VARCHAR(30) NOT NULL,
    album_id VARCHAR(30) NOT NULL,
    PRIMARY KEY(artist_id, album_id),
    FOREIGN KEY(artist_id) REFERENCES artist,
    FOREIGN KEY(album_id) REFERENCES album
);

CREATE TABLE wrote (
    artist_id VARCHAR(30) NOT NULL,
    song_id VARCHAR(30) NOT NULL,
    PRIMARY KEY(artist_id, song_id),
    FOREIGN KEY(artist_id) REFERENCES artist,
    FOREIGN KEY(song_id) REFERENCES song
);

CREATE TABLE in_playlist (
    song_id VARCHAR(30) NOT NULL,
    playlist_id VARCHAR(30) NOT NULL,
    PRIMARY KEY(song_id, playlist_id),
    FOREIGN KEY(song_id) REFERENCES song,
    FOREIGN KEY(playlist_id) REFERENCES playlist
);
