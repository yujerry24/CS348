import json
import requests

key = 'ya29.a0AfH6SMCMhKO_ZL6z3vp4JJVDD7bHXflcrPwUPkWUqyAIFK-sWuHaPlZormKGx1qd_TwS5aWBb5rh1LfczJ5aNziFGXcaOtH6JaEpDgzBCW1QaMcs_dIk_AU_vn39yr-zyK386mNr0mZQZYInIWtvPmaxwlJBt3bocSzg_0MV8g'
apikey = "AIzaSyDcaZ2egOmTqJ97-ymDs3QUhjorgMsYcIM"
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
                    'fields' : "items(id(videoId),snippet(title))"
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