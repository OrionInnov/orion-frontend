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
from .db_iface import db
from .db_iface import load_config
from .db_iface import save_config
from .db_iface import load_positions


# valid image extensions
VALID_IMG_EXT = ["jpg", "png"]


################################ STATIC ROUTES ################################

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/product")
def product():
    return render_template("product.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/fonts/<path:path>")
def static_fonts():
    return send_from_directory(os.path.join("static", "fonts"))

@app.route("/testgateway", methods=["POST"])
def testgateway():
    print (request.get_data())
    return json.dumps({"status": 1})


################################ DYNAMIC PAGES ################################

@app.route("/cal", methods=['GET', "POST"])
def cal():
    data = json.loads(request.form.get('data'))
    cursor = db.calculate.find()
    for result in cursor:
        result.pop("_id")
        for tagid0 in result.keys():
            db.calculate.update({tagid0: 1}, {
                "$set": {tagid0: 0}
            })
        for tagid in result.keys():
            for tagid1 in data['checkID']:
                if tagid == tagid1:
                    db.calculate.update({tagid: 0}, {
                        "$set": {tagid: 1}
                    })
                else:
                    db.calculate.update({tagid: 0}, {
                        "$set": {tagid: 0}
                    })
    return "test"


@app.route("/getconf")
def getconf():
    return json.dumps(load_config())


@app.route("/setconf", methods=["POST"])
def setconf():
    save_config(json.loads(request.get_data()))
    return json.dumps({"status": 1})


@app.route("/positions")
def positions():
    return json.dumps(load_positions())


@app.route("/upload", methods=["POST"])
def upload():
    img = request.files["file"]

    # ensure that file extension is valid
    ext = img.filename.split(".")[-1].lower()
    if ext not in VALID_IMG_EXT:
        return json.dumps({"status": 0})
    else:
    # save the image
        fname = "position.png"
        img.save(os.path.join(app.root_path, "static", "img", fname))

    # create base64-encoded image
    img.seek(0)
    img_b64 = base64.b64encode(img.read())
    img_b64 = "data:image/{0};base64,".format(ext) + img_b64

    return json.dumps({"status": 1, "img": img_b64})


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
