// the document ID of the clicked result from the search page
var locaID = getId();

// dependent on getting document info from results page
function getId() {
    var id = JSON.parse(localStorage.getItem('locationid')).id;
    //console.log(id);
    return id;
}

// posts the review into the database
function postReview() {
    document.getElementById('post').addEventListener('click', function () {
        var rating;

        // gets the rating and review details
        var text = document.getElementById('writereview').value;
        var star5 = document.getElementById('star-5').checked;
        var star4 = document.getElementById('star-4').checked;
        var star3 = document.getElementById('star-3').checked;
        var star2 = document.getElementById('star-2').checked;
        var star1 = document.getElementById('star-1').checked;
        //console.log(text);
        
        if (star5) {
            rating = 5;
        } else if (star4) {
            rating = 5;
        } else if (star3) {
            rating = 3
        } else if (star2) {
            rating = 2
        } else {
            rating = 1;
        }
        //console.log(rating);

        firebase.auth().onAuthStateChanged(function (user) {

            // review collection under a location document
            var reviewref = db.collection('locations').doc(locaID).collection('reviews');

            // creating the review in the location
            reviewref.doc().set({
                postedby: user.displayName,
                reviewrating: rating,
                reviewdetails: text

            })

            // review collection under a user document
            var useref = db.collection('users').doc(user.uid).collection('reviews');

            // creating the review in the user
            useref.doc().set({
                postedby: user.displayName,
                reviewrating: rating,
                reviewdetails: text
            })
        })

        //console.log("review posted!!");
        setTimeout(function () {
           window.location.assign("submitted.html?review"); //re-direct to main.html after signup
        }, 1000);
    })
}
postReview();