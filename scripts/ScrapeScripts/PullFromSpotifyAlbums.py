import json
import requests

key = "BQAFpwqhUS4ePzWyda5gDxppmqxJpcIXLYck3F7rxcosan2uoFc7rVrBVraBONAL9NGpvcgvwsRxHJ8myYCR4svEsAN1sQdDMSH9A8WHw5QEUIhBA3QPCRcn2lNSUR0fjRk7rSWMXn5AVM8EOj7F1jxjU1zXeus"
headers = { 'Authorization': 'Bearer ' + key}

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
newArtists = {}
newWroteSongs = {}
newInAlbum = {}
newSongs = {}

for albumId, albumData in albums.items():
    req = requests.get(
        'https://api.spotify.com/v1/albums/{}/tracks'.format(albumId),
        headers=headers
    )
    if req.status_code != 200: 
        print("PLAYLIST ID {}".format(albumId))
        try:
            print(req.json()['error'])
        except:
            pass
        break
    req = req.json()
    tracks = req['items']
    for track in tracks:
        _songId = track['id']
        if _songId not in songs.keys():
            _songName = track['name']
            songNumber = track['track_number']
            discNumber =  track['disc_number']
            songs[_songId] = {}
            newSongs[_songId] = {}
            newSongs[_songId]['name'] = _songName
            newSongs[_songId]['pop'] = -1 # API doesn't return pop data 
        
            songArtists = []
            for index, songArtist in enumerate(track['artists']):
                artistId = songArtist['id']
                if artistId not in artists.keys():
                    artists[artistId] = songArtist['name']
                    newArtists[artistId] = songArtist['name']
                if index == 0:
                    _artistName = artists[artistId]
                songArtists.append(artistId)
            newWroteSongs[_songId] = songArtists
            
            newInAlbum[_songId] = dict(albumId=albumId, songNum=songNumber, discNum=discNumber)
            forYT.append(dict(name=_songName, artistName=_artistName, songid=_songId))

with open("newDATA/ForYT.json", "w+") as f:
    json.dump(forYT, f)
    print("ForYT Done")

with open("newDATA/artists.json", "w+") as f:
    json.dump(newArtists, f)
    print("Artists Done")
    
with open("newDATA/songs.json", "w+") as f:
    json.dump(newSongs, f)
    print("Songs Done")

with open("newDATA/wroteSongs.json", "w+") as f:
    json.dump(newWroteSongs, f)
    print("WroteSongs Done")

with open("newDATA/inAlbum.json", "w+") as f:
    json.dump(newInAlbum, f)
    print("InAlbum Done")
