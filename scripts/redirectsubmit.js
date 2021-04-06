<<<<<<< HEAD
=======


>>>>>>> 25c0a2d48ccb8df07426dd8c53a8d365e16bb02f
function redirect() {
    var url = window.location.search;
    if (url == "?location") {
        setTimeout(function() {
            window.location.href = "main.html";
        }, 1000)
    } else if (url == "?review") {
        setTimeout(function() {
            window.location.href = "location.html?";
        }, 1000)
    }

}
redirect();