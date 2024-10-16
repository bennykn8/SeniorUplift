from flask import Flask

flaskApp = Flask(__name__)

@flaskApp.route("/")
def home():
    return "Hello I Am Here!"

@flaskApp.route("/whois/<name>")
def whois(name):
    return "Hello, " + name + ", that is your name!"

if __name__ == "__main__":
    flaskApp.run(port=5000, debug=True);