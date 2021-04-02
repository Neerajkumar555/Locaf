var searchinput = document.getElementById('searchbar');
var searchbutt = document.getElementById('searchbutt');

function showMyRestaurants() {
    firebase.auth().onAuthStateChanged(function (user) {

        searchbutt.addEventListener('click', function () {
            var input = searchinput.value.toLowerCase();
            var quiet = Number(document.getElementById('btncheck1').value);
            var wifi = Number(document.getElementById('btncheck2').value);
            var coffee = Number(document.getElementById('btncheck3').value);
            var food = Number(document.getElementById('btncheck4').value);

            db.collection('locations').get()
                .then(function (search) {
                    search.forEach(function (doc) {
                        x(doc);
                        if (input == doc.data().name) {
                            var name = doc.data().name;
                            var address = doc.data().address;
                            var description = doc.data().description;
                            var id = doc.id;

                            var newLocation = $('<p id="' + id + '">' + name + address + description + '</p>')

                            $('#results').append(newLocation);
                        }
                        // else (if (quiet == doc.data().collection('preferences').doc.data().get()) {
                        // }
                    })
                })
        })
    })
}
showMyRestaurants();

function x(y) {
    y.data().preferences.get()
    .then((aaa) => {
        console.log(aaa.fooddrink);
    })
    console.log(hello);
}
