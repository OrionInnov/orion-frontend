"""
views.py: Views definition for Orion frontend.
"""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import base64
import json
import os
import pymongo
import sys

from flask import Flask, render_template
from flask import request
from flask import send_from_directory

from . import app

# Type of image
VALID_IMG_EXT = ["jpg", "png"]

# MongoDB client URL and port
DEFAULT_URL = "mongodb://localhost:27017"

client = pymongo.MongoClient(DEFAULT_URL)
db = client["orion"]


################################ STATIC ROUTES ################################

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/fonts/<path:path>")
def static_fonts():
    return send_from_directory(os.path.join("static", "fonts"))


################################ DYNAMIC PAGES ################################


@app.route("/cal", methods=['GET',"POST"])
def cal():
    checkid = request.form.get('checkID')
    print(checkid)
    print("122")
    return "test"






@app.route("/getconf")
def getconf():
    cursor = db.config.find()
    for result in cursor:
        result.pop("_id")
    tagname = json.dumps(result)

    return tagname


@app.route("/setconf", methods=["POST"])
def setconf():
    data = request.get_json()
    db.config.save(data, check_keys=False)

    return json.dumps({"status": 1})


@app.route("/positions")
def positions():
    num = 0
    num1 = 0
    posdata = []
    posdata1 = []
    posdata2 = []
    cursor = db.history.find()
    for result in cursor:
        result.pop("_id")
        historytrack = result["historytrack"]
        while num < len(historytrack):
            posdata.append(historytrack[num]['pos'][0])
            posdata.append(historytrack[num]['pos'][1])
            num = num + 1
            posdata1.append(posdata)
            posdata = []
        posdata2.append(posdata1)
        posdata1 = []
        num = 0
    return json.dumps(posdata2)


@app.route("/upload", methods=["POST"])
def upload():
    img = request.files["file"]

    # ensure that file extension is valid
    ext = img.filename.split(".")[-1].lower()
    if ext not in VALID_IMG_EXT:
        return json.dumps({"status": 0})

    # save the image
    fname = "position." + ext
    img.save(os.path.join(app.root_path, "static", "img", fname))

    # create base64-encoded image
    img.seek(0)
    img_b64 = base64.b64encode(img.read())
    img_b64 = "data:image/{0};base64,".format(ext) + img_b64

    return json.dumps({"status": 1, "img": img_b64})


@app.route("/history", methods=["POST"])
def history():
    # TODO(fzliu): get this working
    timedata = request.get_data()
    raise NotImplementedError()


@app.route("/history_track", methods=["POST"])
def history_track():
    timedata = request.get_data()
    timedata = json.loads(timedata)
    num = 0
    num1 = 0
    posdata = []
    posdata1 = []
    posdata2 = []
    cursor = db.history.find()

    for result in cursor:
        result.pop("_id")
        historytrack = result["historytrack"]
        while num < len(historytrack):
            posdata.append(historytrack[num]['pos'][0])
            posdata.append(historytrack[num]['pos'][1])
            num = num + 1
            posdata1.append(posdata)
            posdata = []
        posdata2.append(posdata1)
        posdata1 = []
        num = 0
    return json.dumps(posdata2)  # history_track needs to change


################################# DEBUG PAGES #################################


import numpy as np

# debug parameters
DEBUG_NUM_TAGS = 10
DEBUG_ROOM_SIZE = 25
DEBUG_TAG_NAMES = ["Tag" + str(n) for n in range(DEBUG_NUM_TAGS)]
DEBUG_TAG_POS = np.random.random((DEBUG_NUM_TAGS, 2)) * DEBUG_ROOM_SIZE


@app.route("/_getconf")
def _config():
    config = {
        "num_tags": DEBUG_NUM_TAGS,
        "tag_names": DEBUG_TAG_NAMES
    }
    return json.dumps(config)


@app.route("/_positions")
def _positions():
    pos_data = DEBUG_TAG_POS + np.random.random((DEBUG_NUM_TAGS, 2))
    pos_repr = np.array(40 * pos_data, dtype=np.int32).tolist()
    return json.dumps(pos_repr)


if __name__ == "__main__":
    app.run("0.0.0.0", 8000, debug=True)
