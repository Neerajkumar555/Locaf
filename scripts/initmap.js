
// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = {
        lat: 49.25076313248947,
        lng: -123.0017895306895
    };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
}
initMap();
