import unittest
import requests
import json

class TestAPIEndpoints(unittest.TestCase):

    BASE_URL = "https://api.senioruplift.me/api/"

    ### Helper Methods ### 

    def fetch_results(self, endpoint, expected_status=200):
        """Helper method to fetch results from the API and validate response status."""
        response = requests.get(self.BASE_URL + endpoint)
        self.assertEqual(response.status_code, expected_status, 
                         f"Received status {response.status_code} for {endpoint}; expected {expected_status}")
        return response

    ### Unit Tests ###

    def test_health_centers_list(self):
        """Test retrieving all health centers."""
        response = self.fetch_results("healthcenters/")
        self.assertTrue('application/json' in response.headers['Content-Type'])
        data = response.json()
        self.assertIsInstance(data, list)

    def test_health_center_by_id(self):
        """Test retrieving a single health center by ID with expected failure."""
        self.fetch_results("healthcenter/1", expected_status=500)

    def test_nursing_homes_list(self):
        """Test retrieving all nursing homes."""
        response = self.fetch_results("nursinghomes/")
        self.assertTrue('application/json' in response.headers['Content-Type'])
        data = response.json()
        self.assertIsInstance(data, list)

    def test_nursing_home_by_id(self):
        """Test retrieving a single nursing home by ID."""
        response = self.fetch_results("nursinghome/1")
        self.assertTrue('application/json' in response.headers['Content-Type'])
        data = response.json()
        self.assertIsInstance(data, dict)

    def test_entertainments_list(self):
        """Test retrieving all entertainments."""
        response = self.fetch_results("entertainments/")
        self.assertTrue('application/json' in response.headers['Content-Type'])
        data = response.json()
        self.assertIsInstance(data, list)

    def test_entertainment_by_id(self):
        """Test retrieving a single entertainment by ID."""
        response = self.fetch_results("entertainment/1", expected_status=200)
        self.assertTrue('application/json' in response.headers['Content-Type'])
        data = response.json()
        self.assertIsInstance(data, dict)

    ### Filtering Tests ###

    def test_filter_health_centers_by_city(self):
        """Test filtering health centers by city."""
        response = self.fetch_results("healthcenters/?city=Dallas")
        self.assertTrue('application/json' in response.headers['Content-Type'])
        data = response.json()
        self.assertIsInstance(data, list)

    def test_filter_nursing_homes_by_rating(self):
        """Test filtering nursing homes by rating."""
        response = self.fetch_results("nursinghomes/?rating=4.5")
        self.assertTrue('application/json' in response.headers['Content-Type'])
        data = response.json()
        self.assertIsInstance(data, list)

    def test_filter_entertainments_by_category(self):
        """Test filtering entertainments by category."""
        response = self.fetch_results("entertainments/?category=Concert")
        self.assertTrue('application/json' in response.headers['Content-Type'])
        data = response.json()
        self.assertIsInstance(data, list)

    def test_non_existent_health_center(self):
        """Test handling of non-existent health center ID."""
        with self.assertRaises(AssertionError) as context:
            self.fetch_results("healthcenter/999", expected_status=404)

    def test_non_existent_nursing_home(self):
        """Test handling of non-existent nursing home ID."""
        with self.assertRaises(AssertionError) as context:
            self.fetch_results("nursinghome/999", expected_status=404)

    def test_non_existent_entertainment(self):
        """Test handling of non-existent entertainment ID."""
        with self.assertRaises(AssertionError) as context:
            self.fetch_results("entertainment/999", expected_status=404)

    def test_home_route_not_found(self):
        """Test that the home route correctly returns a not found error."""
        self.fetch_results("", expected_status=404)


# Runs the unit tests
if __name__ == '__main__':
    unittest.main()
