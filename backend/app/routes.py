from flask import Flask, session, redirect, url_for, request
from markupsafe import escape

from app import app

@app.route('/')
def index():
    # TODO: replace this xxx with key from .env
    if 'key' in session and session['key'] == 'xxx':
        return 'You are logged in with the correct key'
    elif 'key' in session:
        return '''
            <h1>Incorrect key</h1>
            <a href="/login">Return to login</a>
        '''
    return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['key'] = escape(request.form['key'])
        return redirect(url_for('index'))
    return '''
        <form method="post">
            <p><input type=text name=key>
            <p><input type=submit value=Login>
        </form>
    '''


@app.route('/logout')
def logout():
    # remove the key from the session
    session.pop('key', None)
    return redirect(url_for('index'))
