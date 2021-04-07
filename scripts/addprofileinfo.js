const userRef = db.collection('users');
const submitButton = document.getElementById('submit');




function submitProfileInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        // Let's assume my storage is only enabled for authenticated users 
        // This is set in your firebase console storage "rules" tab
        var newEntry = userRef.doc(user.uid);

        submitButton.addEventListener('click', function () {

            var xnickname = document.getElementById('nickname').value.toLowerCase();
            var xnumber = document.getElementById('number').value.toLowerCase();
            var xdescription = document.getElementById('description').value.toLowerCase();
            var xaddress = document.getElementById('address').value.toLowerCase();

            newEntry.update({
                nickname: xnickname,
                description: xdescription,
                number: xnumber,
                address: xaddress
                
            })

            console.log("Data was uploaded!")
            setTimeout(function () {
               window.location.assign("submitted.html?location"); //re-direct to main.html after signup
            }, 1000);
        })
    })
}
submitProfileInfo();
