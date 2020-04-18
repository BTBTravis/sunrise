import os
from flask import Flask, session, redirect, url_for, request, render_template, send_from_directory
from markupsafe import escape

from app import app

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        # TODO: replace this xxx with key from .env
        if 'key' in session and session['key'] == 'xxx':
            return send_from_directory(app.static_folder, 'index.html')
        elif 'key' in session:
            return '''
                <h1>incorrect key</h1>
                <a href="/login">login</a>
            '''
        return redirect(url_for('login'))



# @app.route('/')
# def index():
#     # TODO: replace this xxx with key from .env
#     if 'key' in session and session['key'] == 'xxx':
#         return render_template('app.html')
#         # return render_template('app.html', name=name)
#         # return 'You are logged in with the correct key'
#     elif 'key' in session:
#         return '''
#             <h1>Incorrect key</h1>
#             <a href="/login">Return to login</a>
#         '''
#     return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['key'] = escape(request.form['key'])
        return redirect('/')
    return '''
        <form method="post">
            <label>key: </label>
            <input type=text name=key>
            <input type=submit value=login>
        </form>
    '''


@app.route('/logout')
def logout():
    # remove the key from the session
    session.pop('key', None)
    return redirect(url_for('login'))
