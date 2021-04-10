// users collection in database
const userRef = db.collection('users');

// the submit button in the html
const submitButton = document.getElementById('submit');


// edits the user's profile information in the database
function submitProfileInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        var newEntry = userRef.doc(user.uid);

        submitButton.addEventListener('click', function () {

            // grabs the user's input values
            var xusername = document.getElementById('username').value;
            var xnickname = document.getElementById('nickname').value;
            var xnumber = document.getElementById('number').value;
            var xdescription = document.getElementById('description').value;
            var xaddress = document.getElementById('address').value;

            // updates the user document with more information
            newEntry.update({
                name: xusername,
                nickname: xnickname,
                description: xdescription,
                number: xnumber,
                address: xaddress
            })

            //console.log("Data was uploaded!")
            // short delay after submitting to show the 'weight' of the action
            setTimeout(function () {
               window.location.assign("profile.html?location"); 
            }, 500);
        })
    })
}
submitProfileInfo();
