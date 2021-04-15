// the locations collection within the database
const locationRef = db.collection('locations');

// the submit button
const submitButton = document.getElementById('submit');

// used to increment a document field
const increment = firebase.firestore.FieldValue.increment(1);


// uploads the photo into the database - takes in a user, a file, and the created document
function uploadPhoto(user, file, entry) {
    var storageRef = storage.ref("images/" + user.uid + ".jpg");

    //upload the picked file
    storageRef.put(file)
        .then(function () {
            console.log('Uploaded to Cloud Storage.');
            storageRef.getDownloadURL()
                .then(function (url) {  

                    // save the URL into the photos collection under the active user document
                    entry.collection("photos").doc().set({ 
                            "photoURL": url,
                            "submitBy": user.displayName
                        })
                        .then(function () {
                            console.log('Added photo URL to Firestore.');
                        })
                })
        })
}


// submits location data + photo if uploaded into database
function submitLocation() {
    firebase.auth().onAuthStateChanged(function (user) {
        var newEntry = locationRef.doc();

        // the upload button
        var fileInput = document.getElementById("upload"); 

        const image = document.getElementById("loadedPic"); 

        // listens for a user-uploaded photo
        fileInput.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var blob = URL.createObjectURL(file);
            image.src = blob; // display this image
        })

        // listens for the submit button to be clicked
        submitButton.addEventListener('click', function () {

            // grabs all the input field values and converts into numbers
            var xname = document.getElementById('name').value.toLowerCase();
            var xaddress = document.getElementById('address').value.toLowerCase();
            var xcity = document.getElementById('name').value.toLowerCase();
            var xcountry = document.getElementById('address').value.toLowerCase();
            var xdescription = document.getElementById('description').value;
            var xquiet = Number(document.getElementById('quiet').checked);
            var xlively = Number(document.getElementById('lively').checked);
            var xwashroom = Number(document.getElementById('washroom').checked);
            var xfooddrink = Number(document.getElementById('fooddrink').checked);
            var xlotraffic = Number(document.getElementById('lotraffic').checked);

            // creates a new document within locations
            newEntry.set({
                name: xname,
                address: xaddress,
                city: xcity,
                country: xcountry,
                description: xdescription,
                averagerate: 0,
                preferences: {
                    quiet: xquiet,
                    lively: xlively,
                    washroom: xwashroom,
                    fooddrink: xfooddrink,
                    lotraffic: xlotraffic
                }
            })

            // uploads the photo under the location; attributes to the user
            uploadPhoto(user, fileInput.files[0], newEntry)

            setTimeout(function () {
                window.location.assign("../misc/submitted.html?location"); 
             }, 1000);

        })
    })
}
submitLocation();