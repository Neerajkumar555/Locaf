<<<<<<< HEAD
=======


>>>>>>> 6be944df8a4b77521eb2dd5cbf019b7ddcbede54
function redirect() {
    var url = window.location.search;
    if (url == "?location") {
        setTimeout(function() {
            window.location.href = "main.html";
        }, 1000)
    } else if (url == "?review") {
<<<<<<< HEAD
=======

>>>>>>> 6be944df8a4b77521eb2dd5cbf019b7ddcbede54
        setTimeout(function() {
            window.location.href = "location.html?";
        }, 1000)
    }

}
redirect();