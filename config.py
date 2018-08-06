import json
import pymongo
client = pymongo.MongoClient('mongodb://localhost:27017')
db = client['orion']


def load_config():
    cursor = db.config.find()
    for result in cursor:
        result.pop("_id")
    config = json.dumps(result)
    print(result)
    return config
