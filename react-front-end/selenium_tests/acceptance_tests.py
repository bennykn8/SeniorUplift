from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium import webdriver
import unittest
import time


url = "https://senioruplift.me/"
class frontend_acceptance_tests(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome() 
        self.driver.get(url)
    
    def tearDown(self):
        self.driver.quit()

    def test_0(self) -> None:
        self.driver.get(url)
        button = self.driver.find_element(By.LINK_TEXT, 'About')
        button.click()
        self.assertEqual(self.driver.current_url, url + "about")

    def test_1(self) -> None:
        self.driver.get(url)
        button = self.driver.find_element(By.LINK_TEXT, 'Healthcare')
        button.click()
        self.assertEqual(self.driver.current_url, url + "healthcare")

    def test_2(self) -> None:
        self.driver.get(url)
        button = self.driver.find_element(By.LINK_TEXT, 'Nursing Homes')
        button.click()
        self.assertEqual(self.driver.current_url, url + "nursing-homes")

    def test_3(self) -> None:
        self.driver.get(url)
        button = self.driver.find_element(By.LINK_TEXT, 'Entertainment')
        button.click()
        self.assertEqual(self.driver.current_url, url + "entertainment")
    
    def test_4(self) -> None:
        self.driver.get(url)
        button = self.driver.find_element(By.LINK_TEXT, 'SeniorUpLift')
        button.click()
        self.assertEqual(self.driver.current_url, url)

    def test_5(self):
        self.driver.get(url)
        time.sleep(3)
        text = self.driver.find_element(By.XPATH, "//a[contains(text(), 'Learn More')]")
        self.assertEqual(text.text, "LEARN MORE")

    def test_6(self):
        self.driver.get(url + "about")
        time.sleep(3)
        text = self.driver.find_element(By.XPATH, "//h2[contains(text(), 'Project Stats')]")
        self.assertEqual(text.text, "Project Stats")

    def test_7(self):        
        self.driver.get(url)  # Load the front page
        time.sleep(3)  # Wait for the page to load
        hero_title = self.driver.find_element(By.XPATH, "//h1[contains(text(), 'Welcome to SeniorUpLift')]")
        hero_description = self.driver.find_element(By.XPATH, "//p[contains(text(), 'Helping the elderly in Texas find nearby healthcare centers')]")
        self.assertEqual(hero_title.text, "Welcome to SeniorUpLift")
        self.assertEqual(hero_description.text, "Helping the elderly in Texas find nearby healthcare centers, nursing homes, and entertainment options with ratings and proximity for easy access to services.") 

    
    def test_8(self):
        self.driver.get(url) 
        time.sleep(3)
        carousel = self.driver.find_element(By.CLASS_NAME, "carousel")
        self.assertTrue(carousel.is_displayed(), "Carousel is not displayed on the page")
        images = [
            "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?cs=srgb&dl=pexels-olly-3768131.jpg&fm=jpg"
        ]
        image_element = self.driver.find_element(By.XPATH, f"//img[@src='{images[0]}']")
        self.assertTrue(image_element.is_displayed(), f"Carousel image {images[0]} is not displayed")


    def test_9(self):
        self.driver.get(url)
        time.sleep(3)
        healthcare_section = self.driver.find_element(By.XPATH, "//h3[contains(text(), 'Healthcare Centers')]")
        self.assertIsNotNone(healthcare_section, "Healthcare Centers section not found")
        nursing_homes_section = self.driver.find_element(By.XPATH, "//h3[contains(text(), 'Nursing Homes')]")
        self.assertIsNotNone(nursing_homes_section, "Nursing Homes section not found")
        entertainment_section = self.driver.find_element(By.XPATH, "//h3[contains(text(), 'Entertainment')]")
        self.assertIsNotNone(entertainment_section, "Entertainment section not found")
        self.assertEqual(healthcare_section.text, "Healthcare Centers", "Healthcare Centers text does not match")
        self.assertEqual(nursing_homes_section.text, "Nursing Homes", "Nursing Homes text does not match")
        self.assertEqual(entertainment_section.text, "Entertainment", "Entertainment text does not match")


if __name__ == "__main__":
    unittest.main()
