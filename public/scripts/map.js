var map = L.map('map').setView([50.541, 10.305], 6);

//Mapbox tileLayer
L.mapbox.accessToken = 'pk.eyJ1IjoibHV1Y2NhYSIsImEiOiJjbDQ2N3Vva24wMXhtM2xxOTBpM3l0dXJqIn0.OAoG1WX0pOZXfSRvRIx2iw';

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken, {
  tileSize: 512,
  zoomOffset: -1,
  maxZoom: 10,
  attribution: '© <a href="/https://www.mapbox.com/contribute/">Mapbox</a> © <a href="/http://www.openstreetmap.org/copyright">OpenStreetMap</a>',

  //accessToken: accessToken
}).addTo(map);

L.mapbox.styleLayer("mapbox://styles/luuccaa/cl467yt3d000e14pkrn0vo6y2").addTo(map);

//Icons
//Icons definieren

var iconKueche = L.icon({
  iconUrl: '/assets/elements/mapicons/iconKueche.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize: [40, 60], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [20, 60], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

var iconKultur = L.icon({
  iconUrl: '/assets/elements/mapicons/mapicon-food.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize: [40, 60], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [20, 60], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

var iconDiskussion = L.icon({
  iconUrl: '/assets/elements/mapicons/iconDiskussion.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize: [40, 60], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [20, 60], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

var iconInfo = L.icon({
  iconUrl: '/assets/elements/mapicons/iconInfo.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize: [40, 60], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [20, 60], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

var iconDemo = L.icon({
  iconUrl: '/assets/elements/mapicons/iconDemo.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize: [40, 60], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [20, 60], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

var iconAktion = L.icon({
  iconUrl: '/assets/elements/mapicons/iconAktion.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize: [40, 60], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [20, 60], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

var iconGruppe = L.icon({
  iconUrl: '/assets/elements/mapicons/iconGruppe.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize: [40, 60], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [20, 60], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

var iconOrt = L.icon({
  iconUrl: '/assets/elements/mapicons/iconOrt.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize: [40, 60], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [20, 60], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});


//Daten auslesen
function filterExecute(placesFilterArray) {
  fetch("/map/maplist.json")
    .then(result => result.json())
    .then(parsedResult => {
      //console.log(placesFilterArray);
      mappoints = parsedResult.mappoints;
      filterMap(mappoints, placesFilterArray);
      filterEventList(mappoints, placesFilterArray);
    });
}

function filterEventList(mappoints, placesFilterArray) {
  //////console.log(mappoints);

  placesFilterArray.forEach((place, i) => {
    ////console.log(place);
    idToPrint = place;
    ////console.log(idToPrint);
    maplist = document.getElementById("maplist");

    mappoints.forEach((item, i) => {
      shouldprint = item.mapnodeid == idToPrint

      if (item.markertype == "event") {
        if (item.place != "") {
          place = item.place;
        } else {
          place = item.address;
        }

        tagTopic = item.topics[0].toLowerCase();

        locationlink = "#";
        iconurl = "#";


        if (shouldprint) {
          maplist.insertAdjacentHTML("beforeend", "<article class='map-list-object tagtopic-" + tagTopic + "'><a href='#' class='map-article-link'>        <h4><span class='map-date'>" + item.date + "</span> |            <span class='map-time'>" + item.time + "</span>          </h4>          <h1>" + item.title + "</h1></a>        <h4><ahref='" + item.posturl + "' class='map-place-link'><span class='map-place'>" + item.city + "</span> |         <span href='" + locationlink + "' class='map-location-link'><span class='map-location'>" + place + "</span></span>        </h4>        <div class='map-icon'>          <div class='map-eventtype-line'></div>          <a href='#' class='map-eventtype-link'><img src='" + iconurl + "' alt=''></a>        </div>      </article>");
        }
      }


    });
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
    //console.log(place.latlong);
    currentLocation = place.address + " " + place.city;
    placeMarker(place);
  });
}

/*
function getLocation(currentLocation, place) {
  fetch("https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=" + currentLocation)
    .then(result => result.json())
    .then(parsedResult => {
      placeMarker(parsedResult, place);
    });
}
*/
function placeMarker(place) {
  currentLatLong = place.latlong;
  ////////console.log(parsedResult[0]);
  ////////console.log(parsedResult[0].lat);
  ////////console.log(parsedResult[0].lon);
  ////////console.log(place.city);

  ////////console.log(parsedResult[0].address);
//  currentLatLong.push(parsedResult[0].lat);
  //currentLatLong.push(parsedResult[0].lon);

  ////////console.log(currentLatLong);
  //////console.log(place.markertype);

  const randomizePlacement = Math.random()*0.0001;

const plusminus= Math.random();
if(plusminus > 0.5){
  latlongrandom = [currentLatLong[0]+randomizePlacement,currentLatLong[1]-randomizePlacement];
}else {
  latlongrandom = [currentLatLong[0]-randomizePlacement,currentLatLong[1]+randomizePlacement];
}



console.log(currentLatLong);
  console.log(latlongrandom);

  if (place.markertype == "gruppe") {
    var marker = L.marker(latlongrandom, {
      icon: iconGruppe
    }).addTo(map);
  } else if (place.markertype == "ort") {
    var marker = L.marker(latlongrandom, {
      icon: iconOrt
    }).addTo(map);
  } else {
    marker = eventMarker(latlongrandom, place);
  }




  //Popups
  popup = [];

/*
  popup.push(parsedResult[0].address.road);
  popup.push(parsedResult[0].address.house_number);
  popup.push(parsedResult[0].address.postcode);
*/




  ////////console.log(parsedResult[0].address);
  // ////////console.log(parsedResult[0].address.town);
  ////////console.log(parsedResult[0].address.city);
/*
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
  }*/
  //popup.push

  if(place.address != "undefined"){
    address = place.address + " "+place.city;
  } else {
    address = place.city;
  }


  if (place.place.length !== 0) {
    popuptext = "<a href='/map/0-mapbase.html?mapnodeid=" + place.mapnodeid + "'>" + place.title + "</a><div>" + place.place + "</div><div>" + address + "</div>";
    marker.bindPopup(popuptext);
  } else {
    popuptext = "<a href='/map/0-mapbase.html?mapnodeid=" + place.mapnodeid + "'>" + place.title + "</a><div>" + address + "</div>";
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
    ////////console.log(isActiveFilter);

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
    ////////console.log(isResetButton);
    if (isResetButton == true) {
      form = document.getElementById("filter-form");
      ////////console.log(form);
      form.reset();
    }
  } catch (e) {

  }

});

//Filter Location
const filterlocationSearch = document.getElementById("filter-location-search");
const filterlocationList = document.getElementById("filter-location-list");

filterlocationSearch.addEventListener("change", () => {
  ////////console.log(filterlocationSearch.value);

  locationRange();

});

function locationRange() {
  fetch("https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=" + filterlocationSearch.value)
    .then(result => result.json())
    .then(parsedResult => {
      filterLatLon = [];
      var circleRange;
      var circlePoint;

      try {
        if (parsedResult[0] == undefined) {
          if(firstLoad < 2){
            firstLoad++;
          }else {
            throw "Keine übereinstimmenden Orte gefunden";
          }

        } else {
          ////////console.log(parsedResult[0].lat);
          ////////console.log(parsedResult[0].lon);

          filterLatLon.push(parsedResult[0].lat);
          filterLatLon.push(parsedResult[0].lon);

          ////////console.log(filterLatLon);

          //Range Live Preview

          console.log(circleRange);

          if (circleRange != undefined) {
            console.log("deleting layers 1");
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

          circleRange = rangeCircle(filterLatLon, circleRange, circlePoint, map)
          document.getElementById("filter-location-range").addEventListener("change", object => {
            circleRange = rangeCircle(filterLatLon, circleRange, circlePoint, map)
          });
        }


        return circleRange
      } catch (e) {
        alert(e);
      }
    });
}
//Process Data
filterStart();
firstLoad = 0;
locationRange();
locationRange();

function filterStart() {
  let url = window.location.href;
  let params = (new URL(url)).searchParams;

  filterActive = false;
  for (var key of params.keys()) {
    filterActive = true;
  }

  var filteredMapList = [];
  var mapfilterOutput = [];
  var mapsearchOutput = "";

  var eventtypes = [];

  if (!filterActive) {
    ////console.log("inactive");
    fetch('/map/maplist.json')
      .then(response => response.json())
      .then(maplist => {
        mapnodes = maplist.mappoints;
        placesFilterArray = [];
        mapnodes.forEach((node, i) => {
          placesFilterArray.push(node.mapnodeid);
        });
        filterExecute(placesFilterArray);
        ////console.log(mapnodes);
      });
    return;
  }

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

  //Keep Filter Values
  console.log(typesearch);
  console.log(mapSearchParamsType);
  console.log(mapSearchParamsLocation);
  console.log(mapSearchParamsTopic);

  //Keep Search
  if (typesearch != "") {
    document.getElementById("filter-eventtype-search").value = typesearch;
  }

  //Keep type
  if (mapSearchParamsType.event == "on") {
    document.getElementById("filter-check-events").checked = true;
  }

  if (mapSearchParamsType.gruppe == "on") {
    document.getElementById("filter-check-gruppen").checked = true;
  }

  if (mapSearchParamsType.ort == "on") {
    document.getElementById("filter-check-orte").checked = true;
  }

  //Keep Location
  if (mapSearchParamsLocation.location != "") {
    document.getElementById("filter-location-search").value = mapSearchParamsLocation.location;
  }

  if (mapSearchParamsLocation.range > 0) {
    document.getElementById("filter-location-range").value = mapSearchParamsLocation.range;
  }

  //Keep Topics
  if (mapSearchParamsTopic.arbeit == "on") {
    document.getElementById("filter-topiccheck-arbeit").checked = true;
  }
  if (mapSearchParamsTopic.sozial == "on") {
    document.getElementById("filter-topiccheck-sozial").checked = true;
  }
  if (mapSearchParamsTopic.oekologie == "on") {
    document.getElementById("filter-topiccheck-oekologie").checked = true;
  }
  if (mapSearchParamsTopic.kultur == "on") {
    document.getElementById("filter-topiccheck-kultur").checked = true;
  }
  if (mapSearchParamsTopic.militarismus == "on") {
    document.getElementById("filter-topiccheck-militarismus").checked = true;
  }
  if (mapSearchParamsTopic.antifa == "on") {
    document.getElementById("filter-topiccheck-antifa").checked = true;
  }
  if (mapSearchParamsTopic.feminismus == "on") {
    document.getElementById("filter-topiccheck-feminismus").checked = true;
  }
  if (mapSearchParamsTopic.rassismus == "on") {
    document.getElementById("filter-topiccheck-rassismus").checked = true;
  }
  if (mapSearchParamsTopic.sonstige == "on") {
    document.getElementById("filter-topiccheck-sonstige").checked = true;
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
        if (search == null) {} else {
          mapfilterOutput.push(search.toLowerCase());
        }
        //Array eventtypesearch
        if (typesearch == null) {
          mapeventtypeactivator = null;
        } else {
          mapfilterOutput.push(typesearch.toLowerCase());
          mapeventtypeactivator = true;
        }



        fetch('/map/maplist.json')
          .then(response => response.json())
          .then(maplist => {
            mapnodes = maplist.mappoints;
            ////////console.log(mapnodes);
            ////////console.log(mapfilterOutput);

            //eventtypes autocomplete
            eventtypes = [];
            mapnodes.forEach((node, i) => {
              if (eventtypes.includes(node.eventtype.toLowerCase()) === true) {} else {
                eventtypes.push(node.eventtype.toLowerCase());
              }
            });
            ////////console.log(eventtypes);

            //Check every entry
            mapnodes.forEach((node, i) => {
              ////////console.log(node);

              //Check type
              mapTypeCheck = checkType(maptypeactivator, node, mapfilterOutput);

              //Check Location
              range = parseInt(mapSearchParamsLocation.range);
              rangeCheck = checkLocation(range, filterCoordinates, node);

              ////////console.log(rangeCheck);

              //Check Topic
              topiccheck = checkTopic(maptopicactivator, node, mapfilterOutput);

              //Check eventtype
              eventtypecheck = checkEventtype(mapeventtypeactivator, node, mapfilterOutput);

              placesFilterArray = [];


              if (rangeCheck == false || mapTypeCheck == false || topiccheck == false || eventtypecheck == false) {} else {
                placesFilterArray.push(node.mapnodeid);
                ////////console.log(placesFilterArray);
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

    fetch('/map/maplist.json')
      .then(response => response.json())
      .then(maplist => {
        mapnodes = maplist.mappoints;
        ////////console.log(mapnodes);
        ////console.log(mapfilterOutput);

        //eventtypes autocomplete
        eventtypes = [];
        mapnodes.forEach((node, i) => {
          if (eventtypes.includes(node.eventtype.toLowerCase()) === true) {} else {
            eventtypes.push(node.eventtype.toLowerCase());
          }
        });
        ////////console.log(eventtypes);

        //Check every entry
        mapnodes.forEach((node, i) => {

          //Check type
          mapTypeCheck = checkType(maptypeactivator, node, mapfilterOutput);

          //Check Topic
          topiccheck = checkTopic(maptopicactivator, node, mapfilterOutput);

          //Check eventtype
          eventtypecheck = checkEventtype(mapeventtypeactivator, node, mapfilterOutput);

          placesFilterArray = [];

          if (mapTypeCheck == false || topiccheck == false || eventtypecheck == false) {} else {
            placesFilterArray.push(node.mapnodeid);
            ////console.log(placesFilterArray);
            filterExecute(placesFilterArray);
          }
        });
      })
      .then(mapformupdater => {
        eventtypeautocomp(eventtypes);
      })
  }
}

function eventMarker(currentLatLong, place) {
  if (place.eventtype == "küche") {
    var marker = L.marker(currentLatLong, {
      icon: iconKueche
    }).addTo(map);
  }
  if (place.eventtype == "kultur") {
    var marker = L.marker(currentLatLong, {
      icon: iconKultur
    }).addTo(map);
  }
  if (place.eventtype == "diskussion") {
    var marker = L.marker(currentLatLong, {
      icon: iconDiskussion
    }).addTo(map);
  }
  if (place.eventtype == "info") {
    var marker = L.marker(currentLatLong, {
      icon: iconInfo
    }).addTo(map);
  }
  if (place.eventtype == "demo") {
    var marker = L.marker(currentLatLong, {
      icon: iconDemo
    }).addTo(map);
  }
  if (place.eventtype == "aktion") {
    var marker = L.marker(currentLatLong, {
      icon: iconAktion
    }).addTo(map);
  }
  return marker;
}

function checkLocation(range, filterCoordinates, node) {
  lat1 = filterCoordinates[0];
  lon1 = filterCoordinates[1];

  lat2 = node.latlong[0];
  lon2 = node.latlong[1];

  unit = "M";

  var distanceKM = calcdistance(lat1, lon1, lat2, lon2, unit);

  ////////console.log(distanceKM);

  distanceM = distanceKM * 1000;
  ////////console.log(distanceM);

  rangeCheck = null;
  if (range > distanceM) {
    rangeCheck = true;
  } else {
    rangeCheck = false;
  }
  return rangeCheck;
}

function checkType(maptypeactivator, node, mapfilterOutput) {
  mapTypeCheck = null;
  if (maptypeactivator === true) {
    mapTypeCheck = false;
    if (mapfilterOutput.includes(node.markertype) === true) {
      mapTypeCheck = true;
    }
  }
  return mapTypeCheck;
}

function checkEventtype(mapeventtypeactivator, node, mapfilterOutput) {
  eventtypecheck = null;
  if (mapeventtypeactivator) {
    eventtypecheck = false;
    eventtypecheck = mapfilterOutput.includes(node.eventtype.toLowerCase());
  }
  return eventtypecheck;
}

function checkTopic(maptopicactivator, node, mapfilterOutput) {
  topiccheck = null;
  if (maptopicactivator) {
    topiccheck = false;
    topicsLowerCase = [];
    //////console.log(node.topics);

    node.topics.forEach((topic, i) => {
      topicsLowerCase.push(topic.toLowerCase());
    });



    /*
        node.topics.every(topic => {
          ////console.log(topic);
          topiccheck = mapfilterOutput.includes(topic.toLowerCase());
          ////console.log(node.mapnodeid + " "+ topiccheck);

          if(topiccheck) {
            ////console.log(topiccheck);
            return topiccheck;
          }
        })
        */
    /*
        node.topics.forEach((topic, i) => {
          //////console.log(topic);
          topiccheck = mapfilterOutput.includes(topic.toLowerCase());
          ////console.log(node.mapnodeid + " " + mapfilterOutput + " " +topic  " "+ topiccheck);
        });*/
    /*
        mapfilterOutput.forEach((item, i) => {
          //////console.log(item);
          topiccheck = topicsLowerCase.includes(item);
          ////console.log(node.mapnodeid + " " + item + " " +topicsLowerCase + " "+ topiccheck);
        });
    */


    topiceverycheck = mapfilterOutput.every(item => {
      //////console.log(item);
      //////console.log(topicsLowerCase);
      topiccheck = topicsLowerCase.includes(item);
      //  ////console.log(topiccheck);
      return topiccheck;
    });




    //////console.log(topiceverycheck);

    topiccheck = topiceverycheck;

  }
  //////console.log(topiccheck);
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

function rangeCircle(filterLatLon, circleRange, circlePoint, map){

  const rangeLabel = document.getElementById("filter-location-range-label");
  ////////console.log(isLocationRange);
  ////////console.log(object.target.value);
  let currentRange = document.getElementById("filter-location-range").value;

  ////////console.log(filterLatLon);
  currentFilterLocation = filterLatLon;

//console.log(map);

  if (circleRange != undefined) {
    console.log("deleting layers 2");
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
    ////////console.log("kilometer");
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

  return circleRange
}
