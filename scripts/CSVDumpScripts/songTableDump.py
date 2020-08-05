# -*- coding: utf-8 -*-
"""
Created on Sun Jun 14 21:10:28 2020

@author: YuJer
"""

import json
import csv 


with open("DATA/inAlbum.json", "r") as f:
    albumData = json.load(f)
    print("albumData Done")
print("SIZE: " + str(len(albumData)))

with open("DATA/songs.json", "r") as f:
    songs = json.load(f)
    print("songs Done")
print("SIZE: " + str(len(songs)))

with open("DATA/videos2.json", "r") as f:
    videos = json.load(f)
    print("videos Done")
print("SIZE: " + str(len(videos)))

assert len(songs) == len(albumData)
assert len(videos) == len(songs)
print( "Assertion: Json files of the same length passed")

newDict = []
for key in albumData:
        newDict.append({'song_id' : key,
                        'name' : songs[key]["name"],
                        'video_duration': videos[key]["duration"],
                        'popularity' : songs[key]["pop"],
                        'video_id' : videos[key]["vidid"],
                        'album_id' : albumData[key]["albumId"], 
                        'song_num' : albumData[key]["songNum"],  
                        'disc_num' : albumData[key]["discNum"]})

with open("DATA/dbData.json", "w+") as f:
    json.dump(newDict, f)
    print("Merge done")
    
with open('DATA/dbData.json') as json_file: 
    song_data = json.load(json_file)    
    
data_file = open('data_file.csv', 'w',newline='',encoding="utf-8") 
print (len(song_data))
csv_writer = csv.writer(data_file) 
count = 0
  
for song in song_data: 
    if count == 0: 
  
        # Writing headers of CSV file 
        header = song.keys() 
        csv_writer.writerow(header) 
        count += 1
  
    # Writing data of CSV file 
    csv_writer.writerow(song.values()) 
  
data_file.close() 

    
    