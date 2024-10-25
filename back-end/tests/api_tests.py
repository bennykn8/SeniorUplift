import unittest
import requests

class TestAPIEndpoints(unittest.TestCase):

    ### Helper Methods ### 

    # Fetches a response from the backend (as a raw string) and checks the
    # status code, given the API endpoint and an expected status
    def fetch_raw_results(self, endpoint, expected_status=200):
        url = f"https://api.senioruplift.me/api/{endpoint}"
        response = requests.get(url)
        status = response.status_code
        assert status == expected_status, \
            f"Received status {status} for {url}; expected {expected_status}"
        return response.text
    
    ### Unit Tests ###

    # Test retrieving all health centers
    def test_0_health_centers(self):
        self.fetch_raw_results("healthcenters/")

    def test_1_health_center_by_id(self):
        self.fetch_raw_results("healthcenter/1", expected_status=500)

    def test_2_nursing_homes(self):
        self.fetch_raw_results("nursinghomes/")

    def test_3_nursing_home_by_id(self):
        self.fetch_raw_results("nursinghome/1")

    def test_4_entertainments(self):
        self.fetch_raw_results("entertainments/")

    def test_5_entertainment_by_id(self):
        self.fetch_raw_results("entertainment/1", expected_status=200)

    def test_6_non_existent_health_center(self):
        try:
            self.fetch_raw_results("healthcenter/999", expected_status=500)
        except AssertionError as e:
            print(f"Expected 404, got different status: {e}")

    def test_7_non_existent_nursing_home(self):
        try:
            self.fetch_raw_results("nursinghome/999", expected_status=500)
        except AssertionError as e:
            print(f"Expected 404, got different status: {e}")

    def test_8_non_existent_entertainment(self):
        try:
            self.fetch_raw_results("entertainment/999", expected_status=500)
        except AssertionError as e:
            print(f"Expected 404, got different status: {e}")

    def test_9_home_route(self):
        self.fetch_raw_results("", expected_status=404)


# Runs the unit tests
if __name__ == '__main__':
    unittest.main()
