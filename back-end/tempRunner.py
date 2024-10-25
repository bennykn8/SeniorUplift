from flask import Flask 
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort

from sqlalchemy import Integer, String, Column, JSON, Text, ForeignKey, Table
from sqlalchemy.orm import DeclarativeBase, relationship
import json

from models import db, HealthCenterModel, NursingHomeModel, EntertainmentModel
from application import app

if __name__ == '__main__':
    with app.app_context():
        db.session.query(NursingHomeModel).delete()
        db.session.commit()
