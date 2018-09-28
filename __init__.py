import os
import sys

from flask import Flask

from .config import change_pos
from .config import load_config
from .config import save_history

# Flask instance webapp
# http://flask.pocoo.org/docs/latest/patterns/packages/
if getattr(sys, "frozen", False):
    template_folder = os.path.join(sys._MEIPASS, "templates")
    app = Flask(__name__, template_folder=template_folder)
else:
    app = Flask(__name__)

from . import views
