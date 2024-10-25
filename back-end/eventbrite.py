from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
import csv
from models import EntertainmentModel, db, app

# Function to setup the web driver and fetch content from the given URL
def launch_driver_and_get_page(url):
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    driver = webdriver.Chrome(options=options)
    driver.get(url)
    
    page_html = driver.page_source
    soup_content = BeautifulSoup(page_html, 'html.parser')
    
    return soup_content, driver

# Function to extract details for each event from the parsed page
def get_event_info(soup):
    event_blocks = soup.find_all("li")
    event_data = []
    
    for block in event_blocks:
        event_link = block.find('a', class_='event-card-link')
        if event_link and event_link.get('aria-label') and event_link.get('data-event-category'):
            details = block.find_all('p', class_='Typography_root__487rx')
            image = block.find('img', class_='event-card-image')
            event_title = block.find('h3', class_='Typography_root__487rx')
            
            event_details = (
                event_title.get_text() if event_title else 'No Title Provided',
                event_link.get('data-event-location', 'Location Missing'),
                event_link.get('data-event-paid-status', 'Payment Info Missing'),
                event_link.get('data-event-category', 'Category Unknown'),
                details[1].get_text() if len(details) > 0 else 'Venue Not Available',
                details[0].get_text() if len(details) > 1 else 'Time Not Available',
                image['src'] if image else 'No Image URL'
            )
            event_data.append(event_details)
    
    return event_data

# Function to write the extracted data into a CSV file
def save_data_to_csv(data, filename='events_data.csv'):
    columns = ['Title', 'City/State', 'Paid/Free', 'Category', 'Venue', 'Event Time', 'Image URL']
    
    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(columns) 
        writer.writerows(data)

# Function to read CSV data and insert it into the database
def transfer_csv_to_db(filename='events_data.csv'):
    with open(filename, mode='r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)
        
        for row in csv_reader:
            new_event = EntertainmentModel(
                title=row['Title'],
                city=row['City/State'],
                cost=row['Paid/Free'],
                category=row['Category'],
                location=row['Venue'],
                event_time=row['Event Time'],
                image_url=row['Image URL']
            )
            
            db.session.add(new_event)
        db.session.commit()

# Function to loop through a list of cities, scrape data, and save to CSV + DB
def scrape_event_for_cities():
    texas_cities = ['abilene', 'amarillo', 'arlington', 'austin', 'brownsville', 'carrollton', 
                    'corpus-christi', 'dallas', 'denton', 'el-paso', 'fort-worth', 'frisco', 
                    'garland', 'grand-prairie', 'houston', 'irving', 'killeen', 'laredo', 
                    'lubbock', 'mcallen', 'mckinney', 'mesquite-city', 'midland', 'pasadena', 
                    'plano', 'san-antonio', 'waco']
    
    url_prefix = "https://www.eventbrite.com/d/tx--"
    url_suffix = "/senior-events/"
    
    all_event_list = []
    
    for city in texas_cities:
        full_url = f"{url_prefix}{city}{url_suffix}"
        soup, driver = launch_driver_and_get_page(full_url)
        events = get_event_info(soup)
        all_event_list.extend(events)
        driver.quit()

    # Save the scraped data to CSV
    save_data_to_csv(all_event_list)

    # Transfer the data from CSV to the database
    with app.app_context():
        transfer_csv_to_db()

if __name__ == "__main__":
    # scrape_event_for_cities()
    with app.app_context():
        # Transfer CSV data to the database without scraping again
        transfer_csv_to_db('events_data.csv')  # Make sure the path to the CSV file is correct
