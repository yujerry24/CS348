# -*- coding: utf-8 -*-
"""
Created on Sun Jun 14 21:10:28 2020

@author: YuJer
"""

import json

with open("DATA/inAlbum.json", "r") as f:
    albumData = json.load(f)
    print("albumData Done")
print("SIZE: " + str(len(albumData)))

with open("DATA/songs.json", "r") as f:
    songs = json.load(f)
    print("songs Done")
print("SIZE: " + str(len(songs)))

assert len(songs) == len(albumData)
print( "Assertion: Json files of the same length passed")

newDict = {}
for key in albumData:
        newDict[key] = {'albumID' : albumData[key]["albumId"], 
                        'songNum' : albumData[key]["songNum"],  
                        'discNum' : albumData[key]["discNum"],
                        'name' : songs[key]["name"],
                        'pop' : songs[key]["pop"]}

with open("DATA/iHateFrank.json", "w+") as f:
    json.dump(newDict, f)
    print("Merge done")

    
    