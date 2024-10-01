# SeniorUplift
**Website Link:** https://senioruplift.me   
**API Link:**  
**Postman API Documentation:** https://documenter.getpostman.com/view/32954458/2sA2r6WPJG  


### Canvas / Slack group number: 
* group-08

### names of the team members: 
* Rikhil Kalidindi, Will Kung, Benny Nguyen, Rohan Aggarwal, Pranav Akkaraju

### name of the project (alphanumeric, no spaces, max 32 chars; this will also be your URL):
* senior

### the proposed project:
* Welfare support for the elderly population in Texas that includes nearest healthcare centers, nursing homes, and nearby entertainment

### URLs of at least three data sources that you will programmatically scrape (at least one must be a RESTful API) (be very sure about this):
1. Health Centers: https://data.medicare.gov/developers (Restful API)
2. Nursing Homes: https://caretexas.net/list01_Texas_nursing_homes.htm 
3. Entertainment: https://www.traveltexas.com/


### at least three models:
* Nearest healthcare centers
* Nursing Homes
* Entertainment

### an estimate of the number of instances of each model:
* Nearest healthcare centers: 300+
* Nursing Homes: 300+
* Entertainment: 400+

### each model must have many attributes:

### Nearest Health Centers:
* Name, City, Specializations (type of medicine), Address, Website, Phone Number, Hours, Ratings

### Nursing Homes: 
* Name, City, Address, Website, Phone Number, Hours, Ratings

### Entertaiment: 
* Name, City, Cost, Address, Website, Phone Number, Hours, Ratings

### Describe five of those attributes for each model that you can filter or sort:
* City, Ratings, Name, Hours, Proximity

### Instances of each model must connect to instances of at least two other models:
* All models are connected to each other through proximity.

### Instances of each model must be rich with different media (e.g., feeds, images, maps, text, videos, etc.) (be very sure about this)
### Describe two types of media for instances of each model:
* Nearest Health Centers:
    Images, maps, text, keywords (surgery, PT, dental, etc.)

* Nursing Homes: 
    Images, Maps, Google Maps Ratings

* Entertainment: 
    Images, Videos, Maps


### Describe three questions that your site will answer:
1. Where is the nearest healthcare provider for me?
2. Where can I find nursing homes located in my area?
3. Where can the elderly go for entertainment near them?