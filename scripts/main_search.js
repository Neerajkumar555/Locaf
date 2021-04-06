
function mainSearch() {
    let searchbutt = document.getElementById("searchbutt");
    let userinput = document.getElementById("userinput");

    searchbutt.addEventListener('click', function(e) {

        e.preventDefault();

        var transfer = userinput.value;
        window.location.href = "Search.html?" + transfer;

    })
}
mainSearch();