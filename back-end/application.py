from flask import Flask 
from flask_cors import CORS  # Import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
from googlemaps import get_nursing_homes_from_all_cities


app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db' #change this to connect with website database
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://admin:%y9Ep^9i^$@backend-db.c9me2cwiud0l.us-east-2.rds.amazonaws.com:3306"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
api = Api(app)
CORS(app)


#api home endpoint
@app.route('/api/')
def home():
    return '<h1>SeniorUplift API</h1>'

@app.route('/api/nursinghomes/google', methods=['GET'])
def fetch_nursing_homes_google():
    try:
        nursing_homes = get_nursing_homes_from_all_cities() 
        if nursing_homes:
            return {'nursing_homes': nursing_homes}, 200  
        else:
            return {'message': 'No nursing homes found'}, 404
    except Exception as e:
        print(f"Error occurred: {e}")
        return {'message': 'An error occurred while fetching data'}, 500


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
    @marshal_with(hcFields)
    def get(self):
        nhs = NursingHomeModel.query.all()
        return nhs
    
class NursingHome(Resource):

    #get single health center
    @marshal_with(hcFields)
    def get(self, id):
        nh = NursingHomeModel.query.filter_by(id=id).first()
        if not nh:
            abort(404, "nursing home not found")
        return nh
    
class Entertainments(Resource):

    #get all health centers
    @marshal_with(hcFields)
    def get(self):
        entertains = EntertainmentModel.query.all()
        return entertains
    
class Entertainment(Resource):

    #get single health center
    @marshal_with(hcFields)
    def get(self, id):
        entertain = EntertainmentModel.query.filter_by(id=id).first()
        if not entertain:
            abort(404, "entertainment center not found")
        return entertain
    
        
api.add_resource(HealthCenters, '/api/healthcenters/')
api.add_resource(HealthCenter, '/api/healthcenter/<int:id>')
api.add_resource(NursingHomes, '/api/nursinghomes/')
api.add_resource(NursingHome, '/api/nursinghome/<int:id>')
api.add_resource(Entertainments, '/api/entertaiments/')
api.add_resource(Entertainment, '/api/entertainment/<int:id>')



if __name__ == '__main__':
    app.run(debug=True)