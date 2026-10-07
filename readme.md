# Assignment 4 - Leaflet Web Maps
## Laura Butler

This assignment uses Leaflet to create web maps using real-time data.
The weather map began with the instructor walkthrough and was modified for the assignment. 
The earthquake map was created using USGS earthquake data and Leaflet tutorial documentation. 


Maps created for the assignment.

1. Map showing real-time weather radar and alerts from the National Weather Service.
<https://lbutler06gis.github.io/LeafletWebMap_Assignment-4_LButler/Weather/>

2. Map showing earthquake data and seismic risk pattern.
<https://lbutler06gis.github.io/LeafletWebMap_Assignment-4_LButler/Earthquake/>

3. Combined map showing earthquake and weather data. Includes updated legend and toggle
    environment to switch between the two.
<https://lbutler06gis.github.io/LeafletWebMap_Assignment-4_LButler/Combined/>

Section 1 = Weather map built following the instructor's demonstration.

            The weather map was created while following the instructor
            walkthrough. During the walkthrough, I created weather.html and weather.js, 
            HTML and JavaScript files. The map uses Leaflet with an OpenStreeMap basemap, 
            real-time weather radar, and active weather alerts from the National Weather Service.

Section 2 = Modifications to the weather map, per assignment instructions, to include
            additional severity colors and a different basemap. (on my own) 

            I used the weather map created during the instructor walktrhough as the starting point
            for this section of the assignment. I added colors for Extreme and Minor weather
            alert severity levels and changed the basemap.          

Section 3 = Earthquake map to include markers that show magnitude and location
            as well as a popup to display magnitude, location, date/time. (on my own)

            I created a separate Leaflet map using the USGS real-time earthquake GeoJSON feed.
            Earthquakes are displayed as circle markers and styled by magnitude using
            different colors and sizes. Each marker has a popup showing the earthquake magnitude,
            location, and time. I also created a legend showing the magnitude categroies used
            on the map. 

            The USGS GeoJSON feed provides the earthquake time as a numeric timestamp. When I
            initially added the time property to the popup, the result was not a readable date 
            and time. After researching the USGS GeoJSON format, I found that the time value
            is provided in milliseconds. I went to W3 Schools site and searched JS date methods.
            I liked the way toLocaleString() converted the time the best, so i used it to convert 
            the timestamp into a readable date and time. 

### Resources used for Section 3

- USGS GeoJSON Summary Format
    <https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php>
    Used to understand the earthquake GeoJSON properties, including magnitude, place, and time.

- Leaflet - Using GeoJSON with Leaflet
    <https://leafletjs.com/examples/geojson/>
    Used to research pointToLayer, circle markers, onEachFeature, and adding information from
    GeoJSON properties to popups.

- Leaflet - Interactive Choropleth Map
    <https://leafletjs.com/examples/choropleth/>
    Used as an example for creating the earthquake magnitude legend. The legend code was
    modified to use my earthquake magnitude categories and colors. 
    
- W3 Schools - CSS display: inline-block
    <https://www.w3schools.com/css/css_inline-block.asp>
    I also changed the legend symbol display from float:left to display:inline-block sot the 
    colored symbols aligned correctly with their labels. I researched alternatives to 
    float:left in W3 Schools and that led me to the inline-block, which gratefully worked. 

- W3 Schools - JavaScript Dates
    <https://www.w3schools.com/js/js_dates.asp>
    Used to research converting the USGS earthquake timestamp into a readable date and time for the
    popup.


Section 4 = Weather and Earthquake combination map for assignment bonus points. (on my own)

    I combined the weather and earthquake codes written for their individual maps into one Leaflet 
    map. I used layer groups to organize the weather radar and alerts into a weather layer and the 
    USGS earthquake data into an earthquakes layer. I added a Leaflet layer control so the user can 
    turn either layer on or off. I set the layer control to remain expanded so the available choices 
    are visible instead of only displaying the layer icon.

    I also combined the earthquake magnitude and weather alert severity information into one legend. 
    The legend shows the earthquake magnitude categories and their marker colors, as well as, the 
    weather alert severity levels and their colors. 

    While creating the layer control, I had to change how the earthquake GeoJSON was stored. The 
    earthquake group was originially created to live inside getJSON function, but that meant I could
    not access it outside of that group. So, I made a new group that lives outside of that group,
    but holds all that information. This way, I could access it all as a whole to... turn on and off.
    I feel as though I'm really getting the hang of making groups and understanding how they function. 

    I used that same concept and applied it to the weather alerts/radar group so that I could turn
    that information group on and off as well. 

    ### Resources used for Section 4

    - Leaflet - Layer Groups and Layers Control
        <https://leafletjs.com/examples/layers-control/>
        Used to research layer groups and the Leaflet layer control for turning the weather and 
        earthquake layers on and off. 