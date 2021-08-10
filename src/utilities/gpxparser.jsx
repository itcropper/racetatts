
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

    let parsedData = gpxData.features[0].geometry.coordinates.map((point, i, arr) => (
      { 
        index: i, 
        elevation: point[2], 
        distance: 0,
        segmentLength: (i === 0 
          ? 0 
          : distance({ 
            pt1: { 
              lat: arr[i][0], 
              lon: arr[i][1] 
            }, 
            pt2: { 
              lat: arr[i - 1][0], 
              lon: arr[i - 1][1] 
            } 
          })) 
        }));

    parsedData.forEach((d,i,arr) => d.distance = d.segmentLength + (i === 0 ? 0 : arr[i-1].distance));

    console.log(parsedData[parsedData.length - 1].distance);


    // parsedData = parsedData.map((point, i, arr) => {
    //   const distance = i === 0 ? 0 : arr[i].distance + arr[i-1].distance;
    //   if(i % 9 === 0){
    //     console.log("----distance");
    //     console.log(distance);
    //     debugger;
    //   }
      
    //   return {
    //     ...point,
    //     distance
    //   }
    // });

    parsedData = parsedData.map((point, i, arr) => {
      const km = arr[i].distance;
      const miles = km * 0.621371;
      return {
        ...point, 
        distance: {
          km: parseFloat(km.toFixed(3)),
          miles: parseFloat(miles.toFixed(3))
        }
      };
    });

    return parsedData;
}