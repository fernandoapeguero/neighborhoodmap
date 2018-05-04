// google map or the page
let map;

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.866169,
            lng: -73.863622
        },
        zoom: 15
    })



    let locations = [{
            title: "Riverside Park",
            location: {
                lat: 40.867153,
                lng: -73.871381
            }
        },
        {
            title: "la marina",
            location: {
                lat: 40.868745,
                lng: -73.931965
            }
        }
    ];

    let markers = [];
    let informationWindow = new google.maps.InfoWindow();
    let bounds = new google.maps.LatLngBounds();

    for(let i = 0; i < locations.length; i++){

        const position = locations[i].location;
        const name = locations[i].title;
        var marker = new google.maps.Marker({
           position: position,
           title: name ,
           map: map,
          animation: google.maps.Animation.DROP,
          id: i
        });

        markers.push(marker);
       bounds.extend(marker.position);
        marker.addListener('click' , function(){
             populationWindow(this , informationWindow);
        });

        map.fitBounds(bounds);

    }




    function populationWindow(marker , infoWin){

        if(infoWin != marker){
            infoWin.marker = marker;
            infoWin.setContent(`<div> ${marker.title} </div>`);
            infoWin.open(map, marker);

            infoWin.addListener('closeclick' , function(){
                infoWin.setMarker(null);
            });
        }
    }

}