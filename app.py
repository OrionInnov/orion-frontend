"""
app.py: Entry point for orion-frontend.
"""

from flask import Flask, render_template, send_from_directory


app = Flask(__name__)

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


if __name__ == "__main__":

    app.run("0.0.0.0", 8000)
