const locaname = document.getElementById("locaname");
const locaaddress = document.getElementById("locaaddress");
const locaattrib = document.getElementById("attribute");
// const locaID = getId2();

// Dependent on getting document info from results page
function getId2() {
    var id = JSON.parse(localStorage.getItem('locationid'));
    console.log(myobj);
    return id;
}

function loadInfo() {
    db.collections("locations")
        .doc(locaID)
        .get()
        .then(function (info) {
            var n = info.data().name;
            var a = info.data().address;
            //var p = info.data().preferences;

            locaname.innerHTML = n;
            locaaddress.innerHTML = a;
            //locaattribute.innerHTML = p;
        })
}
//loadInfo();

function loadPhotos() {
    document.getElementById("pills-photos-tab").addEventListener('click', function () {
        db.collection("locations").doc(locaID).collection("photos")
            .get()
            .then(function (snap) {
                count = 0;

                snap.forEach(function (doc) {
                    var name = doc.data().submitBy;
                    var url = doc.data().photoURL;
                    if (count % 3 == 0 || count == 0) {
                        $("#column1").append('<div class="card text-white"><img src="' +
                            name + '" class="card-img" alt="..."><div class="card-img-overlay"><h5 class="card-title">' +
                            url + '</h5></div></div>')
                        count++;
                    } else if (count % 4 == 0 || count == 1) {
                        $("#column2").append('<div class="card text-white"><img src="' +
                            name + '" class="card-img" alt="..."><div class="card-img-overlay"><h5 class="card-title">' +
                            url + '</h5></div></div>')
                        count++;
                    } else if (count % 5 == 0 || count == 2) {
                        $("#column3").append('<div class="card text-white"><img src="' +
                            name + '" class="card-img" alt="..."><div class="card-img-overlay"><h5 class="card-title">' +
                            url + '</h5></div></div>')
                        count++;
                    }
                })
            })
    })
}
loadPhotos();

/// Function to display average rating .....


function getavgrating() {

    let ratingTotal = 0;
    let count = 0;

    db.collection("locations").doc('ZFN9SLHqssPHqZN3rXio').collection("reviews")
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