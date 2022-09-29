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