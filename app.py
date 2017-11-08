"""
app.py: Entry point for orion-frontend.
"""

from __future__ import print_function

import argparse
from collections import namedtuple
import json
import multiprocessing
import tempfile

from flask import Flask, render_template, send_from_directory
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


@app.route("/positions")
def load_positions():
    raise NotImplementedError()


@app.route("/_positions")
def debug_positions():
    pos_data = DEBUG_TAG_POS + np.random.random((DEBUG_NUM_TAGS, 2))
    pos_repr = np.array(40 * pos_data, dtype=np.int32).tolist()
    response = json.dumps(pos_repr)
    return response


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

    app.run("0.0.0.0", 8000)
