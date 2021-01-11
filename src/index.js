// lambda-like handler function
const data = require('./data.json');
var searchString = "Stam";
var results = []
var latitude = "41.09";
var longitude = "-73.55";
var minDif = 10;

const fetchData = async (metadata, searchString) => {
    for (var i = 0; i < metadata.length; i++) {
        for (key in metadata[i]) {
            if ((metadata[i][key] != null) && (metadata[i][key].indexOf(searchString) != -1)) {
                results.push(metadata[i]);
            }
        }
    }
}

const calculateDist = async (metadata) => {
    for (var i = 0; i < metadata.length; i++) {
        for (key in metadata[i]) {
            var dif = PythagorasEquirectangular(latitude, longitude, metadata[i]['latitude'], metadata[i]['longitude']);
            if (dif < minDif) {
                results.push(metadata[i]);
            }
        }
    }
}
function Deg2Rad(deg) {
    return deg * Math.PI / 180;
}

function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
    lat1 = Deg2Rad(lat1);
    lat2 = Deg2Rad(lat2);
    lon1 = Deg2Rad(lon1);
    lon2 = Deg2Rad(lon2);
    var R = 6371; // km
    var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    var y = (lat2 - lat1);
    var d = Math.sqrt(x * x + y * y) * R;
    return d;
}
module.exports.handler = async (event, context, callback) => {
    fetchData(data, searchString);
    calculateDist(data);
};
