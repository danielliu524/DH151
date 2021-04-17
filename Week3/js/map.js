var map = L.map('map');
var hidden = false;
let data = [
    {
        "title": "Los Angeles",
        "lat": 34.0522,
        "lon": -118.2437,
        "description": "My first time living away from family for a long time for college.",
        "image": "https://www.ucla.edu/img/content-images/landing-photo-visit.jpg"
    },
    {
        "title": "Hong Kong",
        "lat": 22.3193,
        "lon": 114.1694,
        "description": "The place I was born and grew up in.",
        "image": "https://static01.nyt.com/images/2020/06/03/world/03hongkong-damages-1/03hongkong-damages-1-mediumSquareAt3X.jpg"

    },
    {
        "title": "Tokyo",
        "lat": 35.6762,
        "lon": 139.6503,
        "description": "My favorite city other than HK. Travelled here 3 times. Also where my parents met each other.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg"
    },
    {
        "title": "Washington, D.C.",
        "lat": 38.9072,
        "lon": -77.0369,
        "description": "The first place I visited in the US that led me to apply for US colleges.",
        "image": "https://research.euro.savills.co.uk/_images/washington-dc12345.jpg"
    },
    {
        "title": "Beijing",
        "lat": 39.9042,
        "lon": 116.4074,
        "description": "Where my grandparents used to live. Great memories of celebrating Chinese New Year here as a kid.",
        "image": "https://www.malaysiachinainsight.com/wp-content/uploads/2021/01/beijing.jpg"
    },
]


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let myMarkers = L.featureGroup()

data.forEach(function(item, index) {
    let marker = L.marker([item.lat, item.lon])
    .bindPopup(`<h2>${item.title}</h2><p>${item.description}</p><div class="image-box"><img src=${item.image} width="300" height="300"></div>`);
    $(".sidebar").append(`<div class="sidebar-item" onclick="flyToIndex(${index})">${item.title}</div>`)
    myMarkers.addLayer(marker)
});

myMarkers.addTo(map)

let layers = {
    "Important Places": myMarkers
}

//Add layer control box
L.control.layers(null, layers).addTo(map)

map.fitBounds(myMarkers.getBounds());

function flyToIndex(index) {
    map.flyTo([data[index].lat+0.01, data[index].lon], 12)
    myMarkers.getLayers()[index].openPopup()
}

function showHideSidebar() {
    if(hidden) {
        document.body.style.gridTemplateColumns = "250px 1fr";
    }
    else {
        document.body.style.gridTemplateColumns = "0px 1fr";
    }
    hidden = !hidden
}