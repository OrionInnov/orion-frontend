import json
import pymongo
import time

from flask import request

# MongoDB client URL and port
DEFAULT_URL = "mongodb://localhost:27017"

client = pymongo.MongoClient(DEFAULT_URL)
db = client['orion']



def create_history():
    create_time = time.time()
    num = 0
    list_historytrack = []
    dic_part = {}
    dic_all = {}
    cursor = db.config.find()
    for result in cursor:
        while num < len(result['tags']):
            dic_part["name"] = "Tag" + str(num)
            dic_part["pos"] = []
            dic_part["time"] = create_time
            list_historytrack.append(dic_part)
            dic_part = {}
            num = num + 1
        dic_all["historytrack"] = list_historytrack
    db.history.insert(dic_all, check_keys=False)



def save_history(totallist):
    change_time = time.time()
    num = 0
    list_historytrack = []
    dic_part = {}
    dic_all = {}
    while num < len(totallist):
        dic_part["name"] = "Tag" + str(num)
        dic_part["pos"] = totallist[num]
        dic_part["time"] = change_time
        list_historytrack.append(dic_part)
        dic_part = {}
        num = num + 1
    dic_all["historytrack"] = list_historytrack
    db.history.insert(dic_all, check_keys=False)


def change_pos(data):
    totallist = []
    num = 0
    cursor = db.history.find()
    for result in cursor:
        result.pop("_id")
    while num < len(result['historytrack']):
        poslist = result['historytrack'][num]['pos']
        totallist.append(poslist)
        num = num + 1
    totallist[data["tag"]] = data["location"]
    save_history(totallist)


def load_config():
    cursor = db.config.find()
    for result in cursor:
        result.pop("_id")
    return result



