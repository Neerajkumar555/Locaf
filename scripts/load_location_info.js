// gets the name, address, and attribute divs on the page
const locaname = document.getElementById("locaname");
const locaaddress = document.getElementById("locaaddress");
const locaattrib = document.getElementById("attribute");

// the ID of the location that was clicked on the search page
const locaID = getId();


// dependent on getting document info from results page
function getId() {
    var id = JSON.parse(localStorage.getItem('locationid')).id;
    console.log(id);
    return id;
}


// loads information of the clicked location from the database and renders onto page
function loadInfo() {
    db.collection("locations").doc(locaID).get()
        .then(function (info) {
            var n = info.data().name;
            var a = info.data().address;
            //var p = info.data().preferences;

            locaname.innerHTML = n;
            locaaddress.innerHTML = a;
            //locaattribute.innerHTML = p;
        })
}
loadInfo();


// loads photos into the photos tab
function loadPhotos() {
    var photos = document.getElementById("pills-photos-tab");

    // waits for the photos tab to be clicked
    photos.addEventListener('click', function () {

        db.collection("locations").doc(locaID).collection("photos")
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    var url = doc.data().photoURL;
                    $("#photos-goes-here").html('<div class="card text-white"><img src="' +
                        url + '" class="card-img" alt="..."></div>');
                })
            })
    })
}
loadPhotos();


// displays average rating of the location and saves to location
function getAvgRating() {

    // sum of all ratings
    let ratingTotal = 0;

    // number of reviews
    let count = 0;

    db.collection("locations").doc(locaID).collection("reviews")
        .get()
        .then(function (snap) {

            // adds review to sum and increments count
            snap.forEach(function (doc) {
                ratingTotal += doc.data().reviewrating;
                count++;
            })

            // calculate and display average rating
            avg = parseInt(ratingTotal / count);
            displayRating(avg);

            // sets the average rating for search purposes
            db.collection("locations").doc(locaID).update({
                averagerate: avg
            })
        })
}
getAvgRating();


// displays a given rating onto the page
function displayRating(avg) {

    document.getElementById("avg_rtng").textContent += " " + avg;
    switch (avg) {
        case 1:
            var rating = document.getElementById("star-1");
            rating.checked = true;
            break;
        case 2:
            var rating = document.getElementById("star-2");
            rating.checked = true;
            break;
        case 3:
            var rating = document.getElementById("star-3");
            rating.checked = true;
            break;
        case 4:
            var rating = document.getElementById("star-4");
            rating.checked = true;
            break;
        case 5:
            var rating = document.getElementById("star-5");
            rating.checked = true;
            break;
    }
}


// loads reviews in the reviews tab
function loadReviews() {

    var reviews = document.getElementById("pills-reviews-tab");

    // waits for the reviews tab to be clicked
    reviews.addEventListener('click', function () {

        // clears the photos and reviews tab of previous data to prevent duplicates
        $("#photos-goes-here").html('');
        $("#reviews-goes-here").html('');

        db.collection("locations").doc(locaID).collection("reviews")
            .get()
            .then(function (snap) {

                // creates a grid to put the reviews into
                $("#reviews-goes-here").append('<div class="row" id="reviewgrid"></div>');

                snap.forEach(function (doc) {
                    var name = doc.data().postedby;
                    var rating = doc.data().reviewrating;
                    var text = doc.data().reviewdetails;

                    var review = '<div class="col-6 card"><p>';
                    review += "<b>Posted by</b>: " + name + "<br>";
                    review += text + "<br>";
                    review += "<b>Rating</b>: " + rating + "</div>";

                    $("#reviewgrid").append(review);
                })
            })
    })
}
loadReviews();