from flask import Flask 
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
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

#validate input
#for post/patch requests, may not need
healthcenter_args = reqparse.RequestParser()
healthcenter_args.add_argument('name', type=str, required=True, help="must have name")
healthcenter_args.add_argument('city', type=str, required=True, help="must have city")
healthcenter_args.add_argument('ratings', type=float, required=True, help="must have rating")
healthcenter_args.add_argument('hours', type=str, required=True, help="must have hours")
healthcenter_args.add_argument('phone', type=str, required=True, help="must have phone")

# hcFields = {
#     'id': fields.Integer,
#     'name': fields.String,
#     'city': fields.String,
#     'beds': fields.Integer,
#     'discharges': fields.Integer,
#     'patient_days': fields.Integer,
#     'revenue': fields.Integer,
#     'nursinghome': fields.List(fields.Nested({
#         'id': fields.Integer,
#         'name': fields.String,
#         'address': fields.String,
#     })),
#     'entertainment': fields.List(fields.Nested({
#         'id': fields.Integer,
#         'title': fields.String,
#         'city': fields.String,
#     }))
# }

hcFields = {
    'id': fields.Integer,
    'name': fields.String,
    'city': fields.String,
    'ratings': fields.Float,
    'hours': fields.String,
    'phone': fields.String,
    'nursinghome': fields.List(fields.Nested({
        'id': fields.Integer,
        'name': fields.String,
        'address': fields.String,
    })),
    'entertainment': fields.List(fields.Nested({
        'id': fields.Integer,
        'title': fields.String,
        'city': fields.String,
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
        'city': fields.String,})),
    'entertainment': fields.List(fields.Nested({
        'id': fields.Integer,
        'title': fields.String,
        'city': fields.String,
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
        'city': fields.String,})),
    'nursinghome': fields.List(fields.Nested({
        'id': fields.Integer,
        'name': fields.String,
        'address': fields.String,
    }))
}


class HealthCenters(Resource):

    #get all health centers
    @marshal_with(hcFields)
    def get(self):
        hcs = HealthCenterModel.query.all()
        return hcs
    '''
    #post hc
    @marshal_with(hcFields)
    def post(self):
        args = healthcenter_args.parse_args()
        user = HealthCenterModel(name = args["name"], city = args["city"], ratings = args["ratings"], hours = args["hours"], phone = args["phone"])
        db.session.add(user)
        db.session.commit()
        hcs = HealthCenterModel.query.all()
        return hcs, 201'''
    
class HealthCenter(Resource):

    #get single health center
    @marshal_with(hcFields)
    def get(self, id):
        hc = HealthCenterModel.query.filter_by(id=id).first()
        if not hc:
            abort(404, "health center not found")
        return hc
    '''
    @marshal_with(hcFields)
    def delete(self, id):
        user = HealthCenterModel.query.filter_by(id=id).first()
        if not user:
            abort(404, "user not found")
        db.session.delete(user)
        db.session.commit()
        users = HealthCenterModel.query.all()
        return users'''
    
class NursingHomes(Resource):

    #get all health centers
    @marshal_with(nhFields)
    def get(self):
        nhs = NursingHomeModel.query.all()
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
        entertains = EntertainmentModel.query.all()
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