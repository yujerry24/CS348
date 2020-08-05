import json
import requests

# Script for pulling data from the youtube api, except google is hella stingy with their api daily usage so not practical
key = 'ya29.a0AfH6SMA5bl_I963L2Wd_7ZE34hbz_V3TvWtz5JecYAt9P4Wc1gql6aKM7FKILtvz29_DlcmcD1MJLSXirzSt2P3620q4bX3mXwIden6X4UVjEfRzFpBZMPlg0wTlfkdpOTrP1OHGXuOeKac8MQc5Wtpj4VjZvbP1e-fpNDXt'
# apikey = "AIzaSyDcaZ2egOmTqJ97-ymDs3QUhjorgMsYcIM"
apikey = "AIzaSyDfbNrqCcb6zfeHubhuUkyC7KOTEzlFRcE"
headers = { 'Authorization': 'Bearer ' + key}

with open("DATA/ForYT.json", "r") as f:
    songs = json.load(f)
    print("ForYT Done")

with open("DATA/Videos.json", "r") as f:
    videos = json.load(f)
    print("Videos Done")

for index, song in enumerate(songs):
    songid = song['songid']
    if songid not in videos.keys():
        query = "{} {}".format(song['name'], song['artistName'])
        req = requests.get(
            'https://www.googleapis.com/youtube/v3/search',
            params={'part': 'snippet', 
                    'key': apikey,
                    'maxResults': 1,
                    'fields' : "items(id(videoId),snippet(title))",
                    'q': query}
        )
        if req.status_code != 200: 
            print("QUERY {} {}".format(index, query))
            print(req.json())
            break
        req = req.json()
        res = req['items'][0]
        vidid = res['id']['videoId']
        vidName = res['snippet']['title']
        videos[songid] = dict(name=query, vidid=vidid, vidname=vidName)

with open("DATA/Videos.json", "w+") as f:
    json.dump(videos, f)
    print("Videos Done")