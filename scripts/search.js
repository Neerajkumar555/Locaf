
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