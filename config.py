import json
import pymongo


test = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0],
        [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]

data = {"tag": 6, "location": [1, 2, 3]}
def change_pos(data, test):
    test[data["tag"]] = data["location"]
    print(test)

client = pymongo.MongoClient('mongodb://localhost:27017')
db = client['orion']

def save_history():
    num = 0
    import time
    time1 = time.time()
    list1 = []
    dic1 = {}
    dic2 = {}
    while num < len(test):
        dic1["name"] = "Tag" + str(num)
        dic1["pos"] = test[num]
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
