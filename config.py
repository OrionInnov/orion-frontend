import json
import pymongo

test = [[1, 2, 3], [2, 3, 1], [2, 4, 5], [3, 2, 3]]
client = pymongo.MongoClient('mongodb://localhost:27017')
db = client['orion']

def save_history():
    num = 1
    posdic = {}
    import time
    time = time.time()
    while num <= len(test):
        posdic[str(num)] = test[num - 1]
        num = num + 1

    posdic["time"] = time
    print(posdic)
    db.history.insert(posdic)
    

def load_config():
    cursor = db.config.find()
    for result in cursor:
        result.pop("_id")
    config = json.dumps(result)
    print(result)
    return config
