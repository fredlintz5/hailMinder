var map;
var service;
var infowindow;

function getLocation(cb) {
  if ( navigator.geolocation ) {
    navigator.geolocation.getCurrentPosition(function(coords) {
      console.log('fired');
      cb(coords.latitude, coords.longitude);
    })
  }
}

function initialize() {
  getLocation(function(lat, long) {
    var pyrmont = new google.maps.LatLng(lat, long);
    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
        zoom: 15
     });

    var request = {
      location: pyrmont,
      radius: '500',
      type: ['parking']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  });
  
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log(results);
    // for (var i = 0; i < results.length; i++) {
    //   var place = results[i];
    //   createMarker(results[i]);
    // }
  }
}

initialize();