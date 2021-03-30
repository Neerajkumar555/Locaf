function getUsername() {
    firebase.auth().onAuthStateChanged(function (users) {
        if (users) {
            // User is signed in.
            
            console.log(users.uid);
            db.collection("users").doc(users.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().name;
                    console.log(n);
										
                    $("#username").text(n);
										
                    //document.getElementById("username").innerText = n;
                })
        } else {
            // No user is signed in.
        }
    });
}
getUsername();

function getEmail() {
    firebase.auth().onAuthStateChanged(function (users) {
        if (users) {
            // User is signed in.
            
            console.log(users.uid);
            db.collection("users").doc(users.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().email;
                    console.log(n);
										
                    $("#email").text(n);
										
                    
                })
        } else {
            // No user is signed in.
        }
    });
}
getEmail();





