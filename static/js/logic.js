function createMap(mapID, coords, zoom){
    return L.map(mapID).setView(coords, zoom);
}
function addTile(map, styleID){
    return L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: styleID,
        accessToken: API_KEY
    }).addTo(map);
}
function addMarker(map, coords){
    return L.marker(coords).addTo(map);
}
function addCircle(map, coords){
    // circleMarker adapts to zoom, circle doesn't
    return L.circleMarker(coords, {
        radius: 20,
        opacity: 0.8,
        fillOpacity: 0.3,
        color: "black",
        fillColor: "yellow"
    }).addTo(map);
}
function addLine(map){
    let line = [
        [33.9416, -118.4085],
        [37.6213, -122.3790],
        [40.7899, -111.9791],
        [47.4502, -122.3088]
      ];
    return L.polyline(line, {
        color: "black"
      }).addTo(map);
}

let coords = [30, 30]
let map = createMap('mapid', coords, 2);

addTile(map, "mapbox/streets-v11");
d3.json("./static/js/majorAirports.json").then((data) => {
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup(
                `<h2>Code: ${feature.properties.faa}</h2>
                <hr>
                <b>Name: ${feature.properties.name}</b>`);
        }
    }).addTo(map);
})