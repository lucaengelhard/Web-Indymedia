pageid = parseInt(document.getElementById("header").dataset.postid);
const tolerance = 20;

const maplist = document.getElementById("maplist");

fetch("/map/maplist.json")
.then(res => res.json())
.then(maplist => {
  data = maplist.mappoints;
  console.log(data[pageid - 1]);

  if(data[pageid - 1].markertype == "ort"){
    const locationLatlong = data[pageid - 1].latlong;
    inRange = [];

    data.forEach((item, i) => {
      latlong = item.latlong;
      console.log(latlong);

      lat1 = locationLatlong[0];
      lon1 = locationLatlong[1];

      lat2 = latlong[0];
      lon2 = latlong[1];

      unit = "M";

      distance = calcdistance(lat1, lon1, lat2, lon2, unit)

      console.log(distance);

      if(distance <= tolerance) {
        inRange.push(item.mapnodeid);
      }
    });

    console.log(inRange);

  printEvents(inRange, data);
  }
});

function calcdistance(lat1, lon1, lat2, lon2, unit) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  } else {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344
    }
    if (unit == "N") {
      dist = dist * 0.8684
    }
    return dist;
  }
}

function printEvents(inRange, data){
console.log(inRange);
console.log(data);
maplist.insertAdjacentHTML("beforeend", "<div class='maplist-title'>Events:</div>");


data.forEach((item, i) => {
  if(item.markertype == "event"){
    if(inRange.includes(item.mapnodeid)){
      tagTopic = item.topics[0].toLowerCase();
      locationlink = item.posturl;

      if(item.place != ""){
        place = item.place;
      } else {
        place = item.address;
      }

      iconurl = "#";

      maplist.insertAdjacentHTML("beforeend","<article class='map-list-object tagtopic-"+tagTopic+"'><a href='#' class='map-article-link'>        <h4><span class='map-date'>" + item.date + "</span> |            <span class='map-time'>" + item.time + "</span>          </h4>          <h1>" + item.title + "</h1></a>        <h4><ahref='" + item.posturl + "' class='map-place-link'><span class='map-place'>" + item.city + "</span> |         <span href='" + locationlink + "' class='map-location-link'><span class='map-location'>" + place + "</span></span>        </h4>        <div class='map-icon'>          <div class='map-eventtype-line'></div>          <a href='#' class='map-eventtype-link'><img src='" + iconurl + "' alt=''></a>        </div>      </article>");
    }
  }
});

}
