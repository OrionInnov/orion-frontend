"""
db_iface: MongoDB interface functions.
"""
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


def load_config():
    """
        Loads the system configuration from MongoDB.
    """

    cursor = db.config.find()
    for result in cursor:
        result.pop("_id")
    return result


def save_config(config):
    """
        Saves system configuration to MongoDB.
    """

    db.config.remove()
    db.config.save(config, check_keys=False)


def load_positions():
    """
        Loads latest positions from MongoDB.
    """

    cursor = db.history.find()
    count = db.history.count()

    # extract raw positions from historical data
    pos_data = cursor[count-1]["historytrack"]
    all_pos = [pos["pos"] for pos in pos_data]

    return all_pos


def save_positions(all_pos):
    """
        Saves positions specified by `all_pos` to MongoDB.
    """

    row = []
    now = time.time()

    # create dictionary for current timestamp
    for (n, pos) in enumerate(all_pos):
        name = "Tag" + str(n)
        elem = {"name": name, "pos":  pos, "time": now}
        row.append(elem)

    record = {"historytrack": row}
    db.history.insert(record, check_keys=False)


def db_update(data):
    """
        Saves a single new position specified by `data` to MongoDB.
    """

    # if history collection does not exist, use dummy data
    if db.history.find().count() > 0:
        all_pos = load_positions()
    else:
        cursor = db.config.find()
        n_tags = len(cursor[0]["tags"])
        all_pos = [[] for _ in range(n_tags)]

    # update the latest position
    all_pos[data["tag"]] = data["location"]
    save_positions(all_pos)
