//Mapbuilder

var map = L.map('map').setView([50.541, 10.305], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

var greenIcon = L.icon({
    iconUrl: '../assets/elements/img_250767.png',
    //shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 38], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [19, 19], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


var marker = L.marker([51.541, 10.305], {icon: greenIcon}).addTo(map);



marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

var circle = L.circle([51.541, 10.305], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 600000
}).addTo(map);

//Mapfilter

let url = window.location.href;
let params = (new URL(url)).searchParams;

var filteredMapList = [];
var mapfilterOutput = [];
var mapsearchOutput = "";

var eventtypes = [];


search = params.get("search")

typeevents = params.get("map-filter-check-events")
typegruppen = params.get("map-filter-check-gruppen")
typeorte = params.get("map-filter-check-orte")

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

typesearch = params.get("typesearch");

const mapSearchParamsType = {
  "event": typeevents,
  "gruppe": typegruppen,
  "ort": typeorte
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


//Array Topics
Object.keys(mapSearchParamsTopic).forEach((topic, i) => {
  if (mapSearchParamsTopic[topic] == "on") {
    mapfilterOutput.push(topic.toLowerCase());
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
if (typesearch == "") {} else {
  mapfilterOutput.push(typesearch.toLowerCase());
}

fetch('/Map/maplist.json')
  .then(response => response.json())
  .then(maplist => {
    mapnodes = maplist.mappoints;
    console.log(mapnodes);


    //eventtypes autocomplete
    eventtypes = [];
    mapnodes.forEach((node, i) => {
      if (eventtypes.includes(node.eventtype.toLowerCase()) === true) {} else {
        eventtypes.push(node.eventtype.toLowerCase());
      }
    });

    //Check every entry
    mapnodes.forEach((node, i) => {
      console.log(node);

      //Check type
      mapTypeCheck = null;
      if (maptypeactivator === true) {
        mapTypeCheck = false;
        if (mapfilterOutput.includes(node.markertype) === true) {
          mapTypeCheck = true;
        }
      }

      console.log(mapTypeCheck);

      //Check Location

      //Check Topic

      //Check eventtype


    });


  })

  .then(mapformupdater => {
    eventtypes.forEach((type, i) => {
      document.getElementById("map-filter-type-list").insertAdjacentHTML("beforeend", "<option value='" + type + "'></option>")
    });
  })
