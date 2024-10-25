from flask import Flask 
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort

from sqlalchemy import Integer, String, Column, JSON, Text, ForeignKey, Table
from sqlalchemy.orm import DeclarativeBase, relationship
import json

TESTING = False

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://admin:%y9Ep^9i^$@be-db.c9me2cwiud0l.us-east-2.rds.amazonaws.com:3306/senioruplift_db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
api = Api(app)
CORS(app)


class Base(DeclarativeBase):
    pass

HealthCenter_NursingHomes = Table('healthCenter_nursingHomes', db.Model.metadata,
    Column('health_center_model_id', Integer, ForeignKey('health_center_model.id'), primary_key=True),
    Column('nursing_home_model_id', Integer, ForeignKey('nursing_home_model.id'), primary_key=True),
    extend_existing=True
)

HealthCenter_Entertainment = Table('healthCenter_entertainment', db.Model.metadata,
    Column('health_center_model_id', Integer, ForeignKey('health_center_model.id'), primary_key=True),
    Column('entertainment_model_id', Integer, ForeignKey('entertainment_model.id'), primary_key=True),
    extend_existing=True
)

NursingHomes_Entertainment = Table('nursingHomes_entertainment', db.Model.metadata,
    Column('nursing_home_model_id', Integer, ForeignKey('nursing_home_model.id'), primary_key=True),
    Column('entertainment_model_id', Integer, ForeignKey('entertainment_model.id'), primary_key=True),
    extend_existing=True
)   

#describes health center model
class HealthCenterModel (db.Model) :
    __tablename__ = 'health_center_model'

    # id = db.Column(db.Integer, primary_key=True)
    # name = db.Column(db.String(255), unique=True, nullable=False)
    # city = db.Column(db.String(255), unique=True, nullable=False)
    # ratings = db.Column(db.Float)
    # hours = db.Column(db.String(255), unique=True, nullable=False)
    # phone = db.Column(db.String(255), unique=True, nullable=False)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    beds = db.Column(db.Integer, nullable=True)
    discharges = db.Column(db.Integer, nullable=True)
    patient_days = db.Column(db.Integer, nullable=True)
    revenue = db.Column(db.Integer, nullable=True)
    image_url = db.Column(db.String(1024), nullable=True)

    nursinghome = relationship(
        "NursingHomeModel",
        secondary=HealthCenter_NursingHomes,
        lazy="select"
    )
    entertainment = relationship(
        "EntertainmentModel",
        secondary=HealthCenter_Entertainment,
        lazy="select"
    )

    def __repr__ (self):
        return f"Health Center( Name: {self.name}, City: {self.city}, Ratings: {self.ratings}, Hours: {self.hours}, Phone Number: {self.phone})"

#describes nursing home model
class NursingHomeModel(db.Model):
    __tablename__ = 'nursing_home_model'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False) 
    rating = db.Column(db.Float)
    hours = db.Column(db.String(1024), nullable=True)
    phone = db.Column(db.String(255), nullable=True)
    website = db.Column(db.String(1024), nullable=True)
    image_url = db.Column(db.String(1024), nullable=True)

    healthcenter = relationship(
        "HealthCenterModel",
        secondary=HealthCenter_NursingHomes,
        lazy="select"
    )
    entertainment = relationship(
        "EntertainmentModel",
        secondary=NursingHomes_Entertainment,
        lazy="select"
    )
    # entertainment_id = db.Column(db.Integer, db.ForeignKey('entertainment_model.id'))
    # entertainment = relationship("EntertainmentModel", foreign_keys=[entertainment_id], uselist=False)

    def __repr__(self):
        return f"Nursing Home( Name: {self.name}, Address: {self.address}, Rating: {self.rating}, Hours: {self.hours}, Phone: {self.phone}, Website: {self.website}, Image URL: {self.image_url})"


# describes entertainment model
class EntertainmentModel(db.Model):
    __tablename__ = 'entertainment_model'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    cost = db.Column(db.String(255), nullable=True)
    category = db.Column(db.String(255), nullable=True)  
    location = db.Column(db.String(1024), nullable=True) 
    event_time = db.Column(db.String(255), nullable=True) 
    image_url = db.Column(db.String(1024), nullable=True)

    healthcenter = relationship(
        "HealthCenterModel",
        secondary=HealthCenter_Entertainment,
        lazy="select"
    )
    nursinghome = relationship(
        "NursingHomeModel",
        secondary=NursingHomes_Entertainment,
        lazy="select"
    )
    # nursinghome_id = db.Column(db.Integer, db.ForeignKey('nursing_home_model.id'))
    # nursinghome = relationship("NursingHomeModel", foreign_keys=[nursinghome_id], uselist=False)

    def __repr__(self):
        return f"Entertainment( Title: {self.title}, City: {self.city}, Cost: {self.cost}, Category: {self.category}, Location: {self.location}, Time: {self.event_time}, Image URL: {self.image_url})"
