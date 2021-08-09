
import toGeoJSON from '@mapbox/togeojson';

const distance = ({ pt1, pt2 }) => calcCrow(pt1.lat, pt1.lon, pt2.lat, pt2.lon);

const calcCrow = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
const toRad = (v) => v * Math.PI / 180;

export const processData = (gpXml) => {

    const xmlString = (new DOMParser()).parseFromString(gpXml, "text/xml")

    const gpxData = toGeoJSON.gpx(xmlString);

    const parsedData = gpxData.features[0].geometry.coordinates.map((point, i, arr) => ({ index: i, elevation: point[2], distance: (i === 0 ? 0 : distance({ pt1: { lat: arr[i][0], lon: arr[i][1] }, pt2: { lat: arr[i - 1][0], lon: arr[i - 1][1] } })) }));

    parsedData.forEach((point, i, arr) => point.distance = i === 0 ? 0 : point.distance + arr[i - 1].distance)

    parsedData.forEach((point, i, arr) => point.distance = parseFloat(point.distance.toFixed(3)))

    return parsedData;
}