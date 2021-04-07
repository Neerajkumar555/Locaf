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

function getNumber() {
    firebase.auth().onAuthStateChanged(function (users) {
        if (users) {
            // User is signed in.
            
            console.log(users.uid);
            db.collection("users").doc(users.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().number;
                    console.log(n);
										
                    $("#number").text(n);
										
                    
                })
        } else {
            // No user is signed in.
        }
    });
}
getNumber();

function getdesc() {
    firebase.auth().onAuthStateChanged(function (users) {
        if (users) {
            // User is signed in.
            
            console.log(users.uid);
            db.collection("users").doc(users.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().description;
                    console.log(n);
										
                    $("#desciption").text(n);
										
                    
                })
        } else {
            // No user is signed in.
        }
    });
}
getdesc();

function getaddress() {
    firebase.auth().onAuthStateChanged(function (users) {
        if (users) {
            // User is signed in.
            
            console.log(users.uid);
            db.collection("users").doc(users.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().address;
                    console.log(n);
										
                    $("#address").text(n);
										
                    
                })
        } else {
            // No user is signed in.
        }
    });
}
getaddress();



function getnickname() {
    firebase.auth().onAuthStateChanged(function (users) {
        if (users) {
            // User is signed in.
            
            console.log(users.uid);
            db.collection("users").doc(users.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().nickname;
                    console.log(n);
										
                    $("#nickname").text(n);
										
                    
                })
        } else {
            // No user is signed in.
        }
    });
}

getnickname();

function uploadUserProfilePic() {
    

    firebase.auth().onAuthStateChanged(function (users) {
        var fileInput = document.getElementById("mypic-input");   
        const image = document.getElementById("mypic-goes-here"); 

        
        fileInput.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var blob = URL.createObjectURL(file);
            image.src = blob;           

            
            var storageRef = storage.ref("images/" + users.uid + ".jpg"); 
            
            
            storageRef.put(file) 
                .then(function(){
                    console.log('Uploaded to Cloud Storage.');
                })

						
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



function displayUserProfilePic() {
    console.log("hi");
    firebase.auth().onAuthStateChanged(function (users) {     
        db.collection("users").doc(users.uid)                 
            .get()                                           
            .then(function (doc) {
                var picUrl = doc.data().profilePic;         

								$("#mypic-goes-here").attr("src", picUrl);
            })
    })
}



