function sayHello() {
    firebase.auth().onAuthStateChanged(function (users) {
        if (users) {
            // User is signed in.
            // Do something for the user here. 
            console.log(users.uid);
            db.collection("users").doc(users.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().name;
                    console.log(n);
										//using jquery
                    $("#username").text(n);
										//using vanilla javascript
                    //document.getElementById("username").innerText = n;
                })
        } else {
            // No user is signed in.
        }
    });
}
sayHello();


