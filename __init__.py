
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import os

from flask import Flask


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
app = Flask(__name__)


from . import views
