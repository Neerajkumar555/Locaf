const locationRef = db.collection('locations');
const submitButton = document.getElementById('submit');
const increment = firebase.firestore.FieldValue.increment(1);

function uploadPhoto(user, file, entry) {
    var storageRef = storage.ref("images/" + user.uid + ".jpg");

    //upload the picked file
    storageRef.put(file)
        .then(function () {
            console.log('Uploaded to Cloud Storage.');
            storageRef.getDownloadURL()
                .then(function (url) { // Get URL of the uploaded file   
                    entry.collection("photos").doc().set({ // Save the URL into users collection
                            "photoURL": url,
                            "submitBy": user.displayName
                        })
                        .then(function () {
                            console.log('Added photo URL to Firestore.');
                        })
                })
        })
}

function submitLocation() {
    firebase.auth().onAuthStateChanged(function (user) {
        // Let's assume my storage is only enabled for authenticated users 
        // This is set in your firebase console storage "rules" tab
        var newEntry = locationRef.doc();
        var fileInput = document.getElementById("upload"); // pointer #1
        const image = document.getElementById("loadedPic"); // pointer #2

        // listen for file selection
        fileInput.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var blob = URL.createObjectURL(file);
            image.src = blob; // display this image
            submitButton.addEventListener('click', function() {

            })
        })
        submitButton.addEventListener('click', function () {

            var xname = document.getElementById('name').value.toLowerCase();
            var xaddress = document.getElementById('address').value.toLowerCase();
            var xdescription = document.getElementById('description').value.toLowerCase();

            var xquiet = Number(document.getElementById('quiet').checked);
            var xlively = Number(document.getElementById('lively').checked);
            var xwashroom = Number(document.getElementById('washroom').checked);
            var xfooddrink = Number(document.getElementById('fooddrink').checked);
            var xlotraffic = Number(document.getElementById('lotraffic').checked);

            newEntry.set({
                name: xname,
                address: xaddress,
                description: xdescription,
                preferences: {
                    quiet: xquiet,
                    lively: xlively,
                    washroom: xwashroom,
                    fooddrink: xfooddrink,
                    lotraffic: xlotraffic
                }
            })

            uploadPhoto(user, fileInput.files[0], newEntry);
            
            console.log("Data was uploaded!")
            setTimeout(function () {
               window.location.assign("submitted.html"); //re-direct to main.html after signup
            }, 1000);
        })
    })
}
submitLocation();