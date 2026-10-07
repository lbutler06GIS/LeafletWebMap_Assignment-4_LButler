var map = L.map('earthquakemap').setView([38, -95], 4);
var basemapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var basemap = L.tileLayer(basemapUrl, {attribution: '&copy; <a href="http://' + 'www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);


//USGS Earthquake data provided in Assignment documentation - adds earthquake location
var usgsEarthquakeData = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
    $.getJSON(usgsEarthquakeData, function(data) {
        L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            //magnitude was from the usgs provided link and that doc is broken into the individual details for each earthquake
            var magnitude = feature.properties.mag;
            var markerColor = 'green';
            if (magnitude >=2) markerColor = 'yellow';
            if (magnitude >=4) markerColor = 'orange';
            if (magnitude >=6) markerColor = 'red';
            return L.circleMarker(latlng, {
                radius: magnitude * 3,
                color: markerColor
        });
    },
        //next code line is for the popup requirement - code copied and some edited from instructor provided to include different information
        onEachFeature: function(feature, layer) {
            var magnitude = feature.properties.mag;
            var location = feature.properties.place;
            var time = feature.properties.time;
            layer.bindPopup('magnitude: " + magnitude);
        }

    }).addTo(map);
    });
