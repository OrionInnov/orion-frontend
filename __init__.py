from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import os
import sys

from flask import Flask

app = Flask(__name__)

# create Orion-specific directory in user's home
orion_dir = os.path.expanduser("~/.orion")
if not os.path.isdir(orion_dir):
    os.mkdir(orion_dir)

# configuration and latest positioning paths
# .opf = Orion Positioning Result file
cfg_path = os.path.join(orion_dir, "config.json")
pos_path = os.path.join(orion_dir, "latest.txt")

# Flask instance webapp
# http://flask.pocoo.org/docs/latest/patterns/packages/
if getattr(sys, 'frozen', False):
    template_folder = os.path.join(sys._MEIPASS, 'templates')
    app = Flask(__name__, template_folder=template_folder)
else:
    app = Flask(__name__)

from . import views

app.run("0.0.0.0", 8000, debug=True)
