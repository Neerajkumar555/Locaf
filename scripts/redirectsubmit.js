

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