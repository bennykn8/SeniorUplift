from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
from dotenv import load_dotenv
import time
import pandas as pd
from google_images_search import GoogleImagesSearch
from pydantic_settings import BaseSettings

# Set up your Google API credentials
class Settings(BaseSettings):
    google_api: str
    google_crx: str

    class Config:
        env_file = '/.env'
load_dotenv()
settings = Settings()

search = GoogleImagesSearch(settings.google_api, settings.google_crx)

# Function to set up WebDriver and fetch the hospital page
def getDriver():
    chrome_options = Options()
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=chrome_options)
    driver.get("https://www.ahd.com/states/hospital_TX.html")
    time.sleep(5) 
    return driver, BeautifulSoup(driver.page_source, 'html.parser')

# Function to search for the hospital image
def getImageURL(hospital_name):
    search.search(search_params={
        'q': hospital_name,
        'fileType': 'jpg|png',
        'imgType': 'photo',
    })
    results = search.results()
    if results:
        return results[0].url
    return None

# Function to scrape hospital data from the webpage
def getData(sp: BeautifulSoup):
    all_rows = sp.find_all('tr')[1:]
    hospitals_data = []

    for row in all_rows:
        name_tag = row.find('a')  
        if name_tag:
            hospital_name = name_tag.get_text(strip=True)
            columns = row.find_all('td')
            beds = columns[1].get_text(strip=True) if len(columns) > 1 else 'N/A'
            discharges = columns[2].get_text(strip=True) if len(columns) > 2 else 'N/A'
            days = columns[3].get_text(strip=True) if len(columns) > 3 else 'N/A'

            # Get the image URL
            image_url = getImageURL(hospital_name)

            hospitals_data.append({
                "Hospital Name": hospital_name,
                "Staffed Beds": beds,
                "Total Discharges": discharges,
                "Patient Days": days,
                "Gross Patient Revenue": image_url
            })
    
    return hospitals_data

# Function to save the data to a CSV file
def saveToCSV(data, filename="hospitals_data.csv"):
    df = pd.DataFrame(data)
    df.to_csv(filename, index=False)
    print(f"Data saved to {filename}")

def main():
    driver, sp = getDriver()  # Get driver and BeautifulSoup object
    hospitals_data = getData(sp)  # Scrape hospital data
    saveToCSV(hospitals_data)  # Save data to CSV
    driver.quit()  # Close the browser

# Run the main function
if __name__ == '__main__':
    main()
