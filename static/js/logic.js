function createBaseMaps(){
    var streets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });
    var satellites = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/satellite-v9",
        accessToken: API_KEY
    });
    return {
        Streets: streets,
        Satellites: satellites
    };
}
let coords = [39.5, -98.5];
let baseMaps = createBaseMaps();
let earthquakes = new L.layerGroup();
let overlays = {
    Earthquakes: earthquakes
};
let map = L.map('mapid', {
    center: coords,
    zoom: 3,
    layers: [baseMaps.Streets]
});
L.control.layers(baseMaps, overlays).addTo(map);
// JSON
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
}
function getColor(magnitude){
    if (magnitude > 5) {
        return "#ea2c2c";
    }
    else if (magnitude > 4) {
        return "#ea822c";
    }
    else if (magnitude > 3) {
        return "#ee9c00";
    }
    else if (magnitude > 2) {
        return "#eecc00";
    }
    else if (magnitude > 1) {
        return "#d4ee00";
    }
        return "#98ee00";
}
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
}
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(url).then((data) => {
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: (feature, layer) => {
            layer.bindPopup(
                `<h3>Magnitude: ${feature.properties.mag}</h3>
                <hr>
                <b>Location:</b> ${feature.properties.place}`
            )
        }
    }).addTo(earthquakes);
    earthquakes.addTo(map);
})