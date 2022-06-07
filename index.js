const express = require("express");
const fs = require('fs');
const app = express();

const port = 3000;

var buffer = new Buffer.alloc(6000);



app.listen(port, () => console.log("server listening at port " + port));

app.use(express.static("public"));
app.use(express.json({
  limit: "1mb"
}))


//get User Input
app.post("/api", (request, response) => {
  filewriter(request);

  response.json({
    status: 'success'
  });

});


//Update Database
function filewriter(request) {
  var data = request.body;


  const fileName = "./public/Artikel/articlelist.json";
  const file = require(fileName);

  //New ID
  //console.log(file.articles.length);

if(file.articles.length == 0) {
  newentryID = 1;
  data.postid = newentryID;
} else {
  var lastentry = file.articles[file.articles.length - 1];
  lastentry = parseInt(lastentry.postid);

  newentryID = lastentry + 1;
  data.postid = newentryID;
}


  //New URL
  const title = data.title;
  const titledash = title.replace(/ /g, "-");

  //console.log(titledash);

  titleclean = titledash.replace(/[^a-zA-Z0-9 -]/g, "");
  //console.log(titleclean);


  posturl = "/Artikel/" + newentryID + "-" + titleclean + ".html";
  //console.log(posturl);

  data.posturl = ".."+posturl;





  //Append Entry
  filecontentArray = JSON.stringify(file.articles);
  filecontentArray = JSON.parse(filecontentArray);



  filecontentArray.push(data);
  filecontent = JSON.stringify(filecontentArray, null, 2);


  //Create Page

  articlepageCreator(newentryID, titledash, data);

    fs.writeFile("public/Artikel/articlelist.json", "{\"articles\":" + filecontent + "}", (err) => {
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


//Image
    //console.log(image);

    imageMarkup = "<img src='"+image+"' alt=''>"

//console.log(imageMarkup);

    //Topiclist
    topicMarkup = "";

    lasttopic = 1;
    topics.forEach(topic => {
      if (lasttopic === 1) {
        topicLower = topic.toLowerCase();
        topicClass = "tagtopic-" + topicLower;
        currentColor = topicLower;
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
      if(err) throw err;
      console.log("saved " + newentryID +"-"+ titleclean+".html");
    });
  });
}
