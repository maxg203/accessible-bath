$(function() {
	// Initialise the map and set default values
	var mapleMap = L.map('mapleMap').setView([51.379597, -2.358244], 14);

	L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{id}/{z}/{x}/{y}?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: 18,
			id: '256',
			accessToken: 'pk.eyJ1IjoibWF4ZzIwMyIsImEiOiJjaXRhMnM1dncwMDU5MnhwaGxzenV1M3ExIn0.dHwySLGJmJairTuzOSn49Q'
	}).addTo(mapleMap);

	var markers = [];

	$.get(
			"https://raw.githubusercontent.com/BathHacked/banes-geographic-data/master/bh_accessible_bath.geojson",
			function(data) {
			  var usableData = $.parseJSON(data);
				for (i = 0; i < usableData['features'].length; i++) {
          console.log(usableData['features'][i]['geometry']['coordinates']);
				  var location = usableData['features'][i];
				  var coords = [location['geometry']['coordinates'][1], location['geometry']['coordinates'][0]];

          var marker = {
            marker: new L.marker(coords),
            data: usableData['features'][i]['properties']
          }
          markers.push(marker);


          marker.marker.bindPopup(marker.data.name + '<br>' + marker.data.wheelchair).addTo(mapleMap);
				  var wheelchairFriendly = location['properties']['wheelchair'];
        }
			}
	);

});
