import json
import requests

headers = { 'Authorization': 'Bearer ' + "BQAzAf9MnchERLk0NglGQCTK1oCcb2zxZM4PGHJnELkP2Hsm2TFgp7nC40q-dbneiqcVYCsCnLM2KYW7ACqfVB36rGOSUxw4eA87Y5IVpxBlC91vcyzfYiz1pf2wDh-1L0Z5qWV8u45tBuOvEZXYTK-AslTM7tc" }
# r = requests.get(
#     'https://api.spotify.com/v1/search?q=kpop&type=playlist',
#     params={'q': 'kpop', 'type': 'playlist'},
#     headers=headers
# )

with open("playlists.json", "r") as f:
    items = json.load(f)
    
    # check the Retry-After header, where you will see a number displayed. This is the number of seconds that you need to wait, before you try your request again.

# items = r.json()['playlists']['items']
# items = [dict(id="37i9dQZF1DX9tPFwDMOaN1",name="K-Pop Daebak")]
tracks = []
for i in items:
    # playlists.append((i["id"], i['name']))
    req = requests.get(
        'https://api.spotify.com/v1/playlists/{}/tracks'.format(i['id']),
        headers=headers
    )
    if req.status_code != 200: 
        print("PLAYLIST NUMBER {}".format(i))
        print("ITEM NUMBER {}".format(i))
        try:
            print(req.json()['error'])
        except:
            pass
        break
    req = req.json()
    trackitems = req['items']
    for track in trackitems:
        artists = [artist['name'] for artist in track['track']['artists']]
        tracks.append(dict(name=track['track']['name'], artists=artists))

# with open("tracks.json", "w+") as f:
#     json.dump(tracks, f)

with open("FilteredPlaylistData.json", "w+") as f:
    json.dump(tracks, f)
 
# with open("playlists.json", "w+") as f:
#     json.dump(playlists, f)
