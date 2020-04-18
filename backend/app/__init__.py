from flask import Flask

app = Flask(__name__)

# TODO: get this secret key from .env
app_secret_key = 'XXXXXXXXXXX'
app.secret_key = bytes(app_secret_key, 'utf-8')

from app import routes
