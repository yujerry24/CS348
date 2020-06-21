import json
import requests
import time
from bs4 import BeautifulSoup

with open("DATA/ForYT.json", "r") as f:
    songs = json.load(f)
    print("ForYT Done")
print("SIZE: " + str(len(songs)))

with open("DATA/Videos2.json", "r") as f:
    videos = json.load(f)
    print("Videos2 Done")

BASEURL = "https://www.youtube.com/results?search_query="
for index, song in enumerate(songs):
    songid = song['songid']
    if songid not in videos.keys():
        found = False
        for i in range(10):
            strings = song['name'].split(" ")
            if type(strings) != list:
                strings = [strings]
            artist = song['artistName'].split(" ")
            if type(artist) != list:
                artist = [artist]
            strings.extend(artist)
            query = ""
            for string in strings:
                query += string.strip() + "+"
            link = BASEURL + query[0:-1]
            print(link)
            req = requests.get(link)
            if req.status_code != 200: 
                print("QUERY {} {}".format(index, query))
                break

            soup = BeautifulSoup(req.text, 'html.parser')

            try:
                element = soup.find_all("ol", class_="item-section")[0].find("h3", class_="yt-lockup-title")
                if str(element).find("Duration") == -1:
                    print("Bad HTML")
                    continue
                found = True
                break
            except Exception as e:
                print("Fetch Error: " + str(e))
                time.sleep(0.25)
        if not found:
            print("Fail on " + link)
            break
        print(element)

        try:
            title = element.find("a")
            vidName = element.text

            # '/watch?v=Amq-qlqbjYA&list=RDQMNmyLqgPmcnE&start_radio=1'
            link = title.get("href")
            firstVIndex = link.find("v")
            firstAmp = link.find("&")
            vidid = link[firstVIndex + 2:] if firstAmp < 0 else  link[firstVIndex + 2 : firstAmp - 1]
            # '- Duration: 3:37.'
            durationText = element.find("span").text
            colonIndex = durationText.find(":")
            durationText2 = durationText[colonIndex + 2 : -1]
            split = durationText2.split(":")
        except Exception as e:
            print("Process Error: " + str(e))
            continue

        if len(split) == 2:
            duration = 60 * int(split[0]) + int(split[1])
        elif len(split) == 3:
            duration = 3600 * int(split[0]) + 60 * int(split[1]) + int(split[2])
        else:
            duration = durationText2

        videos[songid] = dict(name=query, vidid=vidid, vidname=vidName, duration=duration)

print("SIZE: " + str(len(videos.keys())))
with open("DATA/Videos2.json", "w+") as f:
    json.dump(videos, f)
    print("Videos2 Done")