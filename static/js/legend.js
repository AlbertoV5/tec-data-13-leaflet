// LEGEND
// These functions create a legend for the map
let legend = L.control({
    position: "bottomright"
});
legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
    ];
    for (var i = 0; i < magnitudes.length; i++) {
        let val = (magnitudes[i + 1] ? `&ndash; ${magnitudes[i + 1]} <br>` : "+");
        div.innerHTML += `<i style='background: ${colors[i]}'></i>${magnitudes[i]} ${val}`;
    }
    return div;
};
legend.addTo(map);