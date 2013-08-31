# -*- coding: utf-8 -*-

from flask import Flask, jsonify, request, render_template, abort
from flask.ext.login import LoginManager, login_required

app = Flask(__name__)
app.config.from_pyfile('config.py', silent=True)
app.config['TRAP_BAD_REQUEST_ERRORS'] = True


@app.route('/invite/<string:name>/', methods=['GET', 'POST'])
def index(name):
    if not name:
        abort(400)

    current_url = "http://{host}/invite/{name}/".format(host=request.host, name=name)
    return render_template('index.html', current_url=current_url, guest=str('李强').decode('utf8'))



uwsgi_app = app.wsgi_app