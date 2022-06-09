var map = L.map('map').setView([50.541, 10.305], 6);

//Mapbox tileLayer
L.mapbox.accessToken = 'pk.eyJ1IjoibHV1Y2NhYSIsImEiOiJjbDQ2N3Vva24wMXhtM2xxOTBpM3l0dXJqIn0.OAoG1WX0pOZXfSRvRIx2iw';

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken, {
  tileSize: 512,
  zoomOffset: -1,
  maxZoom: 10,
  attribution: '© <a href="https://www.mapbox.com/contribute/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',

  //accessToken: accessToken
}).addTo(map);

L.mapbox.styleLayer("mapbox://styles/luuccaa/cl467yt3d000e14pkrn0vo6y2").addTo(map);

//Icons
//Icons definieren
var iconKüche = L.icon({
  iconUrl: '../assets/elements/mapicons/mapicon-food.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize: [40, 60], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [20, 60], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

var iconKultur = L.icon({
  iconUrl: '../assets/elements/mapicons/mapicon-food.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize: [40, 60], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [20, 60], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

var iconDiskussion = L.icon({
  iconUrl: '../assets/elements/mapicons/mapicon-food.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize: [40, 60], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [20, 60], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

var iconInfo = L.icon({
  iconUrl: '../assets/elements/mapicons/mapicon-food.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize: [40, 60], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [20, 60], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

var iconDemo = L.icon({
  iconUrl: '../assets/elements/mapicons/mapicon-food.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize: [40, 60], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [20, 60], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

var iconAktion = L.icon({
  iconUrl: '../assets/elements/mapicons/mapicon-food.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize: [40, 60], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [20, 60], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

var iconGruppe = L.icon({
  iconUrl: '../assets/elements/mapicons/mapicon-food.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize: [40, 60], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [20, 60], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});


//Daten auslesen
function filterExecute(placesFilterArray) {
  fetch("../map/maplist.json")
    .then(result => result.json())
    .then(parsedResult => {
      //console.log(placesFilterArray);
      mappoints = parsedResult.mappoints;
      filterMap(mappoints, placesFilterArray);
      filterEventList(mappoints, placesFilterArray);
    });
}

function filterEventList(mappoints, placesFilterArray) {
  console.log(mappoints);
  idToPrint = parseInt(placesFilterArray.toString());
  console.log(idToPrint);
  maplist = document.getElementById("maplist");

  mappoints.forEach((item, i) => {
    shouldprint = item.mapnodeid == idToPrint

    if(item.markertype == "event"){
      if(item.place != ""){
        place = item.place;
      } else {
        place = item.address;
      }

      tagTopic = item.topics[0].toLowerCase();

      locationlink = "#";
      iconurl = "#";


      if (shouldprint) {
        maplist.insertAdjacentHTML("beforeend","<article class='map-list-object tagtopic-"+tagTopic+"'><a href='#' class='map-article-link'>        <h4><span class='map-date'>" + item.date + "</span> |            <span class='map-time'>" + item.time + "</span>          </h4>          <h1>" + item.title + "</h1>        </a>        <h4><ahref='" + item.posturl + "' class='map-place-link'><span class='map-place'>" + item.city + "</span> |</a>          <a href='" + locationlink + "' class='map-location-link'><span class='map-location'>" + place + "</span></a>        </h4>        <div class='map-icon'>          <div class='map-eventtype-line'></div>          <a href='#' class='map-eventtype-link'><img src='" + iconurl + "' alt=''></a>        </div>      </article>");
      }
    }


  });


}

function filterMap(mappoints, placesFilterArray) {
  placesToDisplay = [];

  mappoints.forEach((point, i) => {
    filtercheck = placesFilterArray.includes(point.mapnodeid);

    if (filtercheck) {
      placesToDisplay.push(point);
    }
  });

  placesToDisplay.forEach((place, i) => {
    //console.log(place.address);
    currentLocation = place.address + " " + place.city;
    getLocation(currentLocation, place);
  });
}

function getLocation(currentLocation, place) {
  fetch("https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=" + currentLocation)
    .then(result => result.json())
    .then(parsedResult => {
      placeMarker(parsedResult, place);
    });
}

function placeMarker(parsedResult, place) {
  currentLatLong = [];
  //console.log(parsedResult[0]);
  //console.log(parsedResult[0].lat);
  //console.log(parsedResult[0].lon);
  //console.log(place.city);

  //console.log(parsedResult[0].address);
  currentLatLong.push(parsedResult[0].lat);
  currentLatLong.push(parsedResult[0].lon);

  //console.log(currentLatLong);

  var marker = L.marker(currentLatLong, {
    icon: iconEssen
  }).addTo(map);


  //Popups
  popup = [];

  popup.push(parsedResult[0].address.road);
  popup.push(parsedResult[0].address.house_number);
  popup.push(parsedResult[0].address.postcode);

  //console.log(parsedResult[0].address);
  // //console.log(parsedResult[0].address.town);
  //console.log(parsedResult[0].address.city);

  if (parsedResult[0].address.town !== undefined) {
    popup.push(parsedResult[0].address.town);
  } else {
    if (parsedResult[0].address.city !== undefined) {
      popup.push(parsedResult[0].address.city);
    } else {
      if (parsedResult[0].address.county !== undefined) {
        popup.push(parsedResult[0].address.county);
      }
    }
  }


  address = popup.join(" ");

  //console.log(address);

  if (place.place.length !== 0) {
    popuptext = "<a href='" + place.posturl + "'>" + place.title + "</a><div>" + place.place + "</div><div>" + address + "</div>";
    marker.bindPopup(popuptext);
  } else {
    popuptext = "<a href='" + place.posturl + "'>" + place.title + "</a><div>" + address + "</div>";
    marker.bindPopup(popuptext);
  }
}

//Mapfilter
//Mobile Filter
//Interaktion mobil
document.addEventListener("click", e => {
  const isDropdownButton = e.target.matches(".filtermobile");
  if (isDropdownButton == true) {

    const isActiveFilter = e.target.parentElement.matches(".filter-active");
    //console.log(isActiveFilter);

    if (isActiveFilter == true) {
      filterActive = Array.from(document.getElementsByClassName("filter-active"));
      filterActive.forEach((filter, i) => {
        filter.classList.remove("filter-active");
      });
    } else {
      filterActive = Array.from(document.getElementsByClassName("filter-active"));
      filterActive.forEach((filter, i) => {
        filter.classList.remove("filter-active");
      });

      e.target.parentElement.classList.add("filter-active");
    }

  } else {
    return
  }
});

document.addEventListener("click", e => {
  try {
    const isResetButton = e.target.parentElement.matches(".filter-reset-button");
    //console.log(isResetButton);
    if (isResetButton == true) {
      form = document.getElementById("filter-form");
      //console.log(form);
      form.reset();
    }
  } catch (e) {

  }

});

//Filter Location
const filterlocationSearch = document.getElementById("filter-location-search");
const filterlocationList = document.getElementById("filter-location-list");

filterlocationSearch.addEventListener("change", () => {
  //console.log(filterlocationSearch.value);

  fetch("https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=" + filterlocationSearch.value)
    .then(result => result.json())
    .then(parsedResult => {
      filterLatLon = [];
      var circleRange;
      var circlePoint;

      try {
        if (parsedResult[0] == undefined) {
          throw "Keine übereinstimmenden Orte gefunden";
        } else {
          //console.log(parsedResult[0].lat);
          //console.log(parsedResult[0].lon);

          filterLatLon.push(parsedResult[0].lat);
          filterLatLon.push(parsedResult[0].lon);

          //console.log(filterLatLon);

          //Range Live Preview
          if (circleRange != undefined) {
            map.removeLayer(circleRange);
            map.removeLayer(circlePoint);
          }


          currentFilterLocation = filterLatLon;

          circlePoint = L.circle(currentFilterLocation, {
            color: 'black',
            fillColor: 'var(--grau)',
            fillOpacity: 0.5,
            radius: 10
          }).addTo(map);


          document.addEventListener("change", object => {
            const rangeLabel = document.getElementById("filter-location-range-label");
            const isLocationRange = object.target.matches(".filter-location-range");
            //console.log(isLocationRange);
            if (isLocationRange == true) {
              //console.log(object.target.value);
              let currentRange = object.target.value;

              //console.log(filterLatLon);
              currentFilterLocation = filterLatLon;


              if (circleRange != undefined) {
                map.removeLayer(circleRange);
                map.removeLayer(circlePoint);
              }

              circleRange = L.circle(currentFilterLocation, {
                color: 'black',
                fillColor: 'var(--grau)',
                fillOpacity: 0.5,
                radius: currentRange
              }).addTo(map);

              circlePoint = L.circle(currentFilterLocation, {
                color: 'black',
                fillColor: 'var(--grau)',
                fillOpacity: 0.5,
                radius: 10
              }).addTo(map);




              if (currentRange >= 1000) {
                //console.log("kilometer");
                currentRange = currentRange.toString();

                currentRangeStart = currentRange.substring(0, currentRange.length - 3);
                currentRangeStart = parseInt(currentRangeStart);

                currentRangeEnd = currentRange.substring(currentRange.length - 3, currentRange.length);
                currentRangeEnd = parseInt(currentRangeEnd);

                if (currentRangeStart >= 10) {
                  currentRangePrint = currentRangeStart;
                  rangeLabel.innerHTML = " " + currentRangePrint + "km";

                } else {
                  currentRangePrint = currentRangeStart + "," + currentRangeEnd;
                  rangeLabel.innerHTML = " " + currentRangePrint + "km";
                }

              } else {
                rangeLabel.innerHTML = " " + currentRange + "m";
              }
            } else {
              return;
            }
          });
        }

      } catch (e) {
        alert(e);
      }
    });
});

//Process Data
filterStart();

function filterStart() {
  let url = window.location.href;
  let params = (new URL(url)).searchParams;

  var filteredMapList = [];
  var mapfilterOutput = [];
  var mapsearchOutput = "";

  var eventtypes = [];

  search = params.get("search")

  typeevents = params.get("filter-check-events")
  typegruppen = params.get("filter-check-gruppen")
  typeorte = params.get("filter-check-orte")

  locationsearch = params.get("placesearch");
  locationrange = params.get("locationrange");

  filtertopiccheckarbeit = params.get("filter-topiccheck-arbeit");
  filtertopicchecksozial = params.get("filter-topiccheck-sozial");
  filtertopiccheckoekologie = params.get("filter-topiccheck-oekologie");
  filtertopiccheckkultur = params.get("filter-topiccheck-kultur");
  filtertopiccheckmilitarismus = params.get("filter-topiccheck-militarismus");
  filtertopiccheckantifa = params.get("filter-topiccheck-antifa");
  filtertopiccheckfeminismus = params.get("filter-topiccheck-feminismus");
  filtertopiccheckrassismus = params.get("filter-topiccheck-rassismus");
  filtertopicchecksonstige = params.get("filter-topiccheck-sonstige");

  typesearch = params.get("eventtypesearch");

  const mapSearchParamsType = {
    "event": typeevents,
    "gruppe": typegruppen,
    "ort": typeorte
  }

  const mapSearchParamsLocation = {
    "location": locationsearch,
    "range": locationrange
  }

  const mapSearchParamsTopic = {
    "arbeit": filtertopiccheckarbeit,
    "sozial": filtertopicchecksozial,
    "oekologie": filtertopiccheckoekologie,
    "kultur": filtertopiccheckkultur,
    "militarismus": filtertopiccheckmilitarismus,
    "antifa": filtertopiccheckantifa,
    "feminismus": filtertopiccheckfeminismus,
    "rassismus": filtertopiccheckrassismus,
    "sonstige": filtertopicchecksonstige
  }

  //Execute Filter
  if (mapSearchParamsLocation.location != "") {
    fetch("https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=" + mapSearchParamsLocation.location)
      .then(result => result.json())
      .then(parsedResult => {
        filterCoordinates = [];

        filterCoordinates.push(parseFloat(parsedResult[0].lat));
        filterCoordinates.push(parseFloat(parsedResult[0].lon));

        //Array Topics
        maptopicactivator = false;
        Object.keys(mapSearchParamsTopic).forEach((topic, i) => {
          if (mapSearchParamsTopic[topic] == "on") {
            mapfilterOutput.push(topic.toLowerCase());
            maptopicactivator = true;
          }
        });



        //Array type
        maptypeactivator = false;
        Object.keys(mapSearchParamsType).forEach((type, i) => {
          if (mapSearchParamsType[type] == "on") {
            mapfilterOutput.push(type.toLowerCase());
            maptypeactivator = true;
          }
        });



        //Array search
        if (search == "") {} else {
          mapfilterOutput.push(search.toLowerCase());
        }
        //Array eventtypesearch
        if (typesearch == "") {
          mapeventtypeactivator = null;
        } else {
          mapfilterOutput.push(typesearch.toLowerCase());
          mapeventtypeactivator = true;
        }



        fetch('/Map/maplist.json')
          .then(response => response.json())
          .then(maplist => {
            mapnodes = maplist.mappoints;
            //console.log(mapnodes);
            //console.log(mapfilterOutput);

            //eventtypes autocomplete
            eventtypes = [];
            mapnodes.forEach((node, i) => {
              if (eventtypes.includes(node.eventtype.toLowerCase()) === true) {} else {
                eventtypes.push(node.eventtype.toLowerCase());
              }
            });
            //console.log(eventtypes);

            //Check every entry
            mapnodes.forEach((node, i) => {
              //console.log(node);

              //Check type
              mapTypeCheck = checkType(maptypeactivator, node);

              //Check Location
              range = parseInt(mapSearchParamsLocation.range);
              rangeCheck = checkLocation(range, filterCoordinates, node);

              //console.log(rangeCheck);

              //Check Topic
              topiccheck = checkTopic(maptopicactivator, node);

              //Check eventtype
              eventtypecheck = checkEventtype(mapeventtypeactivator, node);

              placesFilterArray = [];


              if (rangeCheck == false || mapTypeCheck == false || topiccheck == false || eventtypecheck == false) {} else {
                placesFilterArray.push(node.mapnodeid);
                //console.log(placesFilterArray);
                filterExecute(placesFilterArray);
              }

            });


          })
          .then(mapformupdater => {
            eventtypeautocomp(eventtypes);
          })

      });
  } else {
    //Array Topics
    maptopicactivator = false;
    Object.keys(mapSearchParamsTopic).forEach((topic, i) => {
      if (mapSearchParamsTopic[topic] == "on") {
        mapfilterOutput.push(topic.toLowerCase());
        maptopicactivator = true;
      }
    });
    //Array type
    maptypeactivator = false;
    Object.keys(mapSearchParamsType).forEach((type, i) => {
      if (mapSearchParamsType[type] == "on") {
        mapfilterOutput.push(type.toLowerCase());
        maptypeactivator = true;
      }
    });
    //Array search
    if (search == "") {} else {
      mapfilterOutput.push(search.toLowerCase());
    }
    //Array eventtypesearch
    if (typesearch == "") {
      mapeventtypeactivator = null;
    } else {
      mapfilterOutput.push(typesearch.toLowerCase());
      mapeventtypeactivator = true;
    }

    fetch('/Map/maplist.json')
      .then(response => response.json())
      .then(maplist => {
        mapnodes = maplist.mappoints;
        //console.log(mapnodes);
        //console.log(mapfilterOutput);

        //eventtypes autocomplete
        eventtypes = [];
        mapnodes.forEach((node, i) => {
          if (eventtypes.includes(node.eventtype.toLowerCase()) === true) {} else {
            eventtypes.push(node.eventtype.toLowerCase());
          }
        });
        //console.log(eventtypes);

        //Check every entry
        mapnodes.forEach((node, i) => {

          //Check type
          mapTypeCheck = checkType(maptypeactivator, node);

          //Check Topic
          topiccheck = checkTopic(maptopicactivator, node);

          //Check eventtype
          eventtypecheck = checkEventtype(mapeventtypeactivator, node);

          placesFilterArray = [];

          if (mapTypeCheck == false || topiccheck == false || eventtypecheck == false) {} else {
            placesFilterArray.push(node.mapnodeid);
            //console.log(placesFilterArray);
            filterExecute(placesFilterArray);
          }
        });
      })
      .then(mapformupdater => {
        eventtypeautocomp(eventtypes);
      })
  }
}

function checkLocation(range, filterCoordinates, node) {
  lat1 = filterCoordinates[0];
  lon1 = filterCoordinates[1];

  lat2 = node.latlong[0];
  lon2 = node.latlong[1];

  unit = "M";

  var distanceKM = calcdistance(lat1, lon1, lat2, lon2, unit);

  //console.log(distanceKM);

  distanceM = distanceKM * 1000;
  //console.log(distanceM);

  rangeCheck = null;
  if (range > distanceM) {
    rangeCheck = true;
  } else {
    rangeCheck = false;
  }
  return rangeCheck;
}

function checkType(maptypeactivator, node) {
  mapTypeCheck = null;
  if (maptypeactivator === true) {
    mapTypeCheck = false;
    if (mapfilterOutput.includes(node.markertype) === true) {
      mapTypeCheck = true;
    }
  }
  return mapTypeCheck;
}

function checkEventtype(mapeventtypeactivator, node) {
  eventtypecheck = null;
  if (mapeventtypeactivator) {
    eventtypecheck = false;
    eventtypecheck = mapfilterOutput.includes(node.eventtype.toLowerCase());
  }
  return eventtypecheck;
}

function checkTopic(maptopicactivator, node) {
  topiccheck = null;
  if (maptopicactivator) {
    topiccheck = false;

    node.topics.forEach((topic, i) => {
      topiccheck = mapfilterOutput.includes(topic.toLowerCase());
    });
  }
  return topiccheck;
}

function eventtypeautocomp(eventtypes) {
  eventtypes.forEach((type, i) => {
    if (type != "") {
      document.getElementById("filter-eventtype-list").insertAdjacentHTML("beforeend", "<option value='" + type + "'></option>")
    }
  });
}

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
