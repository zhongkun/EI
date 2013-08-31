#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from subprocess import Popen, PIPE

DEFAULT_CONFIG = {
        'db': 'ei',
        'user': 'root',
        'password': '',
        'host': '127.0.0.1',
        'port': 3306,
}

try:
    from config import MYSQL_CONFIG
    config = MYSQL_CONFIG
except ImportError:
    config = DEFAULT_CONFIG


if __name__ == '__main__':
    db = config['db']
    user = config['user']
    passwd = config['password']
    filename = 'database/schema.sql'

    process = Popen('mysql %s -u%s -p%s' % (db, user, passwd), stdout=PIPE, stdin=PIPE, shell=True)
    if not passwd:
        print 'No password found in your configuration file, please enter manully!'
    output = process.communicate('source ' + filename)[0]
