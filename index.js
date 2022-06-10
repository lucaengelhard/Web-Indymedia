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
    const postid = getNewPostID();
    cb(null, postid + "-" + Math.round(Math.random() * 1E9) + file.originalname);
  }
});

const upload = multer({
  storage: storage
});


//get User Input
app.post("/api", upload.single("image"), (request, response, cb) => {
  console.log(JSON.parse(request.body.article).mediatype);

  //Check mediatype
  mediatype = JSON.parse(request.body.article).mediatype;

if(mediatype == "artikel") {
  fileWriterArticle(request);
}

if(mediatype == "video") {
  fileWriterVideo(request);
}

if(mediatype == "photo") {
  fileWriterPhoto(request);
}

if(mediatype == "map") {
  fileWriterMap(request);
}

if(mediatype == "tutorial") {
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

  newentryID = getNewPostID();

  data.postid = newentryID;
  console.log(request.file);
  if (request.file == undefined) {} else {
    imagepath = request.file.destination.replace("public", "..");
    data.image = imagepath + request.file.filename;
  }





  //New URL
  const title = data.title;
  const titledash = title.replace(/ /g, "-");

  //console.log(titledash);

  titleclean = titledash.replace(/[^a-zA-Z0-9 -]/g, "");
  //console.log(titleclean);


  posturl = "/Artikel/" + newentryID + "-" + titleclean + ".html";
  //console.log(posturl);

  data.posturl = ".." + posturl;


  //console.log(data);

  //Append Entry
  filecontentArray = JSON.stringify(file.articles);
  filecontentArray = JSON.parse(filecontentArray);



  filecontentArray.push(data);
  filecontent = JSON.stringify(filecontentArray, null, 2);


  //Create Page
  if (data.topics.length == 0) {
  } else {
    articlepageCreator(newentryID, titledash, data);

    fs.writeFile("public/Artikel/articlelist.json", "{\"articles\":" + filecontent + "}", (err) => {
      if (err) {
        throw err;
      }
    });
  }


}

function fileWriterVideo(request){
  var data = request.body.article;
  //console.log(JSON.parse(data));

  data = JSON.parse(data);
  console.log(data);
}

function fileWriterPhoto() {

}

function fileWriterMap() {

}

function fileWriterTutorial() {

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

function getNewPostID() {
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
