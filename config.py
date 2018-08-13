# coding:utf-8
import json
import pymongo

# MongoDB client URL and port
DEFAULT_URL = "mongodb://localhost:27017"

client = pymongo.MongoClient(DEFAULT_URL)
db = client['orion']


# test = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0],
#        [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]

poslist = []
data = {"tag": 1, "location": [1, 2, 3]}

def change_pos(data):
    num = 0
    cursor = db.history.find()
    print(cursor)
    for result in cursor:
        result.pop("_id")
    # print(result)
    # print(result['historytrack'][1]['pos'])
    # print(len(result['historytrack']))
    while num < len(result['historytrack']):
        list = result['historytrack'][num]['pos']
        poslist.append(list)
        num = num + 1
    poslist[data["tag"]] = data["location"]
    # print(poslist)

        
def save_history(poslist):
    num = 0
    import time
    time1 = time.time()
    list1 = []
    dic1 = {}
    dic2 = {}
    while num < len(poslist):
        dic1["name"] = "Tag" + str(num)
        dic1["pos"] = poslist[num]
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
    

def load_config():
    cursor = db.config.find()
    for result in cursor:
        result.pop("_id")
    config = json.dumps(result)
    print(result)
    return config
