import json
import pymongo
import time

# MongoDB client URL and port
DEFAULT_URL = "mongodb://localhost:27017"

client = pymongo.MongoClient(DEFAULT_URL)
db = client['orion']


history = {
    "historytrack": [
        {
            "time": 1534142258.264,
            "name": "Tag0",
            "pos": [
                10,
                10,
                10
            ]
        },
        {
            "time": 1534142258.264,
            "name": "Tag1",
            "pos": [
                10,
                10,
                100
            ]
        },
        {
            "time": 1534142258.264,
            "name": "Tag2",
            "pos": [
                20,
                20,
                2
            ]
        },
        {
            "time": 1534142258.264,
            "name": "Tag3",
            "pos": [
                30,
                30,
                30
            ]
        },
        {
            "time": 1534142258.264,
            "name": "Tag4",
            "pos": [
                40,
                40,
                40
            ]
        },
        {
            "time": 1534142258.264,
            "name": "Tag5",
            "pos": [
                50,
                5,
                50
            ]
        },
        {
            "time": 1534142258.264,
            "name": "Tag6",
            "pos": [
                60,
                60,
                60
            ]
        },
        {
            "time": 1534142258.264,
            "name": "Tag7",
            "pos": [
                70,
                70,
                7
            ]
        },
        {
            "time": 1534142258.264,
            "name": "Tag8",
            "pos": [
                8,
                80,
                80
            ]
        },
        {
            "time": 1534142258.264,
            "name": "Tag9",
            "pos": [
                9,
                90,
                90
            ]
        }
    ]
}


def create_history():
    db.history.insert(history)


def save_history(totallist):
    num = 0
    time1 = time.time()
    list1 = []
    dic1 = {}
    dic2 = {}
    while num < len(totallist):
        dic1["name"] = "Tag" + str(num)
        dic1["pos"] = totallist[num]
        dic1["time"] = time1
        list1.append(dic1)
        dic1 = {}
        num = num + 1
    dic2["historytrack"] = list1
    db.history.insert(dic2, check_keys=False)


def change_pos(data):
    create_history()
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


