const locaname = document.getElementById("locaname");
const locaaddress = document.getElementById("locaaddress");
const locaattrib = document.getElementById("attribute");
const locaID = getId();

// Dependent on getting document info from results page
function getId() {
    var id = JSON.parse(localStorage.getItem('locationid')).id;    
    console.log(id);
    return id;
}

function loadInfo() {
    db.collection("locations").doc(locaID).get()
    .then(function(info) {
        var n = info.data().name;
        var a = info.data().address;
        //var p = info.data().preferences;

        locaname.innerHTML = n;
        locaaddress.innerHTML = a;
        //locaattribute.innerHTML = p;
    })
}
loadInfo();

///function to display photos

function loadPhotos() {

    var photos = document.getElementById("pills-photos-tab");


   
        db.collection("locations").doc(locaID).collection("photos")
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    var url = doc.data().photoURL;
                        $("#photos-goes-here").append('<div class="card text-white"><img src="' +
                        url + '" class="card-img" alt="..."></div>') ;
                })
            })
    }

loadPhotos();

/// Function to display average rating .....


function getavgrating() {

    let ratingTotal = 0;
    let count = 0;

    db.collection("locations").doc(locaID).collection("reviews")
        .get()
        .then(function (snap) {
            snap.forEach(function (doc) {
                ratingTotal += doc.data().reviewrating;
                count++;
            })
            avg = parseInt(ratingTotal / count);
            displayrating(avg);
        })
}
getavgrating();

function displayrating(avg){

    document.getElementById("avg_rtng").textContent += " "+avg;
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

// Function to display reviews .....

function loadreviews(){

    db.collection("locations").doc(locaID).collection("reviews")
    .get()
    .then(function (snap) {

        $("#reviews-goes-here").append('<div class="row" id="reviewgrid"></div>') ;

        snap.forEach(function (doc) {
            var name = doc.data().postedby;
            var rating = doc.data().reviewrating;
            var text = doc.data().reviewdetails;

            var review ='<div class="col-4"><p>';
            review +="<b>Posted by</b>: "+name+"<br>";
            review += text+"<br>";
            review += "<b>Rating</b>: "+rating+"</div>";

                $("#reviewgrid").append(review) ;
        })
    })
}

loadreviews();