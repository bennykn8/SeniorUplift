import csv
from google_images_search import GoogleImagesSearch
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import time
import os

# Pydantic Settings to load API credentials
class Settings(BaseSettings):
    google_api: str
    google_crx: str

    class Config:
        env_file = '.env'

# Initialize Google Images Search
load_dotenv()
print(os.environ.get('GOOGLE_API'))  # Should print your Google API key
print(os.environ.get('GOOGLE_CRX')) # Should print your Google Custom Search Engine ID
settings = Settings()
search = GoogleImagesSearch(settings.google_api, settings.google_crx)

def getImageURL(hospital_name):
    time.sleep(1)
    search.search(search_params={
    'q': f'"{hospital_name}" Hospital',  # Added "Hospital" to the query
    'fileType': 'jpg|png',
    'imgType': 'photo',
    })
    print(hospital_name)

    results = search.results()
    for x in results:
        print(x.url)
        return x.url

def append_image_urls_to_csv(input_file, output_file):
    with open(input_file, mode='r', encoding='utf-8') as infile, \
         open(output_file, mode='w', newline='', encoding='utf-8') as outfile:

        reader = csv.reader(infile)
        writer = csv.writer(outfile)

        # Write header for the output CSV
        headers = next(reader)  # Read the original headers
        headers.append('Image URL')  # Add new header for the image URL
        writer.writerow(headers)

        for row in reader:
            hospital_name = row[0]  # Get the hospital name (index 0)
            image_url = getImageURL(hospital_name)  # Get image URL
            row.append(image_url)  # Append the image URL to the row
            writer.writerow(row)  # Write the updated row to the new CSV
            time.sleep(2)  # Sleep to avoid rate limits

if __name__ == '__main__':
    append_image_urls_to_csv('hospitals_data.csv', 'hospitals_data_with_images.csv')
