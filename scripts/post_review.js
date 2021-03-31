function postreview() {
    document.getElementById('post').addEventListener('click', function () {
            var rating;
            var text = document.getElementById('writereview').value;
            var star5 = document.getElementById('star-5').checked;
            var star4 = document.getElementById('star-4').checked;
            var star3 = document.getElementById('star-3').checked;
            var star2 = document.getElementById('star-2').checked;
            var star1 = document.getElementById('star-1').checked;
            console.log(text);
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
            console.log(rating);
            firebase.auth().onAuthStateChanged(function (user) {
                var locationRef = db.collection('locations');
                var reviewref = locationRef.doc().collection('reviews');
                reviewref.doc().set({
                    postedby: user.displayName,
                    reviewrating: rating,
                    reviewdetails:text
                })
            })
            })
        
    }

    postreview();