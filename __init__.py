
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

from flask import Flask


class OrionFlask(Flask):

    def __main__(self, cfg_path, *args, **kwargs):

        super(OrionFlask, self).__init__(args, kwargs)

        self._orion_cfg_path = cfg_path

    def _get_orion_config(self):
        with open(self._orion_cfg_path, "r") as f:
            return json.load(f)

    def _set_orion_config(self, config):
        with open(self._orion_cfg_path, "w") as f:
            json.dump(f, config)

    orion_config = property(fget=lambda self: self._get_orion_config,
                            fset=lambda self: self._set_orion_config)

app = OrionFlask(__name__)

from . import views
