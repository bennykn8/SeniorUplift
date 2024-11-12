from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc, or_
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
from models import HealthCenterModel, NursingHomeModel, EntertainmentModel 
from models import api, db, app


#api home endpoint
@app.route('/')
def home():
    return '<h1>SeniorUplift API</h1>'

@app.route('/tables')
def get_table_names():
    inspector = db.inspect(db.engine)
    tables = inspector.get_table_names()
    return {'tables':tables}, 200

hcFields = {
    'id': fields.Integer,
    'name': fields.String,
    'city': fields.String,
    'beds': fields.Integer,
    'discharges': fields.Integer,
    'patient_days': fields.Integer,
    'revenue': fields.Integer,
    'image_url': fields.String,
    'nursinghome': fields.List(fields.Nested({
        'id': fields.Integer,
        'name': fields.String,
        'address': fields.String,
        'ratings': fields.Float,
        'hours': fields.String,
        'phone': fields.String,
        'website': fields.String,
        'image_url': fields.String,
    })),
    'entertainment': fields.List(fields.Nested({
        'id': fields.Integer,
        'title': fields.String,
        'city': fields.String,
        'cost': fields.String,
        'category': fields.String,
        'location': fields.String,
        'event_time': fields.String,
        'image_url': fields.String,
    }))
}

nhFields = {
    'id': fields.Integer,
    'name': fields.String,
    'address': fields.String,
    'ratings': fields.Float,
    'hours': fields.String,
    'phone': fields.String,
    'website': fields.String,
    'image_url': fields.String,
    'healthcenter': fields.List(fields.Nested({
        'id': fields.Integer,
        'name': fields.String,
        'city': fields.String,
        'beds': fields.Integer,
        'discharges': fields.Integer,
        'patient_days': fields.Integer,
        'revenue': fields.Integer,
        'image_url': fields.String,
    })),
    'entertainment': fields.List(fields.Nested({
        'id': fields.Integer,
        'title': fields.String,
        'city': fields.String,
        'cost': fields.String,
        'category': fields.String,
        'location': fields.String,
        'event_time': fields.String,
        'image_url': fields.String,
    }))
}

entFields = {
    'id': fields.Integer,
    'title': fields.String,
    'city': fields.String,
    'cost': fields.String,
    'category': fields.String,
    'location': fields.String,
    'event_time': fields.String,
    'image_url': fields.String,
    'healthcenter': fields.List(fields.Nested({
        'id': fields.Integer,
        'name': fields.String,
        'city': fields.String,
        'discharges': fields.Integer,
        'patient_days': fields.Integer,
        'revenue': fields.Integer,
        'image_url': fields.String,
    })),
    'nursinghome': fields.List(fields.Nested({
        'id': fields.Integer,
        'name': fields.String,
        'address': fields.String,
        'ratings': fields.Float,
        'hours': fields.String,
        'phone': fields.String,
        'website': fields.String,
        'image_url': fields.String,
    }))
}


class HealthCenters(Resource):

    #get all health centers
    @marshal_with(hcFields)
    def get(self):
        #attribute to sort by
        sort = request.args.get("sort", "id") #ex: /api/healthcenters/?sort=beds
        #sort by ascending or decsending order
        descend = request.args.get("descend", "no") #ex: /api/healthcenters/?sort=beds&descend=yes
        #search by keyword
        search = request.args.get("search", "") #ex: /api/healthcenters/?search=clinic

        query = HealthCenterModel.query

        #sort
        if descend == "yes" :
            query = query.order_by(desc(getattr(HealthCenterModel, sort, 'id')))
        else :
            query = query.order_by(getattr(HealthCenterModel, sort, 'id'))

        #search
        if search :
            query = query.filter(or_(HealthCenterModel.name.like(f"%{search}%"),
                             HealthCenterModel.city.like(f"%{search}%"),
                             HealthCenterModel.beds.like(f"%{search}%"),
                             HealthCenterModel.discharges.like(f"%{search}%"),
                             HealthCenterModel.patient_days.like(f"%{search}%"),
                             HealthCenterModel.revenue.like(f"%{search}%") 
                             ))

        hcs = query.all()
        return hcs
    
    
class HealthCenter(Resource):

    #get single health center
    @marshal_with(hcFields)
    def get(self, id):
        hc = HealthCenterModel.query.filter_by(id=id).first()
        if not hc:
            abort(404, "health center not found")
        return hc
    
    
class NursingHomes(Resource):

    #get all health centers
    @marshal_with(nhFields)
    def get(self):
        #attribute to sort by
        sort = request.args.get("sort", "id")
        #sort by ascending or decsending order
        descend = request.args.get("descend", "no")
        #search by keyword
        search = request.args.get("search", "")

        query = NursingHomeModel.query

        #sort
        if descend == "yes" :
            query = query.order_by(desc(getattr(NursingHomeModel, sort, 'id')))
        else :
            query = query.order_by(getattr(NursingHomeModel, sort, 'id'))

        #search
        if search :
            query = query.filter(or_(NursingHomeModel.name.like(f"%{search}%"),
                             NursingHomeModel.address.like(f"%{search}%"),
                             NursingHomeModel.rating.like(f"%{search}%"),
                             NursingHomeModel.hours.like(f"%{search}%"),
                             NursingHomeModel.phone.like(f"%{search}%"),
                             NursingHomeModel.website.like(f"%{search}%") 
                             ))

        nhs = query.all()
        return nhs
    
class NursingHome(Resource):

    #get single health center
    @marshal_with(nhFields)
    def get(self, id):
        nh = NursingHomeModel.query.filter_by(id=id).first()
        if not nh:
            abort(404, "nursing home not found")
        return nh
    
class Entertainments(Resource):
    # Get all entertainment centers
    @marshal_with(entFields)
    def get(self):
        #attribute to sort by
        sort = request.args.get("sort", "id")
        #sort by ascending or decsending order
        descend = request.args.get("descend", "no")
        #search by keyword
        search = request.args.get("search", "")

        query = EntertainmentModel.query

        #sort
        if descend == "yes" :
            query = query.order_by(desc(getattr(EntertainmentModel, sort, 'id')))
        else :
            query = query.order_by(getattr(EntertainmentModel, sort, 'id'))

        #search
        if search :
            query = query.filter(or_(EntertainmentModel.title.like(f"%{search}%"),
                             EntertainmentModel.city.like(f"%{search}%"),
                             EntertainmentModel.cost.like(f"%{search}%"),
                             EntertainmentModel.category.like(f"%{search}%"),
                             EntertainmentModel.location.like(f"%{search}%"),
                             EntertainmentModel.event_time.like(f"%{search}%") 
                             ))

        entertains = query.all()
        return entertains

class Entertainment(Resource):
    # Get single entertainment center by ID
    @marshal_with(entFields)
    def get(self, id):
        entertain = EntertainmentModel.query.filter_by(id=id).first()
        if not entertain:
            abort(404, "entertainment center not found")
        return entertain
    
        
api.add_resource(HealthCenters, '/api/healthcenters/')
api.add_resource(HealthCenter, '/api/healthcenter/<int:id>')
api.add_resource(NursingHomes, '/api/nursinghomes/')
api.add_resource(NursingHome, '/api/nursinghome/<int:id>')
api.add_resource(Entertainments, '/api/entertainments/')
api.add_resource(Entertainment, '/api/entertainment/<int:id>')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)