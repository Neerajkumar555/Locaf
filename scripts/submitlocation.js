function submitLocation() {
    document.getElementById('submit').addEventListener('click', function () {
        var xname = document.getElementById('name').value;
        var xaddress = document.getElementById('address').value;
        var xdescription = document.getElementById('description').value;

        var xquiet = document.getElementById('quiet').checked;
        var xlively = document.getElementById('lively').checked;
        var xwashroom = document.getElementById('washroom').checked;
        var xfooddrink = document.getElementById('fooddrink').checked;
        var xlotraffic = document.getElementById('lotraffic').checked;
        var pref = [xquiet, xlively, xwashroom, xfooddrink, xlotraffic];

        var locationRef = db.collection('locations');
        locationRef.add({
            name: xname,
            address: xaddress,
            description: xdescription
        }).then(function(docRef) {
            var id = docRef.id;
            var locationPref = locationRef.doc(id).collection('preferences');
            for(i = 0; i < pref.length; i++) {
                if (pref[i] !== true) {
                    pref[i] = 1;
                } else {
                    pref[i] = 0;
                }
            }
            locationPref.add({
                quiet: pref[0],
                lively: pref[1],
                washroom: pref[2],
                fooddrink: pref[3],
                lotraffic: pref[4]
            })
        })

        setTimeout(function () {
            window.location.assign("submitted.html"); //re-direct to main.html after signup
        }, 1000);
    })
}
submitMyLocation();
function mylocation(){
    firebase.auth().onAuthStateChanged(function(locations){
        if(locations){
           console.log(locations.uid);
           db.collection("locations")
           .doc(locations.uid)
           .get()
           .then(function(doc){
               console.log(doc.data().address);
               var n = doc.data().adress;
               $("#my-address").text(n);
           })
        }
    })
}
submitMyLocation(); 