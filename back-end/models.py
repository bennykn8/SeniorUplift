from flask import Flask 
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://admin:%y9Ep^9i^$@backend-db.c9me2cwiud0l.us-east-2.rds.amazonaws.com:3306"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
api = Api(app)
CORS(app)

#describes health center model
class HealthCenterModel (db.Model) :
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    city = db.Column(db.String(255), unique=True, nullable=False)
    ratings = db.Column(db.Float)
    hours = db.Column(db.String(255), unique=True, nullable=False)
    phone = db.Column(db.String(255), unique=True, nullable=False)

    def __repr__ (self):
        return f"Health Center( Name: {self.name}, City: {self.city}, Ratings: {self.ratings}, Hours: {self.hours}, Phone Number: {self.phone})"

#describes nursing home model
class NursingHomeModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False) 
    rating = db.Column(db.Float)
    hours = db.Column(db.String(1024), nullable=True)
    phone = db.Column(db.String(255), nullable=True)
    website = db.Column(db.String(1024), nullable=True)
    image_url = db.Column(db.String(1024), nullable=True)

    def __repr__(self):
        return f"Nursing Home( Name: {self.name}, Address: {self.address}, Rating: {self.rating}, Hours: {self.hours}, Phone: {self.phone}, Website: {self.website}, Image URL: {self.image_url})"


#describes entertainment model
class EntertainmentModel (db.Model) :
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    city = db.Column(db.String(255), unique=True, nullable=False)
    ratings = db.Column(db.Float)
    hours = db.Column(db.String(255), unique=True, nullable=False)
    phone = db.Column(db.String(255), unique=True, nullable=False)

    def __repr__ (self):
        return f"Entertainment( Name: {self.name}, City: {self.city}, Ratings: {self.ratings}, Hours: {self.hours}, Phone Number: {self.phone})"