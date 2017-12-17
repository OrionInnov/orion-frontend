"""
app.py: Entry point for orion-frontend.
"""

from __future__ import print_function

import argparse
from collections import namedtuple
import json
import multiprocessing
import tempfile

from flask import Flask, request, make_response, render_template, redirect, send_from_directory, url_for
from werkzeug.utils import secure_filename
from os import path
import numpy as np
#from orion import backend


#DEBUG
np.set_printoptions(precision=2, suppress=True,
                    formatter={"float": lambda n: "{0:.2f}".format(n)})


app = Flask(__name__)


# debug parameters
DEBUG_NUM_TAGS = 10
DEBUG_ROOM_SIZE = 25
DEBUG_TAG_NAMES = ["Tag" + str(n) for n in range(DEBUG_NUM_TAGS)]
DEBUG_TAG_POS = np.random.random((DEBUG_NUM_TAGS, 2)) * DEBUG_ROOM_SIZE


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/css/<path:path>")
def static_css(path):
    return send_from_directory("static/css", path)


@app.route("/img/<path:path>")
def static_imgs(path):
    return send_from_directory("static/img", path)


@app.route("/js/<path:path>")
def static_js(path):
    return send_from_directory("static/js", path)


@app.route("/uploads/<path:path>")
def static_uploads(path):
    return send_from_directory("static/uploads", path)


@app.route("/config")
def load_config():
    raise NotImplementedError()


@app.route("/_config")
def debug_config():
    config = {
        "num_tags": DEBUG_NUM_TAGS,
        "tag_names": DEBUG_TAG_NAMES
    }
    return json.dumps(config)


@app.route("/set_config", methods=["POST"])
def set_config():
    data = request.get_data()
    data = json.loads(data)
    print(data)
    return json.dumps(data)#set_config and config needs to change


@app.route("/history_track", methods=["POST"])
def history_track():
    timedata = request.get_data()
    timedata = json.loads(timedata)
    num1 = 1
    num2 = 6
    config = []
    confighistory = []
    while (num1 <= num2):
        with open("/tmp/orion/" + str(num1) + ".json") as f:
            timetrackdata = f.readlines()
            config.append(timetrackdata)
        num1 += 1
    for i in config:
        confighistory.append(i[1])
    return json.dumps(timedata)#history_track needs to change


@app.route("/positions")
def load_positions():
    raise NotImplementedError()


@app.route("/_positions")
def debug_positions():
    pos_data = DEBUG_TAG_POS + np.random.random((DEBUG_NUM_TAGS, 2))
    pos_repr = np.array(40 * pos_data, dtype=np.int32).tolist()
    response = json.dumps(pos_repr)
    return response#positions needs to change


@app.route("/_set",methods=["GET","POST"])
def upload():
    if request.method=="POST":
        f = request.files["file"]
        fname = secure_filename(f.filename)
        ext = fname.rsplit(".", 1)[1]
        new_filename = "position." + ext
        base_path = path.abspath(path.dirname(__file__))
        upload_path = path.join(base_path, "static/uploads/")
        file_name = upload_path + secure_filename(new_filename)
        f.save(file_name)
        return redirect(url_for("set"))
    return render_template("set.html")#There's some error,and need to change to base64


def init_backend():

    # create temporary directory for backend
    tempdir = tempfile.mkdtemp()

    # load current config
    config = load_config()

    kwargs = {"config": config, "tempdir": tempdir}
    be_proc = multiprocessing.Process(target=backend.start,
                                      args=("nosql", False),
                                      kwargs=kwargs)

    # start backend
    be.start()


if __name__ == "__main__":

    app.run("0.0.0.0", 8000, debug=True)
