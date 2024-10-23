import unittest
import requests
import ast

class TestAPIEndpoints(unittest.TestCase):

    ### Helper Methods ###

    # Fetches a response from the backend (as a raw string) and checks the
    # status code, given the API endpoint and an expected status
    def fetch_raw_results (self, endpoint, expected_status=200):
        url = f"https://cs373-backend.senioruplift.me/{endpoint}"
        response = requests.get(url)
        status = response.status_code
        assert status == expected_status, \
            f"Received status {status} for {url}; expected {expected_status}"
        return response.text
    

    ### Unit Tests ###

    # Tests retrieving data for all hospitals
    def test_get_hospitals (self):
        self.fetch_raw_results("hospitals/")


# Runs the unit tests
if __name__ == '__main__':
    unittest.main()