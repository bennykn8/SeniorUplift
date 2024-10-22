import requests

API_KEY = 'AIzaSyBiWxv77gAJZQ1Fp5dFujGdDIXiDTUX__8'  


TEXAS_CITIES = ["Houston", "Austin"]


def get_nursing_homes_in_city(city):
    url = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
    params = {
        'query': f'nursing homes in {city}',
        'key': API_KEY,
    }
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        data = response.json()
        results = []
        
        for result in data.get('results', []):
            place_id = result.get('place_id')
            if place_id:
                details = get_place_details(place_id)
                if details:
                    result_data = {
                        'name': details.get('name'),
                        'address': details.get('formatted_address'),
                        'rating': details.get('rating'),
                        'website': details.get('website'),
                        'phone': details.get('formatted_phone_number'),
                        'hours': details.get('opening_hours', {}).get('weekday_text', [])
                    }
                    results.append(result_data)
        return results
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None

def get_place_details(place_id):
    url = 'https://maps.googleapis.com/maps/api/place/details/json'
    params = {
        'place_id': place_id,
        'key': API_KEY,
        'fields': 'name,formatted_address,formatted_phone_number,website,opening_hours,rating'
    }
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        return response.json().get('result', {})
    else:
        print(f"Error fetching details for place_id {place_id}: {response.status_code} - {response.text}")
        return None

def get_nursing_homes_from_all_cities():
    all_nursing_homes = []
    
    for city in TEXAS_CITIES:
        city_homes = get_nursing_homes_in_city(city)
        if city_homes:
            all_nursing_homes.extend(city_homes)  
    
    return all_nursing_homes
