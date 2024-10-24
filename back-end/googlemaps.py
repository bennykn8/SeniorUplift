import requests
import os
from dotenv import load_dotenv
from models import db, NursingHomeModel  # Import the database and model
from sqlalchemy.exc import IntegrityError
from application import app

load_dotenv()

Google_Maps_API = os.getenv('GOOGLE_MAPS_API_KEY')
Google_Custom_Search_API_Key = os.getenv('GOOGLE_IMAGE_API_KEY')
Google_CSE_ID = os.getenv('GOOGLE_CSE_ID')


# TEXAS_CITIES = ["houston", "san-antonio", "dallas", "austin", "fort-worth", "el-paso", "arlington", 
#                       "corpus-christi", "plano", "lubbock", "laredo", "irving", "garland", "frisco", "amarillo", "grand-prairie", 
#                       "mckinney", "brownsville", "killeen", "mcallen", "pasadena", "mesquite-city", "denton", "waco", 
#                       "midland", "carrollton", "abilene"
# ]

TEXAS_CITIES = ["laredo"
]
# Function to get nursing homes in a city
def get_nursing_homes_in_city(city):
    url = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
    params = {
        'query': f'nursing homes in {city}',
        'key': Google_Maps_API,
    }
    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
        results = []

        # Fetch details for each nursing home
        for result in data.get('results', []):
            place_id = result.get('place_id')
            if place_id:
                details = get_place_details(place_id)
                if details:
                    if 'photos' in details and len(details['photos']) > 0:
                        photo_reference = details['photos'][0]['photo_reference']
                        image_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_reference}&key={Google_Maps_API}"
                    else:
                        image_url = get_image_url(details.get('name'))

                    # Store the nursing home in the database
                    new_nursing_home = NursingHomeModel(
                        name=details.get('name'),
                        address=details.get('formatted_address'),
                        rating=details.get('rating'),
                        website=details.get('website'),
                        phone=details.get('formatted_phone_number'),
                        hours=", ".join(details.get('opening_hours', {}).get('weekday_text', [])),  # Convert list to string
                        image_url=image_url
                    )

                    db.session.add(new_nursing_home)  # Add the new entry
                    db.session.commit()  # Commit the changes to the database

                    results.append(new_nursing_home)

        return results
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None

# Function to get place details using Google Maps Place Details API
def get_place_details(place_id):
    url = 'https://maps.googleapis.com/maps/api/place/details/json'
    params = {
        'place_id': place_id,
        'key': Google_Maps_API,
        'fields': 'name,formatted_address,formatted_phone_number,website,opening_hours,rating,photos'
    }
    response = requests.get(url, params=params)

    if response.status_code == 200:
        return response.json().get('result', {})
    else:
        print(f"Error fetching details for place_id {place_id}: {response.status_code} - {response.text}")
        return None

# Function to get image URL using Google Custom Search API
def get_image_url(query):
    url = 'https://www.googleapis.com/customsearch/v1'
    params = {
        'q': query,
        'cx': Google_CSE_ID,
        'key': Google_Custom_Search_API_Key,
        'searchType': 'image',
        'num': 1,
        'fileType': 'jpg|png',
        'imgType': 'photo'
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        search_results = response.json()
        if 'items' in search_results:
            image_url = search_results['items'][0]['link']
            return image_url
    else:
        print(f"Error fetching image: {response.status_code} - {response.text}")
    return None

# Function to store data in the database
def store_in_database(data):
    try:
        nursing_home = NursingHomeModel(
            name=data['name'],
            address=data['address'],
            rating=data['rating'],
            website=data['website'],
            phone=data['phone'],
            hours=data['hours'],
            image_url=data['image_url']
        )

        db.session.add(nursing_home)
        db.session.commit()
        print(f"Stored: {data['name']} in the database.")
    except IntegrityError as e:
        db.session.rollback() 
        print(f"Error storing {data['name']}: {e}")

# Function to get nursing homes from all cities
def get_nursing_homes_from_all_cities():
    for city in TEXAS_CITIES:
        get_nursing_homes_in_city(city)

if __name__ == '__main__':
    with app.app_context() :
        get_nursing_homes_from_all_cities()
