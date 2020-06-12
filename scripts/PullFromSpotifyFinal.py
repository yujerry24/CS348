import json
import requests

key = "BQCKsLwtKS3xD-l0_R1nTc_v8G5_ohZkbXYs8-a3WGpMphRnlDaHH-UAVYd9cwzkeYKW9IhtO3pjVKOI3IiG6enIGYc_YCKnHk2fMtuhr8tcXnialW5-svXb2bwQNuACpnH0yyD1wPCrnyNQHuN7f9_WIWM-x4E"
headers = { 'Authorization': 'Bearer ' + key}

with open("DATA/playlists.json", "r") as f:
    playlists = json.load(f)

with open("DATA/albums.json", "r") as f:
    albums = json.load(f)
    print("Albums Done")

with open("DATA/artists.json", "r") as f:
    artists = json.load(f)
    print("Artists Done")
    
with open("DATA/songs.json", "r") as f:
    songs = json.load(f)
    print("Songs Done")

with open("DATA/wroteAlbums.json", "r") as f:
    wroteAlbums = json.load(f)
    print("WroteAlbums Done")

with open("DATA/wroteSongs.json", "r") as f:
    wroteSongs = json.load(f)
    print("WroteSongs Done")

with open("DATA/inAlbum.json", "r") as f:
    inAlbum = json.load(f)
    print("InAlbum Done")

forYT = []

for index, playlist in enumerate(playlists):
    req = requests.get(
        'https://api.spotify.com/v1/playlists/{}/tracks'.format(playlist['id']),
        headers=headers
    )
    if req.status_code != 200: 
        print("PLAYLIST NUMBER {}".format(index))
        print("PLAYLIST ID {}".format(playlist['id']))
        try:
            print(req.json()['error'])
        except:
            pass
        break
    req = req.json()
    tracks = req['items']
    for track in tracks:
        _songId = track['track']['id']
        if _songId not in songs.keys():
            _songName = track['track']['name']
            songNumber = track['track']['track_number']
            discNumber =  track['track']['disc_number']
            songs[_songId] = {}
            songs[_songId]['name'] = _songName
            songs[_songId]['pop'] = track['track']['popularity']
        
            songArtists = []
            for index, songArtist in enumerate(track['track']['artists']):
                artistId = songArtist['id']
                if artistId not in artists.keys():
                    artists[artistId] = songArtist['name']
                if index == 0:
                    _artistName = artists[artistId]
                songArtists.append(artistId)
            wroteSongs[_songId] = songArtists

            albumId = track['track']['album']['id']
            if albumId not in albums.keys():
                albums[albumId] = {}
                albums[albumId]['name'] = track['track']['album']['name']
                albums[albumId]['release'] = track['track']['album']['release_date']
                
                albumArtists = []
                for albumArtist in track['track']['album']['artists']:
                    artistId = albumArtist['id']
                    if artistId not in artists.keys():
                        artists[artistId] = albumArtist['name'] 
                    albumArtists.append(artistId)
                wroteAlbums[albumId] = albumArtists
            
            inAlbum[_songId] = dict(albumId=albumId, songNum=songNumber, discNum=discNumber)
            forYT.append(dict(name=_songName, artistName=_artistName, songid=_songId))

with open("DATA/ForYT.json", "w+") as f:
    json.dump(forYT, f)
    print("ForYT Done")

with open("DATA/albums.json", "w+") as f:
    json.dump(albums, f)
    print("Albums Done")

with open("DATA/artists.json", "w+") as f:
    json.dump(artists, f)
    print("Artists Done")
    
with open("DATA/songs.json", "w+") as f:
    json.dump(songs, f)
    print("Songs Done")

with open("DATA/wroteAlbums.json", "w+") as f:
    json.dump(wroteAlbums, f)
    print("WroteAlbums Done")

with open("DATA/wroteSongs.json", "w+") as f:
    json.dump(wroteSongs, f)
    print("WroteSongs Done")

with open("DATA/inAlbum.json", "w+") as f:
    json.dump(inAlbum, f)
    print("InAlbum Done")
