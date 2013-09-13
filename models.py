# -*- coding: utf-8 -*-

from datetime import datetime

from flask.ext.sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    db.init_app(app)
    return app

class Guest(db.Model):
    __tablename__ = "guest"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50), unique = True)
    review = db.Column(db.String(225), default = '')
    feast = db.Column(db.Integer, default = 0)
    scan = db.Column(db.Integer, default = 0)
    domain = db.Column(db.String(20))
    scan_time = db.Column(db.DateTime, default = datetime.now())
    ip = db.Column(db.String(30), default = '')

    def __init__(self, name, domain, ip):
        self.name = name
        self.domain = domain
        self.ip = ip

    def commit(self):
        db.session.add(self)
        db.session.commit()
    
    