var map = L.map('map').setView([26.9, 31.5], 6);
wax.tilejson('http://a.tiles.mapbox.com/v3/modilabs.map-p543gvbh.jsonp', function(tilejson) {
    map.addLayer(new wax.leaf.connector(tilejson));
});

var refresh = function() {
    queue()
    .defer(d3.json, "egypt.json")
    .defer(d3.csv, "http://bamboo.io/datasets/7fc17056847648fbb7050ebc2b975b62.csv")
    //.defer(d3.csv, "http://bamboo.io/datasets/12f4ad4ae051459b8d9ab9bac4e6e227.csv")
    //.defer(d3.csv, "http://bamboo.io/datasets/bcf1cd416a464bc893ac0e57c75bfade.csv")
    .await(ready);
};
refresh();

function getColor(d) {
    return d==null ? '#999' :
	d > 0.35 ? '#800026' :
        d > 0.3  ? '#BD0026' :
        d > 0.25  ? '#E31A1C' :
        d > 0.2 ? '#FC4E2A' :
        d > 0.15  ? '#FD8D3C' :
        d > 0.1  ? '#FEB24C' :
        d > 0.05   ? '#FED976' :
        '#FFEDA0';
}
var corrections = {
//    "Suhaj": "Souhag", "Al Isma`iliyah": "Al Ismailia", "Bani Suwayf": "Bani Swif", "Ash Sharqiyah": "Al Sharkia",
//	"Al Minufiyah": "Al Monofia", "As Suways": "Suez", "Al Jizah": "Giza", "Aswan": "Aswan", "Al Buhayrah": "Al Behira",
    "Al Buhayrah": "3", "Al Isma`iliyah": "7", "Al Minufiyah": "9", "Al Sharqiyah": "15", "Aswan": "16",
    "Bani Suwayf": "18", "Al Jizah": "8", "Suhaj": "26", "As Suways": "14"
};
function styleGen(feature) {
    //var data = dataById[corrections[feature.properties.NAME_1]];
    var data = dataById[feature.properties.ID_1];
    var ratio = data ? data.r_polling_irregularity : null;
    var defaultStyle = { weight: 2, opacity: 1, color: 'white',
                         dashArray: '3', fillOpacity: 0.7 };
    return _.defaults({ fillColor: getColor(ratio)}, defaultStyle);
}
var geojson;
var dataById = {};

var lg = L.layerGroup();
function ready(error, eg, polldata) {
    //console.log(polldata);
    map.removeLayer(lg);
    lg = L.layerGroup();
    geojson = new topojson.object(eg, eg.objects.egy_adm1);

    dataById = {};
    polldata.forEach(function(d) { dataById[Math.round(d.governorate).toString()] = d; });

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });
    }

    geojson.geometries = geojson.geometries.map(function(geojsonsub1) {
        return L.geoJson(geojsonsub1, {
            style: styleGen,
            onEachFeature: onEachFeature
        }).addTo(lg);
    });
    lg.addTo(map);
    

};

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
    header.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.geometries.forEach(function(geojsonsub) {
        geojsonsub.resetStyle(e.target);
    });

    info.update();
    header.update();
}

var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35],
    labels = [];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + .01) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};
legend.addTo(map);

var info = L.control();
var header = L.control();

header.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'header');
    this.update();
    return this._div;
};
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed

header.update = function (props) {
    this._div.innerHTML = '<h1> Egypt Decides 2012 </h1>'; 
};
info.update = function (props) {
    //data = props ? dataById[corrections[props.NAME_1]] : {}; 
    data = props ? dataById[props.ID_1] : {};
    //console.log(props);
    f = function(ratio, data) { 
	return "<b>" + Math.round(data[ratio] * 100) + '% </b> (' +
		Math.round(data[ratio + "_numerator"]) + " out of " +
		Math.round(data[ratio + "_denominator"]) + ")";
    }
    this._div.innerHTML = props ? _.template("<h3> <%= NAME_1 %> </h3>", props) +
	(data ? 
	'<h4>'+ f('r_polling_irregularity',data) + ' polling irregularities.</h4>'  +
	f('ballots_counted',data) + ' ballots counted.<br/>'
	: "No data") : 'Hover over a governate'
};
header.addTo(map);
info.addTo(map);

var time = new Date().getTime();
function reloadData() {
    console.log('reloading data');
    if(new Date().getTime() - time >= 10000) {
        refresh();
        setTimeout(reloadData, 10000);
    }
}

setTimeout(reloadData, 10000);
