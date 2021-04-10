// grabs and displays all user info
function getUserInfo() {
    firebase.auth().onAuthStateChanged(function (users) {
        if (users) {
            //console.log(users.uid);
            db.collection("users").doc(users.uid)
                .get()
                .then(function (doc) {
                    // grabs data from user doc
                    var name = doc.data().name;
                    var desc = doc.data().description;
                    var mail = doc.data().email;
                    var numb = doc.data().number;
                    var add = doc.data().address;
                    var nick = doc.data().nickname;
                    
                    // displays grabbed data onto page
                    $("#username").val(name).text(name);
                    $("#description").val(desc).text(desc);
                    $("#email").val(mail).text(mail);
                    $("#number").val(numb).text(numb);
                    $("#address").val(add).text(add);
                    $("#nickname").val(nick).text(nick);
                })
        } else {
            
            // No user is signed in.
        }
    });
}
getUserInfo();

// function getEmail() {
//     firebase.auth().onAuthStateChanged(function (users) {
//         if (users) {
            
//             console.log(users.uid);
//             db.collection("users").doc(users.uid)
//                 .get()
//                 .then(function (doc) {
//                     var n = doc.data().email;
//                     console.log(n);
										
//                     // displays the e-mail of the user on their profile
//                     $("#email").text(n);
										
                    
//                 })
//         } else {
//             // No user is signed in.
//         }
//     });
// }
// getEmail();

// function getNumber() {
//     firebase.auth().onAuthStateChanged(function (users) {
//         if (users) {
//             // User is signed in.
            
//             console.log(users.uid);
//             db.collection("users").doc(users.uid)
//                 .get()
//                 .then(function (doc) {
//                     var n = doc.data().number;
//                     console.log(n);
										
//                     $("#number").text(n);
										
                    
//                 })
//         } else {
//             // No user is signed in.
//         }
//     });
// }
// getNumber();

// function getdesc() {
//     firebase.auth().onAuthStateChanged(function (users) {
//         if (users) {
//             // User is signed in.
            
//             console.log(users.uid);
//             db.collection("users").doc(users.uid)
//                 .get()
//                 .then(function (doc) {
//                     var n = doc.data().description;
//                     console.log(n);
										
//                     $("#desciption").text(n);
										
                    
//                 })
//         } else {
//             // No user is signed in.
//         }
//     });
// }
// getdesc();

// function getaddress() {
//     firebase.auth().onAuthStateChanged(function (users) {
//         if (users) {
//             // User is signed in.
            
//             console.log(users.uid);
//             db.collection("users").doc(users.uid)
//                 .get()
//                 .then(function (doc) {
//                     var n = doc.data().address;
//                     console.log(n);
										
//                     $("#address").text(n);
										
                    
//                 })
//         } else {
//             // No user is signed in.
//         }
//     });
// }
// getaddress();



// function getnickname() {
//     firebase.auth().onAuthStateChanged(function (users) {
//         if (users) {
//             // User is signed in.
            
//             console.log(users.uid);
//             db.collection("users").doc(users.uid)
//                 .get()
//                 .then(function (doc) {
//                     var n = doc.data().nickname;
//                     console.log(n);
										
//                     $("#nickname").text(n);
										
                    
//                 })
//         } else {
//             // No user is signed in.
//         }
//     });
// }

// getnickname();

// uploads the user profile picture into the database and connects to their account
function uploadUserProfilePic() {
    
    firebase.auth().onAuthStateChanged(function (users) {
        var fileInput = document.getElementById("mypic-input");   
        const image = document.getElementById("mypic-goes-here"); 

        
        fileInput.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var blob = URL.createObjectURL(file);
            image.src = blob;           

            var storageRef = storage.ref("images/" + users.uid + ".jpg"); 
            
            // puts the file into the firestore database
            storageRef.put(file) 
                .then(function(){
                    console.log('Uploaded to Cloud Storage.');
                })

			// gets the image's firestore url and assigns it to the user
            storageRef.getDownloadURL()
                .then(function (url) {   
                    console.log(url);    
                    db.collection("users").doc(users.uid).update({
                        "profilePic": url
                    })
                    .then(function(){
                        console.log('Added Profile Pic URL to Firestore.');
                    })
                })
        })
    })
}
//uploadUserProfilePic();


// displays the user profile picture onto the page
function displayUserProfilePic() {
    firebase.auth().onAuthStateChanged(function (users) {     

        // grabs the photo from the user's document
        db.collection("users").doc(users.uid)                 
            .get()                                           
            .then(function (doc) {
                var picUrl = doc.data().profilePic;         

                // places the grabbed image into the document
				$("#mypic-goes-here").attr("src", picUrl);
            })
    })
}
//displayUserProfilePic();


// grabs the reviews associated with the user from the database and loads them onto the page
function loadReviews() {

    firebase.auth().onAuthStateChanged(function (user) {   

    db.collection("users").doc(user.uid).collection("reviews")
        .get()
        .then(function (snap) {
            $("#review-content").append('<div class="row card" id="reviewgrid"></div>');  

            // places each review in a stylized card
            snap.forEach(function (doc) {
                var name = doc.data().postedby;
                var rating = doc.data().reviewrating;
                var text = doc.data().reviewdetails;

                var review = '<div class="col card-body"><p>';
                review += "<b>Posted by</b>: " + name + "<br>";
                review += text + "<br>";
                review += "<b>Rating</b>: " + rating + "</div>";

                $("#reviewgrid").append(review);
            })
        })
    })
}
loadReviews();




var str = document.getElementById("address").value;