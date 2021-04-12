var searchinput = document.getElementById('searchbar');
var searchbutt = document.getElementById('searchbutt');


// searches locations if redirected by the main page buttons
function quickDisplay(search) {
    db.collection('locations').get()
    .then(function (results) {

        // checks which preference was clicked from the main page
        switch (search) {
            case "quiet":
                results.forEach(function (doc) {
                    console.log(doc.data().preferences.quiet);
                    if (doc.data().preferences.quiet == 1) {
                        displayLoc(doc);
                    }
                })
                break;

            case "lively":
                results.forEach(function (doc) {
                    console.log(doc.data().preferences.lively);
                    if (doc.data().preferences.lively == 1) {
                        displayLoc(doc);
                    }
                })
                break;

            case "food":
                results.forEach(function (doc) {
                    if (doc.data().preferences.fooddrink == 1) {
                        displayLoc(doc);
                    }
                })
                break;

            case "wash":
                results.forEach(function (doc) {
                    if (doc.data().preferences.washroom == 1) {
                        displayLoc(doc);
                    }
                })
                break;
                
            case "lo":
                results.forEach(function (doc) {
                    if (doc.data().preferences.lotraffic == 1) {
                        displayLoc(doc);
                    }
                })
                break;
        }
    })
}

function showMyRestaurants() {

    // if the user came from the main page and has inputted something, generate results on search page based on input
    if (window.location.search !== "?") {
        let presearch = window.location.search.substring(1);
        console.log(presearch);

        if (presearch !== 'quiet' && presearch !== 'lively' && presearch !== 'food' &&
            presearch !== 'wash' && presearch !== 'lo') {
            db.collection('locations').get()
                .then(function (results) {

                    // display any results that match the user input when the page is loaded
                    results.forEach(function (doc) {
                        console.log(doc.data().name);
                        if (doc.data().name == presearch) {
                            displayLoc(doc);
                        }
                    })
                })
        } else {
            quickDisplay(presearch);
        }
    }

    // waits for the user to click on the submit button
    searchbutt.addEventListener('click', function () {
        var input = searchinput.value.toLowerCase();
        var quiet = Number(document.getElementById('btncheck1').checked);
        var lively = Number(document.getElementById('btncheck2').checked);
        var washroom = Number(document.getElementById('btncheck3').checked);
        var fooddrink = Number(document.getElementById('btncheck4').checked);
        var lotraffic = Number(document.getElementById('btncheck5').checked);

        //             string    1       0        1         0           0
        var userpref = [input, quiet, lively, washroom, fooddrink, lotraffic];
        console.log(userpref);

        // Clears results to prevent duplicates
        $('#results').html('');

        db.collection('locations').get()
            .then(function (search) {
                // search = document from locations collection
                console.log(search);

                // To iterate through
                var locationsArray = [];

                // moving every document into the array
                search.forEach(function (doc) {
                    locationsArray.push(doc);
                    console.log("adding this document to array: " + doc.id);
                })

                // max rating a location can have
                var check = 15;

                // while the location array still has results to be processed
                while (locationsArray.length > 0 && check >= 0) {

                    // array of indexes to remove
                    var toRemove = []
                    for (i = 0; i < locationsArray.length; i++) {

                        // the current location matching magnitude to compare
                        var current = match(locationsArray[i], userpref);
                        //console.log(boop++);
                        //console.log("checking for " + check + " versus " + current + " at: " + locationsArray[i].data().name)

                        // if values match, then display result
                        if (current == check) {
                            console.log("match!");
                            displayLoc(locationsArray[i]);
                            toRemove.push(i);
                        }
                    }

                    // removes matches from array so we don't have to check them again
                    if (toRemove.length > 0) {
                        for (f = toRemove.length - 1; f >= 0; f--) {
                            locationsArray.splice(toRemove[f], 1);
                        }
                    }

                    // lowers check magnitude by one
                    check--;
                }
            })
    })
}
showMyRestaurants();


// displays a location when given a document
function displayLoc(doc) {
    var name = doc.data().name;
    var address = doc.data().address;
    var description = doc.data().description;
    var id = doc.id;

    // creates dom element to display in the page and appends to 'results' div
    var newLocation = $('<p class="link" id="' + id + '">' + ". " + name + " " + address + " " + description + '</p>');
    $('#results').append(newLocation);
    clickResult(id);
}

// sets the magnitude of how much the location matches the search + preferences
function match(doc, userpref) {
    var xinput = doc.data().name;
    var xquiet = doc.data().preferences.quiet;
    var xlively = doc.data().preferences.lively;
    var xwashroom = doc.data().preferences.washroom;
    var xfooddrink = doc.data().preferences.fooddrink;
    var xlotraffic = doc.data().preferences.lotraffic;
    var checkpref = [xinput, xquiet, xlively, xwashroom, xfooddrink, xlotraffic];
    var matchMag = 0;

    // checks how alike the preferences are (same name gets +10)
    if (checkpref[0] == userpref[0]) {
        matchMag += 10;
    }
    for (n = 1; n < 6; n++) {
        if (userpref[n] == checkpref[n]) {
            matchMag++;
        }
    }

    // returns how much the location matches user pref
    return matchMag;
}

// LETS GO I DID IT WOO
// oscar was here

// redirects to the location clicked and has data stored in both URL and localstorage
function clickResult(locaid) {
    var location = document.getElementById(locaid);
    location.addEventListener('click', function () {
        var id = {
            "id": locaid
        }

        // stores the location document ID into local storage to grab later
        localStorage.setItem('locationid', JSON.stringify(id));
        window.location.href = "location.html" + "?" + locaid;
    })
}