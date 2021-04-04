const locaID = getId();

// Dependent on getting document info from results page
function getId() {
    var id = JSON.parse(localStorage.getItem('locationid')).id;    
    console.log(id);
    return id;
}

function redirect() {
    var url = window.location.search;
    if (url == "?location") {
        setTimeout(function() {
            window.location.href = "main.html";
        }, 1000)
    } else if (url == "?review") {
        setTimeout(function() {
            window.location.href = "location.html?" + locaID;
        }, 1000)
    }

}
redirect();