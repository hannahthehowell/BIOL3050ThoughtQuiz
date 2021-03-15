import os

from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, redirect
app = Flask(__name__, static_url_path="/")

from postgres import Postgres
db = Postgres(url=os.environ["DATABASE_URL"])

#db.run("create table if not exists scores (id serial, user_key bigint, age int, day int, time varchar(5), num_math int, num_grid int, "
#       "num_wa int, trial int)")

@app.route('/')
def index():
    return redirect('/index.html', 302)

@app.route('/userScores', methods=["POST"])
def hello_world():
    json = request.get_json()
    print(json)
    db.run('INSERT INTO scores (user_key, age, day, time, num_math, num_grid, num_wa, trial) VALUES (%(user_key)s, %(age)s, %(day)s, '
           '%(time)s, %(num_math)s, %(num_grid)s, %(num_wa)s, %(trial)s)', json)
    return 'Message received!'

if __name__ == '__main__':
    app.run(port=os.environ["PORT"])