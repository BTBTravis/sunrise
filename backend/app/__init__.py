import os
from flask import Flask

app = Flask(__name__, static_folder='react_app')
app.run(debug=True, use_reloader=True)


app_secret_key = os.environ['APP_SECRET_KEY']
app.secret_key = bytes(app_secret_key, 'utf-8')

from app import routes
