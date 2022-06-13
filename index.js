const express = require("express");
const app = express();

const fs = require('fs');

const multer = require("multer");

const port = 3000;

app.listen(port, () => console.log("server listening at port " + port));



app.use(express.static("public"));

app.use(express.json({
  limit: "1mb"
}))


app.use(express.urlencoded({
  extended: true
}));

const storage = multer.diskStorage({
  destination: "public/assets/images/uploads/",
  filename: function(req, file, cb) {
    //const postid = 0;
    cb(null, Math.round(Math.random() * 1E9) + file.originalname);
  }
});

const upload = multer({
  storage: storage
});


//get User Input
app.post("/api", upload.any("image"), (request, response, cb) => {
  //console.log(JSON.parse(request.body.article).steps.length);
  //console.log(request.files.length);

  //console.log(request.files);

  //console.log(JSON.parse(request.body.article));

  //Check mediatype
  mediatype = JSON.parse(request.body.article).mediatype;

  if (mediatype == "artikel") {
    fileWriterArticle(request);
  }

  if (mediatype == "video") {
    fileWriterVideo(request);
  }

  if (mediatype == "photo") {
    fileWriterPhoto(request);
  }

  if (mediatype == "map") {
    fileWriterMap(request);
  }

  if (mediatype == "tutorial") {
    fileWriterTutorial(request);
  }


  response.json({
    status: 'success'
  });

});




//Update Database
function fileWriterArticle(request) {
  var data = request.body.article;
  //console.log(JSON.parse(data));

  data = JSON.parse(data);


  const fileName = "./public/Artikel/articlelist.json";
  const file = require(fileName);

  //New ID
  //console.log(file.articles.length);

  newentryID = getNewPostIDArticle();

  data.postid = newentryID;
  console.log(request.files);
  if (request.files[0] == undefined) {} else {
    imagepath = request.files[0].destination.replace("public", "");
    data.image = imagepath + request.files[0].filename;
  }





  //New URL
  titledash = titlecleaner(data);
  posturl = "/Artikel/" + newentryID + "-" + titledash + ".html";
  data.posturl = posturl;


  //console.log(data);

  //Append Entry
  filecontentArray = JSON.stringify(file.articles);
  filecontentArray = JSON.parse(filecontentArray);



  filecontentArray.push(data);
  filecontent = JSON.stringify(filecontentArray, null, 2);


  //Create Page
  if (data.topics.length == 0) {} else {
    articlepageCreator(newentryID, titledash, data);

    fs.writeFile("public/Artikel/articlelist.json", "{\"articles\":" + filecontent + "}", (err) => {
      if (err) {
        throw err;
      }
    });
  }


}

function fileWriterVideo(request) {
  var data = request.body.article;
  //console.log(JSON.parse(data));
  video = request.files[0];
  console.log(video);
  console.log(data);

  data = JSON.parse(data);
  //console.log(data);

  //create Thumbnail


  const fileName = "./public/Artikel/articlelist.json";
  const file = require(fileName);

  newentryID = getNewPostIDArticle();
  data.postid = newentryID;

  videopath = video.destination.replace("public", "");
  data.video = videopath + video.filename;

  titledash = titlecleaner(data);
  posturl = "/Artikel/" + newentryID + "-" + titledash + ".html";
  data.posturl = posturl;

  console.log(data);

  //Append Entry
  filecontentArray = JSON.stringify(file.articles);
  filecontentArray = JSON.parse(filecontentArray);



  filecontentArray.push(data);
  filecontent = JSON.stringify(filecontentArray, null, 2);

  console.log(filecontent);

  console.log(newentryID);
  console.log(titledash);
  console.log(data);


  //Create Page
  if (data.topics.length == 0) {} else {
  videopageCreator(newentryID, titledash, data);




    fs.writeFile("public/Artikel/articlelist.json", "{\"articles\":" + filecontent + "}", (err) => {
      if (err) {
        throw err;
      }
    });
  }

}

function fileWriterPhoto(request) {
  console.log(request.body.article);
  //console.log(request.files);

  data = request.body.article;

  gallery = request.files;

  data = JSON.parse(data);

  galleryArray = [];

  gallery.forEach((image, i) => {
    //console.log(image);
    imagelink = image.destination.replace("public", "");
    galleryArray.push(imagelink+image.filename);
  });


  console.log(galleryArray);
  data.gallerypath = galleryArray;



  const fileName = "./public/Artikel/articlelist.json";
  const file = require(fileName);

  newentryID = getNewPostIDArticle();
  data.postid = newentryID;

  console.log(data);

  titledash = titlecleaner(data);
  posturl = "/Artikel/" + newentryID + "-" + titledash + ".html";
  data.posturl = posturl;


  filecontentArray = JSON.stringify(file.articles);
  filecontentArray = JSON.parse(filecontentArray);

  filecontentArray.push(data);
  filecontent = JSON.stringify(filecontentArray, null, 2);

  //Create Page
  if (data.topics.length == 0) {} else {
    photopageCreator(newentryID, titledash, data);




  fs.writeFile("public/Artikel/articlelist.json", "{\"articles\":" + filecontent + "}", (err) => {
      if (err) {
        throw err;
      }
    });
  }

}

function fileWriterMap(request) {
  var data = request.body.article;

  data = JSON.parse(data);

  const fileName = "./public/map/maplist.json";
  const file = require(fileName);

  console.log(file);

  if(file.mappoints.length == 0) {
    newentryID = 1;
  } else {
    var lastentry = file.mappoints[file.mappoints.length - 1];
    lastentry = parseInt(lastentry.mapnodeid);

    newentryID = lastentry + 1;
  }


  console.log(newentryID);

  data.mapnodeid = newentryID;

  console.log(request.files);
  if (request.files[0] == undefined) {} else {
    imagepath = request.files[0].destination.replace("public", "");
    data.image = imagepath + request.files[0].filename;
  }

  titledash = titlecleaner(data);
  posturl = "/Artikel/" + newentryID + "-" + titledash + ".html";
  data.posturl = posturl;

  console.log(data);


  filecontentArray = JSON.stringify(file.mappoints);
  filecontentArray = JSON.parse(filecontentArray);

  filecontentArray.push(data);
  filecontent = JSON.stringify(filecontentArray, null, 2);

  console.log(filecontent);

  if (data.topics.length == 0) {} else {
    //mappageCreator(newentryID, titledash, data);

    fs.writeFile("public/map/maplist.json", "{\"mappoints\":" + filecontent + "}", (err) => {
      if (err) {
        throw err;
      }
    });
  }

}

function fileWriterTutorial(request) {


  uploadedTutorial =JSON.parse(request.body.article);

  titleimagecheck = false;
  if(uploadedTutorial.image == ""){
    titleimagecheck = false;
  } else {
    titleimagecheck = true;
  }

  //console.log(titleimagecheck);
  //console.log(uploadedTutorial);

  /*uploadedTutorial = {
    "postid": 1,
    "posturl": "",
    "title": "Tutorial 1 ist richtig geil",
    "author": "anonym",
    "tags": [
      "feministischer kampftag",
      "b ndnis 8. m rz"
    ],
    "image": "/assets/images/uploads/1-269989217220308-femkampftag-039.jpg",
    "shorttext": "Dieser Artikel ist sooo Sinnbildlich für die außerordentlich gute Gestaltung dieser Website",
    "richtext": "Dieser Artikel ist sooo Sinnbildlich für die außerordentlich gute Gestaltung dieser WebsiteDieser Artikel ist sooo Sinnbildlich für die außerordentlich gute Gestaltung dieser WebsiteDieser Artikel ist sooo Sinnbildlich für die außerordentlich gute Gestaltung dieser WebsiteDieser Artikel ist sooo Sinnbildlich für die außerordentlich gute Gestaltung dieser WebsiteDieser Artikel ist sooo Sinnbildlich für die außerordentlich gute Gestaltung dieser WebsiteDieser Artikel ist sooo Sinnbildlich für die außerordentlich gute Gestaltung dieser WebsiteDieser Artikel ist sooo Sinnbildlich für die außerordentlich gute Gestaltung dieser WebsiteDieser Artikel ist sooo Sinnbildlich für die außerordentlich gute Gestaltung dieser Website",
    "steps": [{
      "image": "/assets/images/uploads/1-269989217220308-femkampftag-039.jpg",
      "heading": "Lorem ipsum dolor sit amet.",
      "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores placeat similique eius, nihil perferendis sed delectus dolorem, officia officiis rem ut in earum distinctio quisquam. Assumenda doloribus, aperiam odio dolorem placeat dicta? Expedita deserunt asperiores commodi suscipit, quae ea quas vero impedit dicta. Consequuntur iure deleniti ullam enim sunt, cupiditate, labore error aliquid ad doloremque sit maxime, in nisi nam culpa impedit voluptas! Omnis totam, doloribus consequatur ea corporis, culpa veniam! Quasi, odio corrupti. Incidunt eligendi similique ratione explicabo, itaque quaerat obcaecati. Illum corrupti deleniti corporis, sint voluptatum iste, cumque laboriosam perferendis officiis dolores facere nulla tempore ratione voluptatem voluptate. "
    }, {
      "heading": "Lorem ipsum dolor sit amet.",
      "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores placeat similique eius, nihil perferendis sed delectus dolorem, officia officiis rem ut in earum distinctio quisquam. Assumenda doloribus, aperiam odio dolorem placeat dicta? Expedita deserunt asperiores commodi suscipit, quae ea quas vero impedit dicta. Consequuntur iure deleniti ullam enim sunt, cupiditate, labore error aliquid ad doloremque sit maxime, in nisi nam culpa impedit voluptas! Omnis totam, doloribus consequatur ea corporis, culpa veniam! Quasi, odio corrupti. Incidunt eligendi similique ratione explicabo, itaque quaerat obcaecati. Illum corrupti deleniti corporis, sint voluptatum iste, cumque laboriosam perferendis officiis dolores facere nulla tempore ratione voluptatem voluptate. "
    }]
  }*/

  data = uploadedTutorial;

  const fileName = "./public/tutorials/tutoriallist.json";
  //console.log(fileName);
  const file = require(fileName);

  if(file.tutorials.length == 0) {
    newentryID = 1;
  } else {
    var lastentry = file.tutorials[file.tutorials.length - 1];
    lastentry = parseInt(lastentry.postid);

    newentryID = lastentry + 1;
  }

  //console.log(newentryID);

  data.postid = newentryID;

  //Handle Uploaded Files
console.log(request.files);
imageposition = 0;
if(titleimagecheck){
  console.log(request.files[imageposition]);
  imagedest = request.files[imageposition].destination.replace("public", "");
  data.image = imagedest+request.files[imageposition].filename;
  imageposition++;
  data.steps.forEach((step, i) => {
    if(step.image){
      imagedest = request.files[imageposition].destination.replace("public", "");
        data.steps[i].image = imagedest+request.files[imageposition].filename;
        imageposition++;
    }
  });
} else {
  console.log(data.steps);
  data.steps.forEach((step, i) => {
    if(step.image){
      imagedest = request.files[imageposition].destination.replace("public", "");
        data.steps[i].image = imagedest+request.files[imageposition].filename;
        imageposition++;
    }
  });

}

console.log(data);

  //New url
 titleclean = titlecleaner(data);
 posturl = "tutorials/tutorial.html?postid="+data.postid;
 data.posturl = posturl;


 //Append newentryID
 filecontentArray = JSON.stringify(file.tutorials);
 filecontentArray = JSON.parse(filecontentArray);
 //console.log(filecontent);

 filecontentArray.push(data);
 filecontent = JSON.stringify(filecontentArray, null, 2);

 //console.log(filecontent);

 //Create Page

 fs.writeFile("public/tutorials/tutoriallist.json", "{\"tutorials\":" + filecontent + "}", (err) => {
   if (err) {
     throw err;
   }
 });
}

function articlepageCreator(newentryID, titledash, data) {
  fs.readFile("public/artikel/0-articlebase.html", "utf-8", function(err, content) {
    if (err) {
      return console.log(err);
    }
    //console.log(content);
    //console.log(data.title);

    title = data.title;
    author = data.author;
    date = data.date;
    location = data.location;
    topics = data.topics;
    tags = data.tags;
    image = data.image;
    shorttext = data.shorttext;
    richtext = data.richtext;


    //post
    //Image
    //console.log(image);

    imageMarkup = "<img src='" + image + "' alt=''>"

    //console.log(imageMarkup);

    //Topiclist
    topicMarkup = "";

    lasttopic = 1;
    topics.forEach(topic => {
      if (lasttopic === 1) {
        topicLower = topic.toLowerCase();
        topicClass = "tagtopic-" + topicLower;
        //console.log(topicClass);
      }
      if (lasttopic === topics.length) {
        topicMarkup = topicMarkup.concat("<span>" + topic.toLowerCase() + "<span>")
        //console.log(topicMarkup);

      } else {
        topicMarkup = topicMarkup.concat("<span>" + topic.toLowerCase() + "<span> | ")
        //console.log(topicMarkup);
        lasttopic++;
      }
    });

    const currentColor = currentColorFunc(topics);

    //Replace content
    content = content.replace(/\"\+currentColor\+\"/g, currentColor);
    content = content.replace(/\"\+image\+\"/g, imageMarkup);
    content = content.replace(/\"\+title\+\"/g, title);
    content = content.replace(/\"\+author\+\"/g, author);
    content = content.replace(/\"\+date\+\"/g, date);
    content = content.replace(/\"\+articlelocation\+\"/g, location);
    content = content.replace(/\"\+topicMarkup\+\"/g, topicMarkup);
    content = content.replace(/\"\+shorttext\+\"/g, shorttext);
    content = content.replace(/\"\+content\+\"/g, richtext);

    fs.writeFile("public/" + posturl, content, function(err) {
      if (err) throw err;
      console.log("saved " + newentryID + "-" + titleclean + ".html");
    });
  });
}

function videopageCreator(newentryID, titledash, data) {
  fs.readFile("public/artikel/0-articlebase.html", "utf-8", function(err, content) {
    if (err) {
      return console.log(err);
    }
    //console.log(content);
    //console.log(data.title);

    title = data.title;
    author = data.author;
    date = data.date;
    location = data.location;
    topics = data.topics;
    tags = data.tags;
    video = data.video;
    shorttext = data.shorttext;



    //post
    //Image
    //console.log(image);

    videoMarkup = "<video controls> <source src='" + video + "' type='video/mp4'></video>";

    console.log(videoMarkup);

    //console.log(imageMarkup);

    //Topiclist
    topicMarkup = "";

    lasttopic = 1;
    topics.forEach(topic => {
      if (lasttopic === 1) {
        topicLower = topic.toLowerCase();
        topicClass = "tagtopic-" + topicLower;
        //console.log(topicClass);
      }
      if (lasttopic === topics.length) {
        topicMarkup = topicMarkup.concat("<span>" + topic.toLowerCase() + "<span>")
        //console.log(topicMarkup);

      } else {
        topicMarkup = topicMarkup.concat("<span>" + topic.toLowerCase() + "<span> | ")
        //console.log(topicMarkup);
        lasttopic++;
      }
    });

    const currentColor = currentColorFunc(topics);

    //Replace content
    content = content.replace(/\"\+currentColor\+\"/g, currentColor);
    content = content.replace(/\"\+image\+\"/g, videoMarkup);
    content = content.replace(/\"\+title\+\"/g, title);
    content = content.replace(/\"\+author\+\"/g, author);
    content = content.replace(/\"\+date\+\"/g, date);
    content = content.replace(/\"\+articlelocation\+\"/g, location);
    content = content.replace(/\"\+topicMarkup\+\"/g, topicMarkup);
    content = content.replace(/\"\+shorttext\+\"/g, shorttext);
    content = content.replace(/\"\+content\+\"/g, "");

    fs.writeFile("public/" + posturl, content, function(err) {
      if (err) throw err;
      console.log("saved " + newentryID + "-" + titleclean + ".html");
    });
  });
}

function photopageCreator(newentryID, titledash, data) {
  fs.readFile("public/artikel/0-photobase.html", "utf-8", function(err, content) {
    if (err) {
      return console.log(err);
    }



    title = data.title;
    author = data.author;
    date = data.date;
    location = data.location;
    topics = data.topics;
    tags = data.tags;
    gallery = data.gallerypath;
    shorttext = data.shorttext;


    console.log(data);

    galleryMarkup = "";

    gallery.forEach((image, i) => {
      imagepath = "<img src='"+image+"'>";
      galleryMarkup += imagepath;
    });

console.log(galleryMarkup);

//Topiclist
topicMarkup = "";

lasttopic = 1;
topics.forEach(topic => {
  if (lasttopic === 1) {
    topicLower = topic.toLowerCase();
    topicClass = "tagtopic-" + topicLower;
    //console.log(topicClass);
  }
  if (lasttopic === topics.length) {
    topicMarkup = topicMarkup.concat("<span>" + topic.toLowerCase() + "<span>")
    //console.log(topicMarkup);

  } else {
    topicMarkup = topicMarkup.concat("<span>" + topic.toLowerCase() + "<span> | ")
    //console.log(topicMarkup);
    lasttopic++;
  }
});


const currentColor = currentColorFunc(topics);

//Replace content
content = content.replace(/\"\+currentColor\+\"/g, currentColor);
content = content.replace(/\"\+image\+\"/g, galleryMarkup);
content = content.replace(/\"\+title\+\"/g, title);
content = content.replace(/\"\+author\+\"/g, author);
content = content.replace(/\"\+date\+\"/g, date);
content = content.replace(/\"\+articlelocation\+\"/g, location);
content = content.replace(/\"\+topicMarkup\+\"/g, topicMarkup);
content = content.replace(/\"\+shorttext\+\"/g, shorttext);
content = content.replace(/\"\+content\+\"/g, "");

console.log(content);
console.log(data);


    /*
    <img src="/assets/images/uploads/574662106220325-FFF-1.jpg" alt=""><img src="/assets/images/uploads/574662106220325-FFF-1.jpg" alt=""><img src="/assets/images/uploads/574662106220325-FFF-1.jpg" alt=""><img src="/assets/images/uploads/574662106220325-FFF-1.jpg" alt=""><img src="/assets/images/uploads/574662106220325-FFF-1.jpg" alt=""><img src="/assets/images/uploads/574662106220325-FFF-1.jpg" alt=""><img src="/assets/images/uploads/574662106220325-FFF-1.jpg" alt=""><img src="/assets/images/uploads/574662106220325-FFF-1.jpg" alt="">*/


    fs.writeFile("public/" + posturl, content, function(err) {
      if (err) throw err;
      console.log("saved " + newentryID + "-" + titleclean + ".html");
    });


  });
}

/*
function   mappageCreator(newentryID, titledash, data) {
  fs.readFile("public/map/map.html", "utf-8", function(err, content) {
    if (err) {
      return console.log(err);
    }

    title = data.title;
    date = data.date;
    time = data.time;
    city = data.city;
    place = data.place;
    address = data.address;
    latlong = data.latlong;
    topics= data.topics;
    markertype = data.markertype;
    eventtype = data.eventtype;
    body = data.content;
    shorttext = data.shorttext;
    adinfo = data.info;

    if(data.image != undefined){
      imageMarkup = "<img src='" + data.image + "' alt=''>";
    } else {
      imageMarkup = "";
    }

    topicMarkup = "";

    lasttopic = 1;
    topics.forEach(topic => {
      if (lasttopic === 1) {
        topicLower = topic.toLowerCase();
        topicClass = "tagtopic-" + topicLower;
        //console.log(topicClass);
      }
      if (lasttopic === topics.length) {
        topicMarkup = topicMarkup.concat("<span>" + topic.toLowerCase() + "<span>")
        //console.log(topicMarkup);

      } else {
        topicMarkup = topicMarkup.concat("<span>" + topic.toLowerCase() + "<span> | ")
        //console.log(topicMarkup);
        lasttopic++;
      }
    });

    const currentColor = currentColorFunc(topics);


      content = content.replace(/\"\+image\+\"/g, imageMarkup);

    content = content.replace(/\"\+city\+\"/g, city);
    if(markertype == "event"){
      content = content.replace(/\"\+eventtype\+\"/g, eventtype);
    }else {
      content = content.replace(/\"\+markertype\+\"/g, markertype);
    }

    content = content.replace(/\"\+title\+\"/g, title);

    content = content.replace(/\"\+shorttext\+\"/g, shorttext);
    content = content.replace(/\"\+content\+\"/g, body);

    if(data.address == "undefined"){
      content = content.replace(/\"\+address\+\"/g, data.city);
    }else {
      content = content.replace(/\"\+address\+\"/g, data.city + " "+ data.address);
    }


    content = content.replace(/\"\+additionalInfo\+\"/g, adinfo);

    content = content.replace(/\"\+date\+\"/g, date);
    content = content.replace(/\"\+time\+\"/g, time);


    console.log(content);



    fs.writeFile("public/"+posturl, content, function(err){
        if(err) throw err;
        console.log("saved " + newentryID + "-" + titleclean + ".html");
    });


  });
}*/

function getNewPostIDArticle() {
  const fileName = "./public/Artikel/articlelist.json";
  const file = require(fileName);

  //New ID
  //console.log(file.articles.length);

  if (file.articles.length == 0) {
    newentryID = 1;
    return newentryID;

  } else {
    var lastentry = file.articles[file.articles.length - 1];
    lastentry = parseInt(lastentry.postid);

    newentryID = lastentry + 1;


    return newentryID;
  }
}

function currentColorFunc(topics) {
  //console.log(topics[0]);
  currentColor = topics[0];
  return currentColor;
}

function titlecleaner(data) {
  const title = data.title;
  const titledash = title.replace(/ /g, "-");

  titleclean = titledash.replace(/[^a-zA-Z0-9 -]/g, "");

  return titleclean;
}





//temp Images
const tempstorage = multer.diskStorage({
  destination: "public/assets/images/uploads/temp/",
  filename: function(req, file, cb) {
    //const postid = 0;
    cb(null, Math.round(Math.random() * 1E9) + file.originalname);
  }
});

const tempupload = multer({
  storage: tempstorage
});

app.post("/temp", tempupload.any("image"), (request, response, cb) => {
  //console.log(request.files[0]);

  imagepath = request.files[0].destination.replace("public", "") + request.files[0].filename;

  console.log(imagepath);

  response.json({
    status: 'success',
    addedfile: imagepath
  });
});

/*
const switchStorage = multer.diskStorage({
  destination: "public/assets/images/uploads/temp/fileswitch/",
  filename: function(req, file, cb) {
    //const postid = 0;
    cb(null, Math.round(Math.random() * 1E9) + file.originalname);
  }
});

const fileswitch = multer({
  storage: switchStorage
});
*/

app.post("/fileswitch", (request, response,cb) => {
  imagelist = request.body.urlList;

  imagelist.forEach((image, i) => {
    currentURL = image.replace("http://localhost:3000", "public");
    newURL = image.replace("http://localhost:3000", "public").replace("/temp/","/");

    fs.rename(currentURL, newURL, ()=> {
      console.log("file moved");
    })
  });


  response.json({
    status: 'success',
});
});

setInterval(clearTemp, 600000);

function clearTemp(){

  console.log("clearing temp");

  fs.readdir("public/assets/images/uploads/temp",(err, files) => {
    if (err)
    console.log(err);
  else {
    //console.log(files);
    files.forEach((file, i) => {
      fs.unlink("public/assets/images/uploads/temp/"+ file, ()=>{
        console.log("deleted " + file);
      });
    });

  }
  })
  /*
  fs.rmdir("/public/assets/images/uploads/temp", () => {
    console.log("temp clear");
    fs.mkdir("/public/assets/images/uploads/temp/fileswitch", ()=>{
      console.log("temp restored");
    });
  });
*/
}




//Check IP Address

app.post("/ipcheck", function(req,res){
console.log(req.ip);


res.json({
  ip: req.ip
});

});
