var map = L.map('weathermap').setView([38, -95], 4);
var basemapUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}';
var basemap =  L.tileLayer(basemapUrl, {attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service', maxZoom: 8}).addTo(map);


//add the national precipitation radar layer
var radarUrl = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi';
var radarDisplayOptions = {
  layers: 'nexrad-n0r-900913',
  format: 'image/png',
  transparent: true
};
var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTo(map);

//add alerts layer
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
          
      }).addTo(map);
      
});

