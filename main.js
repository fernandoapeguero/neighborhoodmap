

// google map or the page
let map;

function initMap(){

    map = new google.maps.Map(document.getElementById('map'),{
        center:{lat:40.866169 , lng: -73.863622},
        zoom: 15
    })
}


    let locations = [
        {}
    ]