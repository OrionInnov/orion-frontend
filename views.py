"""
views.py: Views definition for Orion frontend.
"""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import json
import os

from flask import make_response
from flask import redirect
from flask import request
from flask import render_template
from flask import send_from_directory
from flask import url_for

from . import app
from . import orion_dir
from . import cfg_path, pos_path
from ..config import load_config
from ..config import save_config


VALID_IMG_EXT = [".jpg", ".png", ".svg"]


################################ STATIC ROUTES ################################

@app.route("/")
def index():

    return render_template("index.html")

@app.route("/getconf")
def getconf():

    return json.dumps(load_config(path=cfg_path))

@app.route("/setconf", methods=["POST"])
def setconf():

    save_config(request.get_data(), cfg_path)
    return json.dumps({"status": 1})


################################ DYNAMIC PAGES ################################

@app.route("/history", methods=["POST"])
def history():

    # TODO(fzliu): get this working
    timedata = request.get_data()
    print(timedata)
    raise NotImplementedError()

@app.route("/positions")
def positions():

    with open(pos_path, "r") as f:
        return f.read()

@app.route("/upload", methods=["POST"])
def upload():

    file = request.files["file"]

    # ensure that file extension is valid
    ext = file.filename.split(".")[-1]
    if ext.lowercase not in VALID_IMG_EXT:
        return json.dumps({"status": 0})

    # save the image
    fname = "position." + ext
    file.save(os.path.join(app.root_path, "static", "img", fname))

    return json.dumps({"status": 1})


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
