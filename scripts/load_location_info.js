const locaname = document.getElementById("locaname");
const locaaddress = document.getElementById("locaaddress");
const locaattrib = document.getElementById("attribute");
const locaID = getId2();
// Dependent on getting document info from results page
function getId2(){
    var myobj = JSON.parse(localStorage.getItem('locationid'));    
    console.log(myobj);
    return myobj;
}

function loadInfo() {
    db.collections("locations")
    .doc(locaID)
    .get()
    .then(function(info) {
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
    document.getElementById("pills-photos-tab").addEventListener('click', function() {
        db.collection("locations").doc(locaID).collection("photos")
        .get()
        .then(function(snap){
            count = 0;

            snap.forEach(function(doc){
                var name = doc.data().submitBy;
                var url = doc.data().photoURL;
                if (count % 3 == 0 || count == 0) {
                    $("#column1").append('<div class="card text-white"><img src="' 
                    + name + '" class="card-img" alt="..."><div class="card-img-overlay"><h5 class="card-title">'
                    + url + '</h5></div></div>')
                    count++;
                } else if (count % 4 == 0 || count == 1) {
                    $("#column2").append('<div class="card text-white"><img src="' 
                    + name + '" class="card-img" alt="..."><div class="card-img-overlay"><h5 class="card-title">'
                    + url + '</h5></div></div>')
                    count++;
                } else if (count % 5 == 0 || count == 2) {
                    $("#column3").append('<div class="card text-white"><img src="' 
                    + name + '" class="card-img" alt="..."><div class="card-img-overlay"><h5 class="card-title">'
                    + url + '</h5></div></div>')
                    count++;
                }
            })
        })
    })
}
loadPhotos();