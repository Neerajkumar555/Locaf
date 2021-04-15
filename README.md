# Locaf #
### Looking for a productive location? Locaf no further! ###
This is a school project developed for COMP1800 at BCIT by:
- Neeraj Kumar
- Richard Mac
- Parsa Boojari
- Oscar La

The purpose of this project was to build a search-engine application that helps to curate results and find users a location to study and/or work that best suits their preferences.

* [Motivation](#motivation)
* [Technologies](#technologies)
* [Contents](#content)
* [Features](#features)
* [Installation](#installation)
* [Credits](#credits)

## Motivation 
This project was created for COMP1800 Projects 1 from the British Columbia Institute of Technology in the Computer Systems Technology program. Our goal for this project was to gain experience regarding planning a product, analyzing the market needs, developing a working prototype, and implementing a viable solution. 

Through the shared desire of finding safe, viable locations to study (as well as for a good grade), we have implemented Locaf, a curated search-engine that takes inspiration from apps such as Yelp to deliver a comfortable user experience that targets the student as well as working professional demographics.

## Technologies 
### Built with: ###
- HTML/CSS
- Javascript
- Bootstrap
- Firebase/firestore
- JQuery

## Content 
### Content of the project folder: ###

```
 Top level of project folder: 
 ├── .gitignore                   # Git ignore file
 ├── index.html                   # landing HTML file, this is what users see when you come to url
 └── README.md


It has the following subfolders and files:
📦git                          ### Folder for git repo
📦data                         ### Folder for dummy data
 ┣ 📂photos
 ┃ ┣ 📜simplebites.jpg
 ┃ ┗ 📜timhortonspatio.jpg
 ┗ 📜location-data.js
📦images                       ### Folder for images
 ┣ 📜1200px-Starbucks_Corporation_Logo_2011.svg.png
 ┣ 📜4YN-wgFI_400x400.jpg
 ┣ 📜7.png
 ┣ 📜aboutusbg.jpg
 ┣ 📜blah.jpg
 ┣ 📜CafeLaptop.jpg
 ┣ 📜coffeecup.png
 ┣ 📜CoffeeTable.jpg
 ┣ 📜colors.png
 ┣ 📜greycafe.jpg
 ┣ 📜laptop_office_desk.jpg
 ┣ 📜logo-tim-hortons.png
 ┣ 📜logo.png
 ┣ 📜logo.svg
 ┣ 📜mapss.png
 ┣ 📜mc.jpg
 ┣ 📜mc.png
 ┗ 📜TableBook.jpg
📦pages                         ### Folder for pages
 ┣ 📂location
 ┃ ┣ 📜add-location.html
 ┃ ┣ 📜location.html
 ┃ ┣ 📜post-review.html
 ┃ ┗ 📜search2.html
 ┣ 📂misc
 ┃ ┣ 📜404.html
 ┃ ┣ 📜about-us.html
 ┃ ┣ 📜login.html
 ┃ ┣ 📜main.html
 ┃ ┗ 📜submitted.html
 ┗ 📂profile
 ┃ ┣ 📜add-profile-info.html
 ┃ ┗ 📜profile.html
📦scripts                        ### Folder for scripts
 ┣ 📂firebase
 ┃ ┣ 📜firebase-login.js
 ┃ ┗ 📜user-authentication.js
 ┣ 📂location
 ┃ ┣ 📜add-location.js
 ┃ ┣ 📜load-location-info.js
 ┃ ┣ 📜post-review.js
 ┃ ┗ 📜search.js
 ┣ 📂misc
 ┃ ┣ 📜index-redirect.js
 ┃ ┣ 📜init-map.js
 ┃ ┣ 📜main-search.js
 ┃ ┣ 📜main.js
 ┃ ┗ 📜redirect-submit.js
 ┗ 📂profile
 ┃ ┣ 📜add-profile-info.js
 ┃ ┗ 📜profile.js 
📦styles                          ### Folder for styles
 ┣ 📂location
 ┃ ┣ 📜add-location.css
 ┃ ┣ 📜location.css
 ┃ ┣ 📜post-review.css
 ┃ ┗ 📜search.css
 ┣ 📂misc
 ┃ ┣ 📜about-us.css
 ┃ ┣ 📜login.css
 ┃ ┣ 📜main.css
 ┃ ┗ 📜navbar.css
 ┗ 📂profile
 ┃ ┣ 📜add-profile-info.css
 ┃ ┗ 📜profile.css          
📦unused                          ### Folder for unused files
 ┣ 📜cafe-maps.html
 ┣ 📜google-map.html
 ┣ 📜other-profile.html
 ┗ 📜search.html                 
              

Firebase hosting files: 
├── .firebaserc
├── firebase.json
├── firebase.indexes.json
├── .firestore.rules
├── storage.rules
```

## Features 
- Basic storage/query functions for location and user info
- Basic authentication facilitated through firebase
- Simple search function with adjustable preferences
- Review and rating system
- Photo upload to both location and user
- Able to see other users' photos and reviews

## Installation 
Simply clone the branch to get a working copy of our code. Can also run the code with the following link:
[Locaf-Link-Here] (https://locaf-f1e23.web.app/)

## Credits 
- Our COMP1800 instructor Carly Orr for her guidance and advice throughout the process.
- Our peers in COMP1800 Set D for their feedback and ideas.


