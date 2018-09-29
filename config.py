import json
import pymongo
import time
import os

from flask import request


# MongoDB client URL and port
DEFAULT_URL = "mongodb://localhost:27017"

# connect to MongoDB instance
client = pymongo.MongoClient(DEFAULT_URL)
db = client["orion"]


def create_history():
    create_time = time.time()
    list_historytrack = []
    dic_part = {}
    dic_all = {}
    cursor = db.config.find()
    for result in cursor:
        for num in range(len(result["tags"])):
            dic_part["name"] = "Tag" + str(num)
            dic_part["pos"] = []
            dic_part["time"] = create_time
            list_historytrack.append(dic_part)
            dic_part = {}
        dic_all["historytrack"] = list_historytrack
    db.history.insert(dic_all, check_keys=False)


def save_history(totallist):
    change_time = time.time()
    list_historytrack = []
    dic_part = {}
    dic_all = {}
    for num in range(len(totallist)):
        dic_part["name"] = "Tag" + str(num)
        dic_part["pos"] = totallist[num]
        dic_part["time"] = change_time
        list_historytrack.append(dic_part)
        dic_part = {}
    dic_all["historytrack"] = list_historytrack
    db.history.insert(dic_all, check_keys=False)


def change_pos(data):
    totallist = []
    cursor = db.history.find()
    for result in cursor:
        result.pop("_id")
    for num in range(len(result['historytrack'])):
        poslist = result['historytrack'][num]['pos']
        totallist.append(poslist)
    totallist[data["tag"]] = data["location"]
    save_history(totallist)


def load_config():
    cursor = db.config.find()
    for result in cursor:
        result.pop("_id")
    return result


def save_config(config):
    db.config.remove()
    db.config.save(config, check_keys=False)
