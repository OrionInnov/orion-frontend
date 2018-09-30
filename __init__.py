import os
import sys

from flask import Flask

from .db_iface import load_config
from .db_iface import db_update

# Flask instance webapp
# http://flask.pocoo.org/docs/latest/patterns/packages/
if getattr(sys, "frozen", False):
    template_folder = os.path.join(sys._MEIPASS, "templates")
    app = Flask(__name__, template_folder=template_folder)
else:
    app = Flask(__name__)

from . import views
