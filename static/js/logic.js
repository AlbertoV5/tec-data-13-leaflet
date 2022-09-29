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
let coords = [37.0902, -95.7129]
let map = createMap('mapid', coords, 4);
addTile(map, "mapbox/dark-v10");
addMarker(map, coords);
addCircle(map, coords);
cities.forEach((city) => {
    L.marker(city.location).addTo(map);
})