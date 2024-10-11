from flask import Flask 
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db' #change this to connect with website database
db = SQLAlchemy(app)
api = Api(app)

#api home endpoint
@app.route('/api/')
def home():
    return '<h1>SeniorUplift API</h1>'


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
    
#validate input
#for post/patch requests, may not need
healthcenter_args = reqparse.RequestParser()
healthcenter_args.add_argument('name', type=str, required=True, help="must have name")
healthcenter_args.add_argument('city', type=str, required=True, help="must have city")
healthcenter_args.add_argument('ratings', type=float, required=True, help="must have rating")
healthcenter_args.add_argument('hours', type=str, required=True, help="must have hours")
healthcenter_args.add_argument('phone', type=str, required=True, help="must have phone")

#used to format json output
hcFields = {
    'id':fields.Integer,
    'name':fields.String,
    'city':fields.String,
    'ratings':fields.Float,
    'hours':fields.String,
    'phone':fields.String,
}

class HealthCenters(Resource):

    #get all health centers
    @marshal_with(hcFields)
    def get(self):
        hcs = HealthCenterModel.query.all()
        return hcs
    
class HealthCenter(Resource):

    #get single health center
    @marshal_with(hcFields)
    def get(self, id):
        hc = HealthCenterModel.query.filter_by(id=id).first()
        if not hc:
            abort(404, "health center not found")
        return hc

        
api.add_resource(HealthCenters, '/api/healthcenters/')
api.add_resource(HealthCenter, '/api/healthcenter/<int:id>')



if __name__ == '__main__':
    app.run(debug=True)