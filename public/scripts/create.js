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

elements.forEach((element, i) => {
  element.addEventListener("click", () => {
    let command = element.dataset["element"];
    if (command == "createLink" || command == "insertImage") {
      let url = prompt("URL eingeben", "https://")
      document.execCommand(command, false, url);
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
  });
});


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
    console.log(mediatype);
    try {
      var submittedtitle = postTitle();
      var submittedimage = postImage();
      var submittedtopics = postTopics();
      var submittedtags = postTags();
      var submittedshorttext = postShorttext();
      var submittedcontent = postBody();
      var submitteddate = postDate();
      var submittedlocation = postLocation();

      articleSubmit(submittedtitle, submittedimage, submittedtopics, submittedtags, submittedshorttext, submittedcontent, submitteddate, submittedlocation);
    } catch (e) {
      alert(e);
    }
  }

  if (mediatype == "video") {
    console.log(mediatype);
    try {
      var submittedtitle = postTitle();
      var submittedvideo = postVideo();
      var submittedtopics = postTopics();
      var submittedtags = postTags();
      var submittedshorttext = postShorttext();
      var submittedcontent = postBody();
      var submitteddate = postDate();
      var submittedlocation = postLocation();

      videoSubmit(submittedtitle, submittedvideo, submittedtopics, submittedtags, submittedshorttext, submittedcontent, submitteddate, submittedlocation);
    } catch (e) {
      alert(e);
    }
  }

  if (mediatype == "photo") {
    console.log(mediatype);
    try {
      var submittedtitle = postTitle();
      var submittedgallery = postGallery();
      var submittedtopics = postTopics();
      var submittedtags = postTags();
      var submittedshorttext = postShorttext();
      var submittedcontent = postBody();
      var submitteddate = postDate();
      var submittedlocation = postLocation();

      photoSubmit(submittedtitle, submittedgallery, submittedtopics, submittedtags, submittedshorttext, submittedcontent, submitteddate, submittedlocation);
    } catch (e) {
      alert(e);
    }
  }

  if (mediatype == "map") {
    console.log(mediatype);
    try {
      var submittedtitle = postTitle();
      var submittedimage = postImage();
      var submittedtopics = postTopics();
      var submittedtags = postTags();
      var submittedshorttext = postShorttext();
      var submittedcontent = postBody();
      var submittedinfo = postInfo();
      var submitteddate = postDate();
      var submittedlocation = postLocation();

      mapSubmit(submittedtitle, submittedimage, submittedtopics, submittedtags, submittedshorttext, submittedcontent, submittedinfo, submitteddate, submittedlocation);
    } catch (e) {
      alert(e);
    }
  }

  if (mediatype == "tutorial") {
    console.log(mediatype);
    try {
      var submittedtitle = postTitle();
      var submittedimage = postImage();
      var submittedtopics = postTopics();
      var submittedtags = postTags();
      var submittedshorttext = postShorttext();
      var submittedcontent = postBody();
      var submitteddate = postDate();
      var submittedlocation = postLocation();

      mapSubmit(submittedtitle, submittedimage, submittedtopics, submittedtags, submittedshorttext, submittedcontent, submitteddate, submittedlocation);
    } catch (e) {
      alert(e);
    }
  }

}

function postBody() {
  editorElement = document.getElementById("editor-richtext");
  submittedcontent = editorElement.innerHTML;

  if (editorElement.innerText.length === 0) {
    throw "Content braucht dein Artikel schon :)"
  } else {
    return submittedcontent;
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

function postVideo() {
  editorVideo = document.getElementById("editor-titleimage-input");
  editorVideo = editorVideo.files;
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

  console.log(onTopics.length);

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

const locationSearch = document.getElementById("editor-user-location");
const locationList = document.getElementById("editor-user-location-list");
const locationLabel = document.getElementById("editor-user-location-label");

//console.log(locationSearch.value);

const searchCities = async searchText => {
  //console.log("searching");
  const res = await fetch("../map/zipcodes.de.json");
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

locationSearch.addEventListener("input", () => searchCities(locationSearch.value));



function articleSubmit(submittedtitle, submittedimage, submittedtopics, submittedtags, submittedshorttext, submittedcontent, submitteddate, submittedlocation) {
  //console.log(submittedtitle);
  //console.log(submittedimage);
  //console.log(submittedtopics);
  //console.log(submittedshorttext);
  //console.log(submittedcontent);
  //console.log(submittedtags);
  console.log(submittedlocation);

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
    article.image = "../assets/images/" + submittedimage.name;
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
      fetch('../artikel/articlelist.json')
        .then(response => response.json())
        .then(userlist => {
         //console.log(userlist);
        });
    }*/

}

function VideoSubmit(submittedtitle, submittedvideo, submittedtopics, submittedtags, submittedshorttext, submittedcontent, submitteddate, submittedlocation) {
  //console.log(submittedtitle);
  //console.log(submittedimage);
  //console.log(submittedtopics);
  //console.log(submittedshorttext);
  //console.log(submittedcontent);
  //console.log(submittedtags);
  console.log(submittedlocation);

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
    "video": "",
    "shorttext": "",
    "richtext": ""
  };

  article.title = submittedtitle;

  article.date = submitteddate;
  article.location = submittedlocation;

  if (submittedimage === undefined) {} else {
    article.video = "../assets/videos/uploads/" + submittedvideo.name;
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
    formData.append("video", submittedvideo, submittedvideo.name);
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
      fetch('../artikel/articlelist.json')
        .then(response => response.json())
        .then(userlist => {
         //console.log(userlist);
        });
    }*/

}
