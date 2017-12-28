
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import threading

from flask import Flask


class OrionFlask(Flask):

    def __main__(self, cfg_path, tempdir, *args, **kwargs):

        super(OrionFlask, self).__init__(args, kwargs)

        self._orion_cfg_path = cfg_path
        self._orion_tempdir = tempdir

        self._all_pos = None
        self._pos_lock = threading.Lock()

    def _get_config(self):
        with open(self._orion_cfg_path, "r") as f:
            return json.load(f)

    def _set_config(self, config):
        with open(self._orion_cfg_path, "w") as f:
            json.dump(f, config)

    def _get_all_pos(self):
        self._pos_lock.acquire()
        out = self._all_pos.copy()
        self._pos_lock.release()
        return out

    def _set_all_pos(self, pos):
        self._pos_lock.acquire()
        self._all_pos = pos
        self._pos_lock.release()

    orion_cfg = property(fget=self._get_config, fset=self._set_config)
    all_pos = property(fget=self._get_all_pos, fset=self._set_all_pos)

app = OrionFlask(__name__)


from . import views
