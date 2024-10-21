import requests

# Store your Google Maps API key securely (you can use environment variables or a config file)
API_KEY = 'AIzaSyBiWxv77gAJZQ1Fp5dFujGdDIXiDTUX__8'

# List of cities in Texas
TEXAS_CITIES = [
    "Houston", "Austin", "Dallas", "San Antonio", "El Paso", "Fort Worth", 
    "Arlington", "Corpus Christi", "Plano", "Lubbock", "Laredo", "Irving", 
    "Garland", "Frisco", "Amarillo", "Grand Prairie", "McKinney", "Brownsville", 
    "Killeen", "McAllen", "Pasadena", "Mesquite", "Denton", "Waco", "Midland", 
    "Carrollton", "Abilene"
]

# Function to make a request to the Google Places API (Text Search)
def get_nursing_homes_in_city(city):
    url = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
    
    # Query to search for nursing homes in the given city
    params = {
        'query': f'nursing homes in {city}',
        'key': API_KEY
    }

    # Make a GET request to the Google Places API
    response = requests.get(url, params=params)
    
    # Check if the request was successful
    if response.status_code == 200:
        # Parse the JSON response
        data = response.json()
        return data['results']  # Returns a list of results (nursing homes)
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None

# Function to fetch nursing homes from all cities in the TEXAS_CITIES list
def get_nursing_homes_from_all_cities():
    all_nursing_homes = []
    
    # Loop through all Texas cities and get nursing homes
    for city in TEXAS_CITIES:
        city_homes = get_nursing_homes_in_city(city)
        if city_homes:
            all_nursing_homes.extend(city_homes)  # Combine all nursing homes into one list
    
    return all_nursing_homes
