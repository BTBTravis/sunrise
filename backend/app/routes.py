from app import app

cors_fix = { 'Access-Control-Allow-Origin': '*' }

@app.route('/', methods=['GET'])
def index():
    return ("hello world", cors_fix)

