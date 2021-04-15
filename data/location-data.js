var locationsRef = db.collection('locations');

var dummydata = [
    {   name: 'Tim Hortons', 
        address: '123 Maple St',
        city: 'Vancouver',
        country: "Canada",
        description: 'A popular, busy joint that is always bustling with customers; a very Canadian location indeed.', 
        averagerate: 0, 
        preferences: {
            fooddrink: 1,
            lively: 1,
            lotraffic: 0,
            quiet: 0,
            washroom: 1   
        }
    },
    {   name: 'Simple Bites', 
        address: '5905 Chester St',
        city: 'Vancouver',
        country: "Canada",
        description: 'Japanese fast-food with limited seating, but a very friendly atmosphere.', 
        averagerate: 0, 
        preferences: {
            fooddrink: 1,
            lively: 0,
            lotraffic: 1,
            quiet: 1,
            washroom: 0   
        }
    },
    {   name: 'Blue Chip', 
        address: '3300 University Boulevard',
        city: 'Vancouver',
        country: "Canada",
        description: 'Well-regard cookies and a location central to the student hub makes this location a popular spot.', 
        averagerate: 0, 
        preferences: {
            fooddrink: 1,
            lively: 1,
            lotraffic: 0,
            quiet: 0,
            washroom: 1 
        }  
    },
    {   name: 'Waves Coffee', 
        address: '5300 University Boulevard',
        city: 'Vancouver',
        country: "Canada",
        description: 'Premium coffee coupled with hot cafe foods equals an ideal studying spot.', 
        averagerate: 0, 
        preferences: {
            fooddrink: 1,
            lively: 0,
            lotraffic: 1,
            quiet: 1,
            washroom: 1 
        }  
    },
    {   name: 'Breka Bakery and Cafe', 
        address: '855 Davie Street',
        city: 'Vancouver',
        country: "Canada",
        description: 'A popular study location, Breka serves great desserts and comfort foods that make studying a joy.', 
        averagerate: 0, 
        preferences: {
            fooddrink: 1,
            lively: 1,
            lotraffic: 0,
            quiet: 1,
            washroom: 1 
        }  
    },
    {   name: 'ShareTea', 
        address: '800 Capstan Way',
        city: 'Richmond',
        country: "Canada",
        description: 'Bubble tea joint with many tables and outlets for quality studying.', 
        averagerate: 0, 
        preferences: {
            fooddrink: 1,
            lively: 0,
            lotraffic: 1,
            quiet: 1,
            washroom: 1 
        }  
    },
    {   name: 'CoCo Bubble Tea', 
        address: '3900 Kingsway',
        city: 'Burnaby',
        country: "Canada",
        description: 'Lively bubble tea chain with a bright, bubbly environment.',
        averagerate: 0, 
        preferences: {
            fooddrink: 1,
            lively: 1,
            lotraffic: 1,
            quiet: 0,
            washroom: 1 
        }  
    },
    {   name: 'Yifang Taiwan', 
        address: '53924 103 Ave',
        city: 'Surrey',
        country: "Canada",
        description: 'Taiwanese bubble tea joint specializing in fruit teas; limited seating.', 
        averagerate: 0, 
        preferences: {
            fooddrink: 1,
            lively: 0,
            lotraffic: 1,
            quiet: 1,
            washroom: 1 
        }  
    },
    {   name: 'Jack Frost', 
        address: '5100 No. 3 Road',
        city: 'Richmond',
        country: "Canada",
        description: 'Shaved ice location that also sells hot drinks making it a great option in any condition.',
        averagerate: 0,  
        preferences: {
            fooddrink: 1,
            lively: 0,
            lotraffic: 1,
            quiet: 0,
            washroom: 1 
        }  
    },
    {   name: 'Starbucks', 
        address: '500 Sussex St',
        city: 'Burnaby',
        country: "Canada",
        description: 'An iconic chain selling a wide variety of drinks with ample seating.', 
        averagerate: 0, 
        preferences: {
            fooddrink: 1,
            lively: 1,
            lotraffic: 0,
            quiet: 0,
            washroom: 1 
        }  
    }
]

function writeDummyLocations() {
    dummydata.forEach(function(place) {
        locationsRef.add({
            name: place.name,
            address: place.address,
            city: place.city,
            country: place.country,
            description: place.description,
            preferences: {
                fooddrink: place.preferences.fooddrink,
                lively: place.preferences.lively,
                lotraffic: place.preferences.lotraffic,
                quiet: place.preferences.quiet,
                washroom: place.preferences.washroom
            }
        });
    });
}
