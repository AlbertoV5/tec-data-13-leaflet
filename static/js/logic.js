function createBaseMaps(){
    var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/navigation-day-v1",
        accessToken: API_KEY
    });
    var dark = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/navigation-night-v1",
        accessToken: API_KEY
    });
    return {
        Light: light,
        Dark: dark
    };
}
let coords = [44.0, -80.0]
let baseMaps = createBaseMaps();
let map = L.map('mapid', {
    center: coords,
    zoom: 4,
    layers: [baseMaps.Dark]
});
L.control.layers(baseMaps).addTo(map);
// JSON
d3.json("./static/js/torontoRoutes.json").then((data) => {
    let myStyle = {
        color: "#ffffa1",
        weight: 2
    }
    L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup(
                `<h2>Airline: ${feature.properties.airline}</h2>
                <hr>
                <b>Source: ${feature.properties.src}</b>.
                <b>Destination: ${feature.properties.dst}</b>`);
        }
    }).addTo(map);
})