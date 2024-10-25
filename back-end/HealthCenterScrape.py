from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
import time
import pandas as pd

# Function to set up WebDriver and fetch the hospital page
def getDriver():
    # Setting up Selenium with Chrome WebDriver
    chrome_options = Options()

    
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=chrome_options)
    driver.get("https://www.ahd.com/states/hospital_TX.html")
    time.sleep(5) 
    return driver, BeautifulSoup(driver.page_source, 'html.parser')

# Function to scrape hospital data from the webpage
def getData(sp: BeautifulSoup):
    all_rows = sp.find_all('tr')[1:]
    hospitals_data = []

    for row in all_rows:
        name_tag = row.find('a')  
        if name_tag:
            hospital_name = name_tag.get_text(strip=True)
            columns = row.find_all('td')
            address = columns[1].get_text(strip=True) if len(columns) > 1 else 'N/A'
            phone = columns[2].get_text(strip=True) if len(columns) > 2 else 'N/A'
            type_of_facility = columns[3].get_text(strip=True) if len(columns) > 3 else 'N/A'

            hospitals_data.append({
                "Hospital Name": hospital_name,
                "Address": address,
                "Phone": phone,
                "Type of Facility": type_of_facility
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
main()
