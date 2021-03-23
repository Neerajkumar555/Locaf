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


function citiesQuery(){
    db.collection("cities")
    .where("population", ">", 1000000)
    //.where("hemisphere", "==", "south")
    //.limit(2)
    //.orderBy("population")
    //.orderBy("population", "desc")
    .get()
    .then(function(snap){
        snap.forEach(function(doc){
            var n = doc.data().name;
            var pop = doc.data().population;
            console.log(n);
            var newdom = "<p> " + n + " " + pop + "</p>";
            $("#cities-go-here").append(newdom);
            //document.getElementById("cities-go-here").innerHTML = newdom;
        })
    })
}