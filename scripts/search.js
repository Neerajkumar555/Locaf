//
//submitMyLocation();
//function mylocation(){
//    firebase.auth().onAuthStateChanged(function(locations){
//        if(locations){
//           console.log(locations.uid);
//           db.collection("locations")
//           .doc(locations.uid)
//           .get()
//           .then(function(doc){
//               console.log(doc.data().address);
//               var n = doc.data().adress;
//               $("#my-address").text(n);
//           })
//        }
//    })
//}
//submitMyLocation(); 
//
// try this ..

function getlocation(){
    db.collection("locations")
    .get()
    .then(function(snap){
        snap.forEach(function(doc){
            var n = doc.data().name;
            var add = doc.data().address;
            console.log(n);
            var text = document.createElement("p");
            text.innerHTML = (n + " " + add);
            $("#my-address").append(text);
        })
    })
}
getlocation();
