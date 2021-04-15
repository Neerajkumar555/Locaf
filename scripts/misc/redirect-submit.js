
// simply redirects the user to another page based on what page they came from
function redirect() {
    var url = window.location.search;

    // if the user came from the location/add-location page
    if (url == "?location") {

        // small time-out period to let the reader know their action was submitted
        setTimeout(function() {

            // redirects to main page
            window.location.href = "../misc/main.html";
        }, 1000)

    // if the user came from the submitreview page
    } else if (url == "?review") {
        setTimeout(function() {

            // redirects to previous location page
            window.location.href = "../location/location.html?";
        }, 1000)
    }
}
redirect();