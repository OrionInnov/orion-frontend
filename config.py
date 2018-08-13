import json
import pymongo
import time


# MongoDB client URL and port
DEFAULT_URL = "mongodb://localhost:27017"

client = pymongo.MongoClient(DEFAULT_URL)
db = client['orion']


# test = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0],
#        [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]

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
        print(num)
        print(dic1)
        list1.append(dic1)
        dic1 = {}
        print(list1)
        num = num + 1
    dic2["historytrack"] = list1
    print(dic2)
    db.history.insert(dic2, check_keys=False)
    

def change_pos(data):
    totallist = []
    num = 0
    cursor = db.history.find()
    print(cursor)
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
    config = json.dumps(result)
    print(result)
    return config
