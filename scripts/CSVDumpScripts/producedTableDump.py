# -*- coding: utf-8 -*-
"""
Created on Sun Jun 14 21:10:28 2020

@author: YuJer
"""

import json
import csv 


with open("DATA/wroteAlbums.json", "r") as f:
    albumData = json.load(f)
    print("albumData Done")
print("SIZE: " + str(len(albumData)))


newDict = []
for key in albumData:
    for artist_id in albumData[key]:
        newDict.append({'album_id' : key,
                        'artist_id' : artist_id})

with open("DATA/producedTable.json", "w+") as f:
    json.dump(newDict, f)
    print("Merge done")
    
with open('DATA/producedTable.json') as json_file: 
    song_data = json.load(json_file)    
    
data_file = open('producedTable.csv', 'w',newline='',encoding="utf-8") 
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

    
    