"""
views.py: Views definition for Orion frontend.
"""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import json
import os

from flask import current_app
from flask import make_response
from flask import redirect
from flask import request
from flask import render_template
from flask import send_from_directory
from flask import url_for
from werkzeug.utils import secure_filename

from . import app

import numpy as np

# debug parameters
DEBUG_NUM_TAGS = 10
DEBUG_ROOM_SIZE = 25
DEBUG_TAG_NAMES = ["Tag" + str(n) for n in range(DEBUG_NUM_TAGS)]
DEBUG_TAG_POS = np.random.random((DEBUG_NUM_TAGS, 2)) * DEBUG_ROOM_SIZE

# base and upload directories
BASE_PATH = os.path.abspath(os.path.dirname(__file__))
UPLOAD_PATH = os.path.join(BASE_PATH, "static", "uploads")


################################ STATIC ROUTES ################################

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/img/<path:path>")
def static_imgs(path):
    return send_from_directory("static/img", path)

@app.route("/uploads/<path:path>")
def static_uploads(path):
    return send_from_directory("static/uploads", path)


################################ DYNAMIC PAGES ################################

@app.route("/config")
def load_config():
    return json.dumps(current_app.orion_config)

@app.route("/set_config", methods=["POST"])
def set_config():
    current_app.orion_config = request.get_data()
    return {}

@app.route("/history_track", methods=["POST"])
def history_track():
    # TODO(fzliu): get this working
    timedata = request.get_data()
    print(timedata)
    timedata = json.loads(timedata)
    num1 = 1#timestart
    num2 = 10#timestop
    config = []
    configl = []
    confighistory = []
    while (num1 <= num2):
        with open("/tmp/orion/" + str(num1) + ".json") as f:
            timetrackdata = f.readlines()
            config.append(timetrackdata)
        num1 += 1
    for i in config:
        for j in i:
            k = eval(j)
            configl.append(k)
        confighistory.append(configl)
        configl = []
    return json.dumps(confighistory)

@app.route("/positions")
def load_positions():
    raise NotImplementedError()

@app.route("/upload", methods=["POST"])
def upload():
    f = request.files["file"]
    fname = secure_filename(f.filename)
    ext = fname.rsplit(".", 1)[1]
    new_filename = "position." + ext
    file_name = UPLOAD_PATH + secure_filename(new_filename)
    f.save(file_name)
    return redirect(url_for("set"))
    #return render_template("set.html")#There's some error,and need to change to base64


################################# DEBUG PAGES #################################

@app.route("/_config")
def debug_config():
    config = {
        "num_tags": DEBUG_NUM_TAGS,
        "tag_names": DEBUG_TAG_NAMES
    }
    return json.dumps(config)

@app.route("/_positions")
def debug_positions():
    pos_data = DEBUG_TAG_POS + np.random.random((DEBUG_NUM_TAGS, 2))
    pos_repr = np.array(40 * pos_data, dtype=np.int32).tolist()
    response = json.dumps(pos_repr)
    return response#positions needs to change
