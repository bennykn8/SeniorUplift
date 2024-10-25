from flask import Flask 
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort

from sqlalchemy import Integer, String, Column, JSON, Text, ForeignKey, Table, text
from sqlalchemy.orm import DeclarativeBase, relationship
import json

from models import db, HealthCenterModel, NursingHomeModel, EntertainmentModel
from application import app

def addRelation():
    # Step 1: Query all Entertainment instances
    entertainments = db.session.query(EntertainmentModel).all()

    # Step 2: Loop through each Entertainment instance
    for entertainment in entertainments:
        # Step 3: Query NursingHome instances where address contains the entertainment's city
        nursing_home = db.session.query(NursingHomeModel).filter(
            NursingHomeModel.address.like(f"%{entertainment.city}%")
        ).first()

        # Step 4: Associate NursingHome instance with the Entertainment model if found
        if nursing_home:
            entertainment.nursinghome.append(nursing_home)  # Ensure nursing_home is not None

    # Step 5: Commit the changes
    try:
        db.session.commit()
        print("Associations added successfully.")
    except Exception as e:
        db.session.rollback()  # Rollback in case of an error
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    with app.app_context():
        addRelation()
        #db.session.query(NursingHomeModel).delete()
        #db.session.execute(text('SET FOREIGN_KEY_CHECKS = 0;'))
        #db.session.execute(text('TRUNCATE TABLE nursing_home_model;')) 
        #db.session.execute(text('SET FOREIGN_KEY_CHECKS = 1;'))
        #db.session.commit()
