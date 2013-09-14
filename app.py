# -*- coding: utf-8 -*-

from flask import Flask, jsonify, request, render_template, abort, redirect
from flask.ext.login import LoginManager, login_required

from models import init_db, Guest

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:kun77416@127.0.0.1:3306/ei"
app.config['TRAP_BAD_REQUEST_ERRORS'] = True
init_db(app)

app.config.from_pyfile('config.py', silent=True)

@app.route('/invite/<string:domain>/', methods=['GET', 'POST'])
def index(domain):
    if not domain:
        abort(400)

    current_url = "http://{host}/invite/{domain}/".format(host=request.host, domain=domain)
    guest = Guest.query.filter_by(domain=domain).first()

    if not guest:
        return "没有找到这个叫{domain}的人".format(domain = domain)

    guest.scan = 1
    guest.commit()
    return render_template('index.html', current_url=current_url, guest=guest, host=request.host)



@app.route('/manage/', methods=['GET', 'POST'])
def manager():
    guests = Guest.query.all()
    return render_template('manage.html', guests=guests, host=request.host)

@app.route('/guest/add/', methods=['GET', 'POST'])
def add():
    name = request.form.get('name')
    domain = request.form.get('domain')

    
    guest = Guest(name, domain, request.remote_addr)
    guest.commit()
    return redirect('/manage/')
    
    
uwsgi_app = app.wsgi_app
