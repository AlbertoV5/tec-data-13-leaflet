function createBaseMaps(){
    var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });
    var dark = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/dark-v10",
        accessToken: API_KEY
    });
    return {
        Light: light,
        Dark: dark
    };
}
let coords = [30, 30];
let baseMaps = createBaseMaps();
let map = L.map('mapid', {
    center: [40.7, -94.5],
    zoom: 4,
    layers: [baseMaps.Light]
});
L.control.layers(baseMaps).addTo(map);
// JSON
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