//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;

//ICH code for popup template if needed----------
var ich = require("icanhaz");
var templateFile = require("./_popup.html");
ich.addTemplate("popup", templateFile);

// var onEachFeature = function(feature, layer) {
//   layer.bindPopup(ich.popup(feature.properties))
// };

var onEachFeature = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))
};

var data = require("./dog-parks.geo.json");

function geojsonMarkerOptions(feature) {
  console.log(feature.properties)

  return {
    radius: 7,
    // fillColor: getColor(feature.properties.type),
    fillColor: "#22a85e",
    color: "#000000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6
  }
};

var geojson = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
    },
    style: geojsonMarkerOptions,
    onEachFeature: onEachFeature
}).addTo(map);


var onEachFeature = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))
};

 map.scrollWheelZoom.disable();

 map.fitBounds(geojson.getBounds());
