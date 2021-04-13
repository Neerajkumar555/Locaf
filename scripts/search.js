var searchinput = document.getElementById('searchbar');
var searchbutt = document.getElementById('searchbutt');


// searches locations if redirected by the main page buttons
function quickDisplay(search) {

    // Clears results to prevent duplicates
    $('#results').html('<h3>Here are the best matching results for you:</h3>');

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
        var presearch = window.location.search.substring(1);

        // replaces the utf character symbol with a space
        if (presearch.includes("%20")) {
            presearch = presearch.substring(0, presearch.indexOf("%")) + " " + presearch.substring(presearch.indexOf("0") + 1);
        }

        console.log(presearch);

        // checks if the url was redirected from the main page quick buttons
        if (presearch !== 'quiet' && presearch !== 'lively' && presearch !== 'food' &&
        presearch !== 'wash' && presearch !== 'lo') {
            db.collection('locations')
                .where("name", "==", presearch)
                .get()
                .then(function (results) {

                    // display any results that match the user input when the page is loaded
                    results.forEach(function (doc) {
                        displayLoc(doc);
                    })
                })
        } else {
            quickDisplay(presearch);
        }
    }

    // waits for the user to click on the submit button
    searchbutt.addEventListener('click', function (e) {

        e.preventDefault();

        closeNav();

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
        $('#results').html('<h3>Here are the best matching results for you:</h3>');

        db.collection('locations').get()
            .then(function (search) {
                // search = documents from locations collection
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

                var boop = 1;
                // while the location array still has results to be processed
                while (locationsArray.length > 0 && check >= 0) {

                    // array of indexes to remove
                    var toRemove = []
                    for (i = 0; i < locationsArray.length; i++) {

                        // the current location matching magnitude to compare
                        var current = match(locationsArray[i], userpref);
                        console.log(boop++);
                        console.log("checking for " + check + " versus " + current + " at: " + locationsArray[i].data().name)

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

    if (typeof (grabLocationPic(doc)) == "undefined") {
        var photo = "images/logo.png";
    } else {
        var photo = grabLocationPic(doc);
    }



    // creates dom element to display in the page and appends to 'results' div
    // var newLocation = $('<p class="link" id="' + id + '">' + ". " + name + " " + address + " " + description + '</p>');

    var hello = $('<div class="card mb-3" id="' + id + '" style="max-width: 1040px; background-color: #FFFFFF;"><div class="row g-0">' +
        '<div class="col-md-4" style="max-width: 170px;"><img src="' + photo + '" alt="result" style="width:100px;height:100px; ">' +
        '</div><div class="col-md-8"><div class="card-body" style="max-width: 870px;"><h5 class="card-title" style="float: left;">' +
        name + '</h5><p style="float: right; font-size: medium;"><small class="text-muted">' + address + '</small></p>' +
        '<p class="card-text" style="font-size: medium; float: left;">' + description + '</p><p class="card-text" style="font-size:' +
        'medium; float: left;"><small class="text-muted">Last updated 3 mins ago</small></p></div></div></div></div>')

    $('#results').append(hello);

    clickResult(id);
}

function grabLocationPic(result) {

    // grabs the photo from the user's document
    db.collection("locations").doc(result.id).collection('photos')
        .limit(1)
        .get()
        .then(function (docs) {
            docs.forEach(function (doc) {
                var picURL = doc.data().photoURL;
                return picURL;
            })
        })
}

// sets the magnitude of how much the location matches the search + preferences
function match(doc, userpref) {
    var xinput = doc.data().name.toLowerCase();
    var xdescript = doc.data().description;
    var xaddress = doc.data().address;
    var xquiet = doc.data().preferences.quiet;
    var xlively = doc.data().preferences.lively;
    var xwashroom = doc.data().preferences.washroom;
    var xfooddrink = doc.data().preferences.fooddrink;
    var xlotraffic = doc.data().preferences.lotraffic;
    var checkpref = [xquiet, xlively, xwashroom, xfooddrink, xlotraffic];
    var matchMag = 0;

    console.log(xinput);
    console.log(userpref[0]);

    // checks how alike the preferences are (same name or description gets more weight)
    if (xinput == userpref[0] || xdescript.includes(userpref[0]) || xaddress.includes(userpref[0])) {
        matchMag += 10;
    }

    for (n = 1; n < checkpref.length; n++) {
        if (userpref[n] == checkpref[n - 1]) {
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


// open preference bar function
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}


// close preference bar function
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}