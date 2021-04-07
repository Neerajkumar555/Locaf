var locationsRef = db.collection('locations');

var dummydata = [
    {   name: 'Tim Hortons', 
        address: '123 Maple St, Vancouver, BC',
        description: 'A popular, busy joint that is always bustling with customers; a very Canadian location indeed.', 
        preferences: {
            fooddrink: 1,
            lively: 1,
            lotraffic: 0,
            quiet: 0,
            washroom: 1   
        }
    },
    {   name: 'Simple Bites', 
        address: '5905 Chester St, Vancouver, BC',
        description: 'Japanese fast-food with limited seating, but a very friendly atmosphere.', 
        preferences: {
            fooddrink: 1,
            lively: 0,
            lotraffic: 1,
            quiet: 1,
            washroom: 0   
        }
    },
    {   name: 'Blue Chip', 
        address: '3300 University Boulevard, Vancouver, BC',
        description: 'Well-regard cookies and a location central to the student hub makes this location a popular spot.', 
        preferences: {
            fooddrink: 1,
            lively: 1,
            lotraffic: 0,
            quiet: 0,
            washroom: 1 
        }  
    },
    {   name: 'Waves Coffee', 
        address: '5300 University Boulevard, Vancouver, BC',
        description: 'Premium coffee coupled with hot cafe foods equals an ideal studying spot.', 
        preferences: {
            fooddrink: 1,
            lively: 0,
            lotraffic: 1,
            quiet: 1,
            washroom: 1 
        }  
    },
    {   name: 'Breka Bakery and Cafe', 
        address: '855 Davie Street, Vancouver, BC',
        description: 'A popular study location, Breka serves great desserts and comfort foods that make studying a joy.', 
        preferences: {
            fooddrink: 1,
            lively: 1,
            lotraffic: 0,
            quiet: 1,
            washroom: 1 
        }  
    },
    {   name: 'ShareTea', 
        address: '800 Capstan Way, Richmond, BC',
        description: 'Bubble tea joint with many tables and outlets for quality studying.', 
        preferences: {
            fooddrink: 1,
            lively: 0,
            lotraffic: 1,
            quiet: 1,
            washroom: 1 
        }  
    },
    {   name: 'CoCo Bubble Tea', 
        address: '3900 Kingsway, Burnaby, BC',
        description: 'Lively bubble tea chain with a bright, bubbly environment.', 
        preferences: {
            fooddrink: 1,
            lively: 1,
            lotraffic: 1,
            quiet: 0,
            washroom: 1 
        }  
    },
    {   name: 'Yifang Taiwan', 
        address: '53924 103 Ave, Surrey, BC',
        description: 'Taiwanese bubble tea joint specializing in fruit teas; limited seating.', 
        preferences: {
            fooddrink: 1,
            lively: 0,
            lotraffic: 1,
            quiet: 1,
            washroom: 1 
        }  
    },
    {   name: 'Jack Frost', 
        address: '5100 No. 3 Road, Richmond, BC',
        description: 'Shaved ice location that also sells hot drinks making it a great option in any condition.', 
        preferences: {
            fooddrink: 1,
            lively: 0,
            lotraffic: 1,
            quiet: 0,
            washroom: 1 
        }  
    },
    {   name: 'Starbucks', 
        address: '500 Sussex St, Burnaby, BC',
        description: 'An iconic chain selling a wide variety of drinks with ample seating.', 
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
