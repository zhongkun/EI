# coding: utf-8

import time
import os
from os.path import join
import signal
import threading

from config import HOST, PORT

bind = '%s:%s' % (HOST, PORT)
debug = True
loglevel = 'debug'
errorlog = '-'
accesslog = '-'

class Reloader(threading.Thread):
    ''' Auto reloader for auto-reloading gunicorn workers when .py file modified '''

    def __init__(self, server):
        self.server = server
        threading.Thread.__init__(self)
        self.setDaemon(True)

    def run(self):
        monitor_dir = os.path.dirname(os.path.abspath(__file__))
        modify_times = gen_files(monitor_dir)

        while os.getpid() == self.server.pid:
            new_modify_times = gen_files(monitor_dir)
            diff = set(new_modify_times.items()).symmetric_difference(modify_times.items())
            if diff:
                print '%s modified' %  ', '.join(set(f for f, t in diff))
                os.kill(self.server.pid, signal.SIGHUP)

            modify_times = new_modify_times
            time.sleep(2)

def gen_files(monitor_dir):
    modify_times = {}

    for root, dirs, files in os.walk(os.path.abspath(monitor_dir)):
        for _file in (join(root, name) for name in files):
            if _file.rsplit('/', 1)[-1].startswith('.#'):
                continue
            # ignore dotfiles
            if _file.startswith('.'):
                continue
            if _file.endswith('.py'):
                modify_times[_file] = os.stat(_file).st_mtime

    return modify_times

def when_ready(server):
    Reloader(server).start()
