import os
from functools import wraps
from flask import Flask, session, redirect, url_for, request, render_template, send_from_directory
from markupsafe import escape

from app import app
from . import tplink

user_key = os.environ['USER_SECRET_KEY']


def authed(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if ('key' not in session or session['key'] != user_key):
            return ("no key", 401)        # get user via some ORM system
        return f(*args, **kwargs)
    return wrap

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        if 'key' in session and session['key'] == user_key:
            return send_from_directory(app.static_folder, 'index.html')
        elif 'key' in session:
            return '''
                <h1>incorrect key</h1>
                <a href="/login">login</a>
            '''
        return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['key'] = escape(request.form['key'])
        # if we have correct valid user set tplink token
        if session['key'] == user_key:
            session['tp_token'] = tplink.login(
                escape(request.form['tpuser']),
                escape(request.form['tppw'])
            )
        return redirect('/')
    return '''
        <form method="post">
            <label>key: </label>
            <input type=text name=key>
            <br />
            <label>tplink username: </label>
            <input type=text name=tpuser>
            <br />
            <label>tplink pw: </label>
            <input type=text name=tppw>
            <br />
            <input type=submit value=login>
        </form>
    '''


@app.route('/logout')
def logout():
    # remove the key from the session
    session.pop('key', None)
    return redirect(url_for('login'))


# TODO: add auth decorator
@app.route('/api/v1/devices')
@authed
def devices():
    return {
        'devices': tplink.get_device_list(session['tp_token'])
    }
