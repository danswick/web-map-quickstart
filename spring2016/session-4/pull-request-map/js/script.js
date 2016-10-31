function mapFunctions() {

var pointFun;
var myGeoJson = [];
// for all in sheet array, do some stuff
for ( var i = 0; i < locations.length; i++) {
	// create a new object 
	var pointFun = 
		{
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [locations[i][1][0], locations[i][1][1]]
            },
            "properties": {
              "name": locations[i][0]
            }
        }

	// push to sheetGeoJson array
	myGeoJson.push(pointFun);
}

// Add empty feature layer to prepare for custom markers
L.mapbox.accessToken = "pk.eyJ1IjoiZGFuc3dpY2siLCJhIjoiY2l1dTUzcmgxMDJ0djJ0b2VhY2sxNXBiMyJ9.25Qs4HNEkHubd4_Awbd8Og";
var map = L.mapbox.map('map', 'mapbox.outdoors');

var pointLayer = L.mapbox.featureLayer().addTo(map);

// Add custom popups to each point
pointLayer.on('layeradd', function(e) {
	var marker = e.layer,
		feature = marker.feature;

	// Create custom popup content
	var popupContent = '<h3>' + feature.properties.name + '</h3>';


	// bind popup to markers
	marker.bindPopup(popupContent, {
		closeButton: false,
		minWidth: 450
	});
});

// Add features to the map
pointLayer.setGeoJSON(myGeoJson);
map.fitBounds(pointLayer.getBounds());

}

mapFunctions();
