//Styling Topics
topicButtons = $("#editor-tag-wrapper > div > label");

topicButtons.hover((button) => {
  topic = button.currentTarget.innerText.toLowerCase();
  button.currentTarget.style.color = "var(--" + topic + ")";
}, (button) => {
  button.currentTarget.style.color = "";
});


//Editor
const elements = document.querySelectorAll(".btn");
const imageselect = document.querySelector(".text-editor-imageselect-wrapper");

const imageselectButton = document.querySelector(".imageselect-add");


elements.forEach((element, i) => {
  element.addEventListener("click", () => {
    let command = element.dataset["element"];
    if (command == "createLink") {
      let url = prompt("URL eingeben", "https://")
      document.execCommand(command, false, url);
    } else {
      if (command == "insertImage") {


        if (imageselect.classList.contains("imageselect-hide")) {
          imageselect.classList.remove("imageselect-hide");
          imageselect.classList.add("imageselect-show");
        } else {
          imageselect.classList.add("imageselect-hide");
          imageselect.classList.remove("imageselect-show");
        }


      } else {
        if (command == "heading") {
          //console.log(command);
          document.execCommand("formatBlock", false, "H1");
        } else {
          if (command == "quote") {
            document.execCommand("formatBlock", false, "blockquote");
          }
          document.execCommand(command, false, null);
        }
      }
    }
  });
});

imageSelector(imageselect);

function imageSelector(imageselect) {
  if(imageselect != null){imageCollection = Array.from(imageselect.querySelectorAll("img"));
  //console.log(imageCollection);
  imageCollection.forEach((image, i) => {
    image.addEventListener("click", e => {
      imgURL = e.target.src;
      document.execCommand("insertImage", false, imgURL);
    });
  });}


}
if(imageselectButton != null){imageselectButton.addEventListener("click", e => {
  imageUpload();
})}


function imageUpload() {
  const imageselectUpload = document.querySelector(".imageselect-upload");
  imageselectUpload.click();

  imageselectUpload.onchange = () => {
    uploadedfile = imageselectUpload.files[0];
    //console.log(uploadedfile);

    const formData = new FormData();
    formData.append("image", uploadedfile);

    //console.log(formData);
    const options = {
      method: 'Post',
      /*headers: {
        'Content-Type': 'application/json'
      },*/
      body: formData
    };

    fetch("/temp", options)
      .then(res => res.json())
      .then(response => {
        filepath = response.addedfile;
        //console.log(filepath);
        const selectList = document.querySelector(".text-editor-imageselect");
        selectList.insertAdjacentHTML("beforeend", "<img src=" + filepath + " alt=''>");
        const imageselect = document.querySelector(".text-editor-imageselect-wrapper");
        imageSelector(imageselect);
      })

  }
}




$(function() {
  $("#editor-usertags-input").on({
    focusout: function() {
      var txt = this.value.replace(/[^a-z0-9\+\-\.\#]/ig, " ");
      if (txt) $("<span/>", {
        text: txt.toLowerCase(),
        appendTo: $("#editor-user-tags-selected")
      });
      this.value = "";
    },
    keyup: function(ev) {
      if (/(188|13)/.test(ev.which)) $(this).focusout();
    }
  });
});

document.addEventListener("click", (clickedObject) => {
  isTagCard = clickedObject.target.parentElement.id === "editor-user-tags-selected";

  if (isTagCard) {
    clickedObject.target.remove();
  }

});

document.getElementById("editor-submit-button").onclick = function() {
  //Check mediatype
  mediatype = document.getElementById("editor-form").dataset.mediatype;




  if (mediatype == "article") {
    //console.log(mediatype);
    try {
      var submittedtitle = postTitle();
      var submittedimage = postImage();
      var submittedtopics = postTopics();
      var submittedtags = postTags();
      var submittedshorttext = postShorttext();

      var submitteddate = postDate();
      var submittedlocation = postLocation();
      postBody(mediatype, submittedtitle, submittedimage, submittedtopics, submittedtags, submittedshorttext, submitteddate, submittedlocation, submittedinfo);
    } catch (e) {
      alert(e);
    }
  }

  if (mediatype == "video") {
    //console.log(mediatype);
    try {
      var submittedtitle = postTitle();

      var submittedtopics = postTopics();
      var submittedtags = postTags();
      var submittedshorttext = postShorttext();
      var submitteddate = postDate();
      var submittedlocation = postLocation();

      //console.log(submittedlocation);

      postBody(mediatype, submittedtitle, submittedimage, submittedtopics, submittedtags, submittedshorttext, submitteddate, submittedlocation, submittedinfo);


    } catch (e) {
      alert(e);
    }
  }

  if (mediatype == "photo") {
    //console.log(mediatype);
    try {
      var submittedtitle = postTitle();
      var submittedgallery = postGallery();
      var submittedtopics = postTopics();
      var submittedtags = postTags();
      var submittedshorttext = postShorttext();
      var submittedcontent = postBody();
      var submitteddate = postDate();
      var submittedlocation = postLocation();

      postBody(mediatype, submittedtitle, submittedimage, submittedtopics, submittedtags, submittedshorttext, submitteddate, submittedlocation, submittedinfo);
    } catch (e) {
      alert(e);
    }
  }

  if (mediatype == "map") {
    //console.log(mediatype);
    try {
      var submittedlocation = mappostLocation();
      var submittedtitle = postTitle();
      var submittedimage = postImage();
      var submittedtopics = postTopics();
      var submittedtags = postTags();
      var submittedshorttext = postShorttext();
      var submittedinfo = postInfo();

      var submitteddate = postDate();

      var submittedcontent = postBody(mediatype, submittedtitle, submittedimage, submittedtopics, submittedtags, submittedshorttext, submitteddate, submittedlocation, submittedinfo);
    } catch (e) {
      alert(e);
    }
  }

  if (mediatype == "tutorial") {
    //console.log(mediatype);
    try {
      var submittedtitle = postTitle();
      var submittedimage = postImage();
      var submittedtags = postTags();
      var submittedshorttext = postShorttext();

      var submittedcontent = postBody(mediatype, submittedtitle, submittedimage, submittedtopics, submittedtags, submittedshorttext, submitteddate, submittedlocation, submittedinfo);


    } catch (e) {
      alert(e);
    }
  }

}

function postBody(mediatype, submittedtitle, submittedimage, submittedtopics, submittedtags, submittedshorttext, submitteddate, submittedlocation, submittedinfo) {

  editorElement = document.getElementById("editor-richtext");
  submittedcontent = editorElement.innerHTML;

  if (editorElement.innerText.length === 0) {
    throw "Content braucht dein Artikel schon :)"
  } else {

    richtextImages = Array.from(editorElement.querySelectorAll("img"));

    //console.log(richtextImages);

    urlList = [];

    richtextImages.forEach((image, i) => {
      urlList.push(image.src);
    });

    imagelistJSON = JSON.stringify({
      urlList
    });

    //console.log(formData);
    const options = {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: imagelistJSON
    };

    fetch("/fileswitch", options)
      .then(res => res.json())
      .then(response => {

        //submittedcontentSplit = submittedcontent.split("/");
        //console.log(submittedcontentSplit);

        images = Array.from(editorElement.querySelectorAll("img"));

        images.forEach((image, i) => {
          currentURL = image.src;
          newURL = currentURL.replace("/temp/", "/");
          urlStart = newURL.search("/assets/");
          //console.log(urlStart);

          newURL = newURL.substr(urlStart, newURL.length);
          image.src = newURL;
        });

        submittedcontent = editorElement.innerHTML;
        if (mediatype == "article") {articleSubmit(submittedtitle, submittedimage, submittedtopics, submittedtags, submittedshorttext, submittedcontent, submitteddate, submittedlocation);}

        if (mediatype == "tutorial") {

          postSteps(submittedtitle, submittedimage, submittedtags, submittedshorttext, submittedcontent);
        }

        if (mediatype == "map"){
          //console.log(submittedtitle);
          //console.log(submittedtopics);
          //console.log(submittedimage);
          //console.log(submittedtags);
          //console.log(submittedshorttext);
          //console.log(submittedcontent);
          //console.log(submitteddate);
          //console.log(submittedlocation);
          //console.log(submittedinfo);

          mapSubmit(submittedtitle, submittedimage, submittedtopics, submittedtags, submittedshorttext, submittedcontent, submitteddate, submittedlocation, submittedinfo);
        }

      })


  }
}

function postTitle() {
  editorTitle = document.getElementById("editor-title-input");
  editorTitle = editorTitle.value;

  if (editorTitle.length === 0) {
    throw "Biite gib einen Titel ein :)"
  } else {
    return editorTitle;
  }
}

function postImage() {
  editorImage = document.getElementById("editor-titleimage-input");
  editorImage = editorImage.files;
  return editorImage[0];
}

function postVideo(mediatype, submittedtitle, submittedimage, submittedtopics, submittedtags, submittedshorttext, submitteddate, submittedlocation) {
  editorVideo = document.getElementById("editor-titleimage-input");
  editorVideo = editorVideo.files[0];

  if(editorVideo.type == "video/mp4"){
    VideoSubmit(mediatype, submittedtitle, submittedimage, submittedtopics, submittedtags, submittedshorttext, submitteddate, submittedlocation, editorVideo);
  }else {
    throw "wrong file format use mp4"
  }


  return editorVideo[0];
}

function postGallery() {
  editorGallery = document.getElementById("editor-titleimage-input");
  editorGallery = editorGallery.files;
  return editorGallery;
}

function postTopics() {
  let onTopics = [];
  editorTopics = document.getElementById("editor-tag-wrapper");
  editorTopics = Array.from(editorTopics);


  editorTopics.forEach((tag, i) => {
    isTagOn = tag.checked;
    if (isTagOn == true) {
      onTopics.push(tag.name);
      //console.log(onTopics);
    }
  });

  //console.log(onTopics.length);

  if (onTopics.length === 0) {
    throw "mindestens ein Themen-Tag muss dein Artikel haben :)";
  } else {
    return onTopics;
  }
}

function postTags() {
  submittedtags = [];
  editorTags = $("#editor-user-tags-selected > span").toArray();

  editorTags.forEach((tag, i) => {
    //console.log(tag.innerText);
    submittedtags.push(tag.innerText);
  });

  //console.log(submittedtags);
  return submittedtags;
}

function postShorttext() {
  editorShorttext = document.getElementById("editor-shorttext-input");
  editorShorttext = editorShorttext.value;

  if (editorShorttext.length === 0) {
    throw "Biite gib eine Kurzusammenfassung ein :)"
  } else {
    return editorShorttext;
  }
}

function postDate() {
  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();

  cDay = cDay.toString();
  cMonth = cMonth.toString();

  if (cDay.length == 1) {
    cDay = cDay.replace(cDay, "0" + cDay);
    if (cMonth.length == 1) {

      cMonth = cMonth.replace(cMonth, "0" + cMonth);
      editorDate = cDay + "." + cMonth + "." + cYear

      return editorDate
    } else {
      editorDate = cDay + "." + cMonth + "." + cYear

      return editorDate
    }
  } else {
    if (cMonth.length == 1) {

      cMonth = cMonth.replace(cMonth, "0" + cMonth);
      editorDate = cDay + "." + cMonth + "." + cYear

      return editorDate
    } else {
      editorDate = cDay + "." + cMonth + "." + cYear

      return editorDate
    }
  }
}

function postLocation() {

  const locationSearch = document.getElementById("editor-user-location");
  editorLocation = [];

  if (locationSearch.getAttribute("data-place") === null || locationSearch.getAttribute("data-zipcode") === null) {
    locationText = locationSearch.value;
    if (locationText.length === 0) {
      throw "Bitte gib einen Ort ein";
    } else {
      editorLocation.push(locationText);
      return editorLocation;
    }
  } else {
    editorLocation.push(locationSearch.getAttribute("data-place"));
    editorLocation.push(locationSearch.getAttribute("data-zipcode"));

    return editorLocation;
  }

}

function mappostLocation() {
  const locationdata = document.querySelector("#map-editor-user-location");
  //console.log(locationdata);
  maplocationArray = [];
  maplocationArray.push(locationdata.dataset.city);
  maplocationArray.push(locationdata.dataset.address);
  maplocationArray.push(locationdata.dataset.latlong);

  return maplocationArray;
}

function postInfo() {
  editorInfo = document.querySelector(".map-editor-additionalinfo");
  editorInfo = editorInfo.value

  return editorInfo
}

function postSteps(submittedtitle, submittedimage, submittedtags, submittedshorttext, submittedcontent) {
  const stepList = document.querySelector(".tutorial-steps-wrapper");
  const steps = Array.from(stepList.children);

  submittedsteps = [];

  steps.forEach((step, i) => {
    const stepImage = step.querySelector(".tutorial-steps-image").files[0];
    const stepTitle = step.querySelector(".tutorial-steps-title").value;
    const stepContent = step.querySelector(".tutorial-steps-content").value;

    stepObj = {
      "image": stepImage,
      "heading": stepTitle,
      "content": stepContent
    };

    //console.log(stepObj);


    submittedsteps.push(stepObj);

    //return stepObj;
  });
  //console.log(submittedshorttext);
  tutorialSubmit(submittedtitle, submittedimage, submittedtags, submittedshorttext, submittedcontent, submittedsteps);
}

const locationSearch = document.getElementById("editor-user-location");
const locationList = document.getElementById("editor-user-location-list");
const locationLabel = document.getElementById("editor-user-location-label");

//console.log(locationSearch.value);

const searchCities = async searchText => {
  //console.log("searching");
  const res = await fetch("/map/zipcodes.de.json");
  const cities = await res.json();

  //console.log(cities);
  //console.log(searchText);

  matches = cities.filter(city => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return city.place.match(regex) || city.zipcode.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    locationList.style.display = "none";
  }

  //console.log(matches);

  locationList.innerHTML = "";
  matches.forEach((city, i) => {
    //console.log(i);
    locationList.style.display = "block";
    locationList.insertAdjacentHTML("beforeend", "<div class='editor-user-location-list-point' id='location-autocomplete-" + city.zipcode + "' data-zipcode='" + city.zipcode + "' data-place='" + city.place + "'><div>" + city.place + "</div><div> " + city.zipcode + "</div></div>");

    locationListPoints = $(".editor-user-location-list-point").toArray();
    currentPoint = locationListPoints[locationListPoints.length - 1];


    currentPoint.addEventListener("click", (point) => {
      postLocationName = point.target.parentElement.getAttribute("data-place");
      postLocationCode = point.target.parentElement.getAttribute("data-zipcode");

      locationSearch.value = postLocationName;
      locationSearch.dataset.place = postLocationName;
      locationSearch.dataset.zipcode = postLocationCode;
      locationList.style.display = "none";
    })
  });

}

if(document.getElementById("editor-form").dataset.mediatype != "map"){
  locationSearch.addEventListener("input", () => searchCities(locationSearch.value));
}

const locationSearchMap = document.getElementById("map-editor-user-location");

locationSearchMap.addEventListener("change", () => {
  //console.log(locationSearchMap.value);
  fetch("https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=" + locationSearchMap.value)
    .then(result => result.json())
    .then(parsedResult => {
      //console.log(parsedResult[0]);

      if(parsedResult.length > 0){
        //data
        if(parsedResult[0].address.city != undefined){
          city = parsedResult[0].address.city;
        }else {
          if(parsedResult[0].address.town != undefined){
            city = parsedResult[0].address.town;
          }else {
            city = parsedResult[0].address.county;
          }

        }

        if(parsedResult[0].address.square != undefined){
          address = parsedResult[0].address.square;
        }else {
          if(parsedResult[0].address.house_number != undefined){
            address = parsedResult[0].address.road +" "+ parsedResult[0].address.house_number;
          } else {
            address = parsedResult[0].address.road;
          }
        }





        latlong = [parsedResult[0].lat, parsedResult[0].lon];

        //console.log(city);
        //console.log(address);
        //console.log(latlong);

        locationSearchMap.dataset.city = city;
        locationSearchMap.dataset.address = address;
        locationSearchMap.dataset.latlong = latlong;

      } else {
        alert("kein Übereinstimmender Ort gefunden")
      }

    });
});


const markertype = document.querySelector(".editor-markertype");
const typeEvent = document.querySelector("#markertype-event");
const eventtypechooser = document.querySelector(".editor-eventtype");

if(typeEvent.checked){
  eventtypechooser.classList.add("editor-eventtype-show");
};

markertypeOptions = Array.from(markertype.children);
console.log(markertypeOptions);

markertypeOptions.forEach((type, i) => {
  type.addEventListener("change", ()=>{
    if(typeEvent.checked){
      eventtypechooser.classList.add("editor-eventtype-show");
    }else {
        eventtypechooser.classList.remove("editor-eventtype-show");
    }
  })
});


typeEvent.onclick = ()=>{
  //console.log(typeEvent.checked);
  if(typeEvent.checked){
    eventtypechooser.classList.add("editor-eventtype-show");
  };
}


function articleSubmit(submittedtitle, submittedimage, submittedtopics, submittedtags, submittedshorttext, submittedcontent, submitteddate, submittedlocation) {
  //console.log(submittedtitle);
  //console.log(submittedimage);
  //console.log(submittedtopics);
  //console.log(submittedshorttext);
  //console.log(submittedcontent);
  //console.log(submittedtags);
  //console.log(submittedlocation);

  const article = {
    "postid": "",
    "posturl": "",
    "featured": false,
    "mediatype": "artikel",
    "title": "",
    "author": "anonym",
    "date": "",
    "location": [],
    "topics": [],
    "tags": [],
    "image": "",
    "shorttext": "",
    "richtext": ""
  };



  article.title = submittedtitle;

  article.date = submitteddate;
  article.location = submittedlocation;

  if (submittedimage === undefined) {} else {
    article.image = "/assets/images/" + submittedimage.name;
  }

  article.topics = submittedtopics;
  article.tags = submittedtags;
  article.shorttext = submittedshorttext;
  article.richtext = submittedcontent;

  //console.log(article);

  articleString = JSON.stringify(article);
  //console.log(articleString);
  const formData = new FormData();
  formData.append("article", articleString);
  if (submittedimage === undefined) {} else {
    formData.append("image", submittedimage, submittedimage.name);
  }

  const options = {
    method: 'Post',
    /*headers: {
      'Content-Type': 'application/json'
    },*/
    body: formData
  };

  fetch("/api", options);

  /*
    function getFile() {
      fetch('/artikel/articlelist.json')
        .then(response => response.json())
        .then(userlist => {
         //console.log(userlist);
        });
    }*/

}

function mapSubmit(submittedtitle, submittedimage, submittedtopics, submittedtags, submittedshorttext, submittedcontent, submitteddate, submittedlocation, submittedinfo){
  const article = {
    "mediatype": "map",
    "mapnodeid": 1,
    "posturl": "",
    "markertype": "",
    "title": "",
    "date": "",
    "time": "",
    "city": "",
    "place": "",
    "address": "",
    "latlong": [],
    "topics": [],
    "eventtype": "",
    "image":""
  };



//Marker
markerArray = Array.from(document.querySelector(".editor-markertype").children);

markerArray.forEach((marker, i) => {
  if(marker.checked){
    article.markertype= marker.value;
  }
});

if(article.markertype == "event"){
  eventArray = Array.from(document.querySelector(".editor-eventtype").children);
  eventArray.forEach((type, i) => {
    if(type.checked){
      article.eventtype = type.value;
    }
  });

  dateArray = document.querySelector(".editor-date").value.split("-");
  article.date = dateArray[2]+"."+dateArray[1]+"."+dateArray[0];
  article.time = document.querySelector(".editor-time").value;
}


  submittedlocationquote = submittedlocation[2].split(",");
  submittedlatlong = [];
  //console.log(submittedlocationquote);
  submittedlocationquote.forEach((item, i) => {
    //console.log(item.replace(/""\"/g, ""));
    submittedlatlong.push(parseFloat(item.replace(/""\"/g, "")));
  });



  article.title = submittedtitle;
  //article.markertype = ;
  article.city = submittedlocation[0];
  //article.place = ;
  article.address = submittedlocation[1];
  article.latlong = submittedlatlong;
  article.topics = submittedtopics;
  article.image = submittedimage;
  article.info = submittedinfo.replace(/\r?\n/g, '<br>');

  article.shorttext = submittedshorttext;
  article.content = submittedcontent;

  //console.log(article);


  articleString = JSON.stringify(article);

  const formData = new FormData();

  formData.append("article", articleString);
  if (submittedimage === undefined) {} else {
    formData.append("image", submittedimage, submittedimage.name);
  }

  const options = {
    method: 'Post',
    /*headers: {
      'Content-Type': 'application/json'
    },*/
    body: formData
  };

  fetch("/api", options);
}

function VideoSubmit(mediatype, submittedtitle, submittedimage, submittedtopics, submittedtags, submittedshorttext, submitteddate, submittedlocation, editorVideo) {
  //console.log(submittedtitle);
  //console.log(submittedimage);
  //console.log(submittedtopics);
  //console.log(submittedshorttext);
  //console.log(submittedcontent);
  //console.log(submittedtags);
  //console.log(submittedlocation);



  const article = {
    "postid": "",
    "posturl": "",
    "featured": false,
    "mediatype": "video",
    "title": "",
    "author": "anonym",
    "date": "",
    "location": [],
    "topics": [],
    "tags": [],
    "video": "",
    "shorttext": ""
  };

  article.title = submittedtitle;

  article.date = submitteddate;
  article.location = submittedlocation;

  if (editorVideo != undefined)  {
    article.video = "/assets/videos/uploads/" + editorVideo.name;
  }

  article.topics = submittedtopics;
  article.tags = submittedtags;
  article.shorttext = submittedshorttext;
  //article.richtext = submittedcontent;

  //console.log(article);
  //console.log(article);
  //console.log(editorVideo);
  articleString = JSON.stringify(article);
  //console.log(articleString);
  const formData = new FormData();
  formData.append("article", articleString);

    formData.append("image", editorVideo, editorVideo.name);


  const options = {
    method: 'Post',
    /*headers: {
      'Content-Type': 'application/json'
    },*/
    body: formData
  };

  fetch("/api", options);

  /*
    function getFile() {
      fetch('/artikel/articlelist.json')
        .then(response => response.json())
        .then(userlist => {
         //console.log(userlist);
        });
    }*/

}

function tutorialSubmit(submittedtitle, submittedimage, submittedtags, submittedshorttext, submittedcontent, submittedsteps) {
  /*
  const article = {
    "postid": 1,
    "posturl": "",
    "title": "Tutorial 1 ist richtig geil",
    "author": "anonym",
    "tags": [],
    "image": "g",
    "shorttext": "",
    "richtext": "",
    "steps": [
      {
        "image": "",
        "heading": "",
        "content": ""
      }
    ]
  };
*/



  const article = {
    "postid": 1,
    "posturl": "",
    "title": "",
    "author": "anonym",
    "tags": [ ],
    "image": "",
    "shorttext": "",
    "richtext": "",
    "steps": [{
        "image": "",
        "heading": "",
        "content": ""
      },
      {
        "heading": "",
        "content": ""
      }
    ]
  };

  article.title = submittedtitle;

  if (submittedimage === undefined) {} else {
    article.image = "/assets/images/" + submittedimage.name;
  }

  article.tags = submittedtags;
  article.shorttext = submittedshorttext;
  article.richtext = submittedcontent;

  article.mediatype = "tutorial";

  //console.log(submittedsteps);
  article.steps = submittedsteps;

  //console.log(article);


  //console.log(articleString);
  const formData = new FormData();

  if (submittedimage === undefined) {} else {
    formData.append("image", submittedimage, submittedimage.name);
  }

  stepImages = [];
  submittedsteps.forEach((step, i) => {
    if (step.image != undefined) {
      formData.append("image", step.image, step.image.name);
      article.steps[i].image = true;
      //stepImages.push(step.image);
      //console.log(stepImages);
    } else {
      article.steps[i].image = false;
    }
  });

  articleString = JSON.stringify(article);
  formData.append("article", articleString);

  //console.log(article);
  //formData.append("stepImages", stepImages);

  //console.log(formData);

  const options = {
    method: 'Post',
    /*headers: {
      'Content-Type': 'application/json'
    },*/
    body: formData
  };

  fetch("/api", options);
}
