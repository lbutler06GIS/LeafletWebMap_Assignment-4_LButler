var map = L.map('combinedmap').setView([38, -95], 4);
var basemapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var basemap = L.tileLayer(basemapUrl, {attribution: '&copy; <a href="http://' + 'www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);



//Earthquake layer - because I want to toggle between weather and earthquakes in a checkbox
    //from earthquake.js
    // I edited the code from 'create earthquakes and put them on the map => L.geoJSON(data, {...}) to 
    //create earthquakes and store them in a group/place/box called earthquakes => var earthquakes and then put them on the map => L.geoJSON(data, {...})
    
    var earthquakes = L.layerGroup()
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
            var time = new Date(feature.properties.time).toLocaleString();
            layer.bindPopup('magnitude: ' + magnitude + '<br>Location: ' + location + '<br>Time: ' + time);
        }

    }).addTo(earthquakes);
    });
    earthquakes.addTo(map);






    //Weather layer 
        //codes from weather.js
        //similar idea to my earthquake layer; I want to be able to turn them on and off. 
        //so I'm going to put them in their own place/box/group too.
        
        //Radar code section
        var weather = L.layerGroup();
        var radarUrl = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi';
        var radarDisplayOptions = {
                layers: 'nexrad-n0r-900913',
                format: 'image/png',
                transparent: true
        };
         var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTo(weather);

        //Alerts code section
        var weatherAlertsUrl = 'https://api.weather.gov/alerts/active?region_type=land';
        $.getJSON(weatherAlertsUrl, function(data) {
            //L.geoJSON(data).addTo(map);
            L.geoJSON(data, {
                style: function(feature){
                    var alertColor = 'orange';
                    if (feature.properties.severity === 'Severe') alertColor = 'red';
                    if (feature.properties.severity === 'Extreme') alertColor = 'purple';
                    if (feature.properties.severity === 'Minor') alertColor = '#e70c7a';
                    return { color: alertColor };
                },
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.headline);
                        
                    }
                
            }).addTo(weather);
            
        });
 weather.addTo(map);


 //Toggle Control using Leaflet <https://leafletjs.com/examples/layers-control/>

        var overlays = {
                "Weather": weather,
                "Earthquakes": earthquakes
        };
        L.control.layers(null, overlays, {collapsed: false}).addTo(map);

//Legend
            //copied code from earthquakes.js legend section
const legend = L.control({position: 'bottomright'});
        legend.onAdd = function(map) {
                const div = L.DomUtil.create('div', 'info legend');
                div.innerHTML += '<strong>Legend</strong><br>';
                div.innerHTML += '<br><strong>Earthquake Magnitude</strong><br>'
                const colors = ['green', 'yellow', 'orange', 'red'];
                const labels = ['Less than 2', '2-3.9', '4-5.9', '6+'];
                for (let i = 0; i < colors.length; i++) {

                    div.innerHTML += '<i style="background:' + colors[i] + '"></i> ' + labels[i] + '<br>';
                }

                //adding code for weather alerts in legend
                div.innerHTML += '<br><strong>Weather Alert Severity</strong><br>'
                div.innerHTML += '<i style="background:purple"></i> Extreme<br>';
                div.innerHTML += '<i style="background:red"></i> Severe<br>';
                div.innerHTML += '<i style="background:orange"></i> Moderate<br>';
                div.innerHTML += '<i style="background: #e70c7a"></i> Minor<br>';
                return div;
        };

        legend.addTo(map);