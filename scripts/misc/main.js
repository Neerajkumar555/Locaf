// grabs the location picture and renders if available; default image if not
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


// loads 3 highest rated locations into rating tab
function loadHighRating() {
    console.log("loading highest rating areas");
    db.collection('locations')
        .orderBy('averagerate', 'desc')
        .limit(3)
        .get()
        .then(function (docs) {
            docs.forEach(function (loc) {
                console.log(loc);
                if (typeof (grabLocationPic(loc)) == "undefined") {
                    var photo = "../../images/logo.png";
                } else {
                    var photo = grabLocationPic(loc);
                }

                let id = loc.data().id;
                let name = loc.data().name;
                let description = loc.data().description;
                let address = loc.data().address;

                var hello = $('<div class="card mb-3" id="' + id + '" style="max-width: 1040px; background-color: #FFFFFF;"><div class="row g-0">' +
                    '<div class="col-md-4" style="max-width: 170px;"><img src="' + photo + '" alt="result" style="width:100px;height:100px; ">' +
                    '</div><div class="col-md-8"><div class="card-body" style="max-width: 870px;"><h5 class="card-title" style="float: left;">' +
                    name + '</h5><p style="float: right; font-size: medium;"><small class="text-muted">' + address + '</small></p>' +
                    '<p class="card-text" style="font-size: medium; float: left;">' + description + '</p><p class="card-text" style="font-size:' +
                    'medium; float: left;"><small class="text-muted">Last updated 3 mins ago</small></p></div></div></div></div>');

                $('#renderrated').append(hello);

                clickResult(id);
            })
        })
}
loadHighRating();


// redirects to the location clicked and has data stored in both URL and localstorage - takes in a location id
function clickResult(locaid) {
    var location = document.getElementById(locaid);

    location.addEventListener('click', function () {
        var id = {
            "id": locaid
        }

        // stores the location document ID into local storage to grab later
        localStorage.setItem('locationid', JSON.stringify(id));
        window.location.href = "../location/location.html" + "?" + locaid;
    })
}


// loads 3 vancouver locations into vancouver tab
function loadVancouver() {
    console.log("loading vancouver areas");
    db.collection('locations')
    
    //searches for 3 locations with the city "Vancouver"
        .where("city", "==", "Vancouver")
        .limit(3)
        .get()
        .then(function (docs) {
            docs.forEach(function (loc) {

                if (typeof (grabLocationPic(loc)) == "undefined") {
                    var photo = "../../images/logo.png";
                } else {
                    var photo = grabLocationPic(loc);
                }

                let id = loc.id;
                let name = loc.data().name;
                let description = loc.data().description;
                let address = loc.data().address;

                var hello = $('<div class="card mb-3" id="' + id + '" style="max-width: 1040px; background-color: #FFFFFF;"><div class="row g-0">' +
                    '<div class="col-md-4" style="max-width: 170px;"><img src="' + photo + '" alt="result" style="width:100px;height:100px; ">' +
                    '</div><div class="col-md-8"><div class="card-body" style="max-width: 870px;"><h5 class="card-title" style="float: left;">' +
                    name + '</h5><p style="float: right; font-size: medium;"><small class="text-muted">' + address + '</small></p>' +
                    '<p class="card-text" style="font-size: medium; float: left;">' + description + '</p><p class="card-text" style="font-size:' +
                    'medium; float: left;"><small class="text-muted">Last updated 3 mins ago</small></p></div></div></div></div>')

                $('#rendervancouver').append(hello);

                clickResult(id);
            })
        })
}
loadVancouver();


// loads 3 canada locations into canada tab
function loadCanada() {
    console.log("loading canada areas");
    db.collection('locations')
    //searches for 3 locations with the country "Canada"
        .where("country", "==", "Canada")
        .limit(3)
        .get()
        .then(function (docs) {
            docs.forEach(function (loc) {

                // if location's picture is undefined, assign it a default pic
                if (typeof (grabLocationPic(loc)) == "undefined") {
                    var photo = "../../images/logo.png";
                } else {
                    var photo = grabLocationPic(loc);
                }

                let id = loc.data().id;
                let name = loc.data().name;
                let description = loc.data().description;
                let address = loc.data().address;

                var hello = $('<div class="card mb-3" id="' + id + '" style="max-width: 1040px; background-color: #FFFFFF;"><div class="row g-0">' +
                    '<div class="col-md-4" style="max-width: 170px;"><img src="' + photo + '" alt="result" style="width:100px;height:100px; ">' +
                    '</div><div class="col-md-8"><div class="card-body" style="max-width: 870px;"><h5 class="card-title" style="float: left;">' +
                    name + '</h5><p style="float: right; font-size: medium;"><small class="text-muted">' + address + '</small></p>' +
                    '<p class="card-text" style="font-size: medium; float: left;">' + description + '</p><p class="card-text" style="font-size:' +
                    'medium; float: left;"><small class="text-muted">Last updated 3 mins ago</small></p></div></div></div></div>')

                $('#rendercanada').append(hello);

                clickResult(id);
            })
        })
}
loadCanada();

// displays the user's name on the main screen
function displayMsg() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //console.log(users.uid);
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    // grabs data name user doc
                    var name = doc.data().name;

                    // displays grabbed data onto page
                    var message = "<h2> Hello, " + name + "</h2>";

                    $("#name").before(message);

                })
        } else {
            // No user is signed in.
        }
    })
}
displayMsg();