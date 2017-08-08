var findIntersections = require('../../index.js');

var osm = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        maxZoom: 22,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    point = L.latLng([55.753210, 37.621766]),
    map = new L.Map('map', {layers: [osm], center: point, zoom: 12, maxZoom: 22}),
    root = document.getElementById('content');

var bounds = map.getBounds(),
    n = bounds._northEast.lat,
    e = bounds._northEast.lng,
    s = bounds._southWest.lat,
    w = bounds._southWest.lng,
    height = n - s,
    width = e - w,
    qHeight = height / 4,
    qWidth = width / 4,
    lines = [];

var points = turf.random('points', 10, {
    bbox: [w + qWidth, s + qHeight, e - qWidth, n - qHeight]
});

var coords = points.features.map(function(feature) {
    return feature.geometry.coordinates;
})

for (var i = 0; i < coords.length; i+=2) {
    lines.push([coords[i], coords[i+1]]);

    var begin = [coords[i][1], coords[i][0]],
        end = [coords[i+1][1], coords[i+1][0]];

    L.circleMarker(L.latLng(begin), {radius: 2, fillColor: "#FFFF00", weight: 2}).addTo(map);
    L.circleMarker(L.latLng(end), {radius: 2, fillColor: "#FFFF00", weight: 2}).addTo(map);
    L.polyline([begin, end], {weight: 1}).addTo(map);
}

findIntersections(lines, map);
window.map = map;
