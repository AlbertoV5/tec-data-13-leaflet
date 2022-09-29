function createBaseMaps(){
    var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/satellite-v9",
        accessToken: API_KEY
    });
    var dark = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });
    return {
        Light: light,
        Dark: dark
    };
}
let coords = [43.7, -79.3]
let baseMaps = createBaseMaps();
let map = L.map('mapid', {
    center: coords,
    zoom: 11,
    layers: [baseMaps.Dark]
});
L.control.layers(baseMaps).addTo(map);
// JSON
d3.json("./static/js/torontoNeighborhoods.json").then((data) => {
    let style = {
        weight: 1,
        color: "blue",
        fillColor: "yellow",
        fillOpacity: 0.2
    }
    L.geoJSON(data, {
        style: style,
        onEachFeature: (feature, layer) => {
            layer.bindPopup(
                `<h3>Hood: ${feature.properties.AREA_NAME}</h3>
                <hr>
                <b>(${feature.properties.AREA_S_CD})`
            )
        }
    }).addTo(map);
})