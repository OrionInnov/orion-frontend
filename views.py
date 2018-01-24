"""
views.py: Views definition for Orion frontend.
"""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import base64
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


VALID_IMG_EXT = ["jpg", "png"]


################################ STATIC ROUTES ################################

@app.route("/")
def index():

    return render_template("index.html")

@app.route("/fonts/<path:path>")
def static_fonts():

    return send_from_directory(os.path.join("static", "fonts"))

################################ DYNAMIC PAGES ################################

@app.route("/getconf")
def getconf():

    return json.dumps(load_config(path=cfg_path, ldall=False))

@app.route("/setconf", methods=["POST"])
def setconf():

    save_config(json.loads(request.get_data()), cfg_path)
    return json.dumps({"status": 1})

@app.route("/positions")
def positions():

    with open(pos_path, "r") as f:
        return f.read()

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
    print(timedata)
    raise NotImplementedError()

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
