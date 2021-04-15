// redirects the user to the search page and appends input to URL to be used
function mainSearch() {
    let searchbutt = document.getElementById("searchbutt");
    let userinput = document.getElementById("userinput");

    searchbutt.addEventListener('click', function(e) {

        e.preventDefault();

        // the input to be used on the search page
        var transfer = userinput.value;
        window.location.href = "../location/search2.html?" + transfer;

    })

}
mainSearch();


// makes all quick-search buttons clickable and redirect to their location
function quickSearch() {
    var quickbutt = document.getElementsByClassName("card-inner");

    var redirect = function() {
        let check = this.getAttribute("id");
        
        window.location.href = "../location/search2.html?" + check;
    };
    
    for (var i = 0; i < quickbutt.length; i++) {
        quickbutt[i].addEventListener('click', redirect);
    }
    
}
quickSearch();

