// google map or the page
let map;
let markers = [];
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
        },
         {
           title: "central park",
           location:{
               lat:40.782471 ,
               lng: -73.966578
           }
        } ,
        {
            title: "Orchard Beach",
            location: {
                lat:40.867144 ,
                lng: -73.794647
            }
        } ,
        {
            title: "Micro Center",
            location: {
                lat:40.924946 ,
                lng: -73.856999
            }
        }  ,
        {
            title: "Times Square",
            location: {
                lat:40.758791 ,
                lng: -73.985143
            }
        } ,
        {
            title:"Sylvia's Restaurant of Harlem ",
            location: {
                lat:40.808666 ,
                lng: -73.944589
            }
        } ,
        {

            title: "Microsoft Technology Center ",
            location: {
                lat:40.756674 ,
                lng:-73.989900
            }
        } ,{
            title: "La Casa del Mofongo",
            location:{
                lat:40.850363 ,
                lng: -73.933332
            }
        } ,
        {
            title: "Spa Castle ",
             location:{
                 lat:40.787391 ,
                 lng:-73.836811
             }
        }
    ];

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
    let img ="";
        if(infoWin != marker){
            infoWin.marker = marker;

            fetch(`https://api.unsplash.com/search/photos/?page=1&query=${marker.title}`, {
                headers:{
                    Authorization:"Client-ID 1a7d8222a2209049809264d5565ed56e1d5f649ed37643fc42627ab799d2e03c"
                }
            }).then( data => data.json()).then( response => {
                console.log(response.results[0].urls.thumb);
                if(response.results.length > 0) {
                    img =  response.results[0].urls.thumb;


                }
                infoWin.setContent(`<div>
                <img src="${img}" >
             <h3>${marker.title}</h3> </div>`);
             infoWin.open(map, marker);

            });

            console.log(marker.title);


            infoWin.addListener('closeclick' , function(){
                infoWin.setMap(null);
            });
        }
    }

}
//open  menu function
const navigatorOpen = document.getElementById("navigation-open");
const container =  document.getElementById("container");
const closeButton = document.getElementById("close-sidemenu");


navigatorOpen.addEventListener('click' , function(){

       container.style.width = "250px";
       populateList();

})

 closeButton.addEventListener('click' , function(){
          container.style.width = "0"

 })

//list for the list view to get the  markes i have

const searchField = document.getElementById("search-field");

const filterButton = document.getElementById("filter-button");

let listView = document.getElementById("listview");

searchField.addEventListener("input" , function(){

            listView.innerHTML = markers.map(data => {
                return data.title.toLowerCase().includes(this.value.trim()) ? `<li>${data.title}</li>` : "";

            });

          if(this.value.length === 0 ){
              listView.innerHTML = "";
              markers.map(data => {
                return data.setMap(map);
            })
            populateList();
        }

});

filterButton.addEventListener('click', function(){

    markers.map(data => {
        return data.title.toLowerCase().includes(searchField.value) ? data.setMap(map)  : data.setMap(null);
    });

});

function populateList(){

        listView.innerHTML = markers.map(data => {
             return `<li>${data.title}</li>`
        });
}

