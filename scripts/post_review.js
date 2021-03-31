function postreview() {
    document.getElementById('post').addEventListener('click', function () {
        var rating;
        var text = document.getElementById('writereview').value;
        var star5 = document.getElementById('star-5').checked;
        var star4 = document.getElementById('star-4').checked;
        var star3 = document.getElementById('star-3').checked;
        var star2 = document.getElementById('star-2').checked;
        var star1 = document.getElementById('star-1').checked;
        console.log(text);
      if (star5){
          rating = 5;
      }else if(star4){
        rating = 5;
      }else if(star3){
          rating =3
      } else if(star2){
        rating =2
      } else{
          rating =1;
      }
      console.log(rating);
    })

    var name = getUsername();
    var locationRef = db.collection('locations');
    var reviewref = locationRef.doc().collection('reviews');
    
}


//         var locationRef = db.collection('locations');
//         locationRef.add({
//             name: xname,
//             address: xaddress,
//             description: xdescription
//         }).then(function(docRef) {
//             var id = docRef.id;
//             var locationPref = locationRef.doc(id).collection('preferences');
//             for(i = 0; i < pref.length; i++) {
//                 if (pref[i] !== true) {
//                     pref[i] = 1;
//                 } else {
//                     pref[i] = 0;
//                 }
//             }
//             locationPref.add({
//                 quiet: pref[0],
//                 lively: pref[1],
//                 washroom: pref[2],
//                 fooddrink: pref[3],
//                 lotraffic: pref[4]
//             })
//         })
//         setTimeout(function () {
//             window.location.assign("submitted.html"); //re-direct to main.html after signup
//         }, 1000);
//     })
// }
function getUsername() {
    firebase.auth().onAuthStateChanged(function (users) {
        if (users) {
            // User is signed in.
            
            console.log(users.uid);
            db.collection("users").doc(users.uid)
                .get()
                .then(function (doc) {
                    var name = doc.data().name;
                    return name;
                    console.log(name);
                   
                })
        } else {
            return null;
        }
    });
}

postreview();
