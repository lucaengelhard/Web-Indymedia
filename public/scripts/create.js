const elements = document.querySelectorAll(".btn");

elements.forEach((element, i) => {
  element.addEventListener("click", () => {
    let command = element.dataset["element"];
    if (command == "createLink" || command == "insertImage") {
      let url = prompt("URL eingeben", "https://")
      document.execCommand(command, false, url);
    } else {
      if (command == "heading") {
        console.log(command);
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




document.getElementById("editor-submit-button").onclick = function() {
  var submittedtitle = postTitle();
  var submittedimage = postImage();
  var submittedtopics = postTopics();
  var submittedshorttext = postShorttext();
  var submittedcontent = postBody();

  articleSubmit(submittedtitle, submittedimage, submittedtopics, submittedshorttext, submittedcontent);
}

function postBody() {
  editorElement = document.getElementById("editor-richtext");
  submittedcontent = editorElement.innerHTML;
  return submittedcontent;
}

function postTitle() {
  editorTitle = document.getElementById("editor-title-input");
  editorTitle = editorTitle.value;
  return editorTitle;
}

function postImage() {
  editorImage = document.getElementById("editor-titleimage-input");
  editorImage = editorImage.files;
  return editorImage[0];
}

function postTopics() {
  let onTopics = [];
  editorTopics = document.getElementById("editor-tag-wrapper");
  editorTopics = Array.from(editorTopics);


  editorTopics.forEach((tag, i) => {
    isTagOn = tag.checked;
    if (isTagOn == true) {
      onTopics.push(tag.name);
      console.log(onTopics);
    }
  });


  return onTopics;
}

function postShorttext() {
  editorShorttext = document.getElementById("editor-shorttext-input");
  editorShorttext = editorShorttext.innerHTML;
  return editorShorttext;
}

function articleSubmit(submittedtitle, submittedimage, submittedtopics, submittedshorttext, submittedcontent) {
  console.log(submittedtitle);
  console.log(submittedimage);
  console.log(submittedtopics);
  console.log(submittedshorttext);
  console.log(submittedcontent);

  const article = {
    "postid": "8",
    "posturl": "",
    "featured": false,
    "mediatype": "artikel",
    "title": "Alle zusammen gegen ihre% Repression?",
    "author": "anonym",
    "date": "16.04.22",
    "location": "Lübeck",
    "topics": ["arbeit", "antifa"],
    "tags": ["repression", "danni", "peter", "aktionsbericht"],
    "image": "",
    "shorttext": "Die studentische Veranstaltungsgruppe „Politik & Popcorn“ der Universität zu Lübeck hat am vergangenen Montag zur anstehenden Landtagswahl in Schleswig-Holstein Vertreter*innen aus der Politik zu einer",
    "richtext": ""
  };

  article.title = submittedtitle;

  if (submittedimage === undefined) {} else {
    article.image = "../assets/images/" + submittedimage.name;
  }

  article.topics = submittedtopics;
  article.shorttext = submittedshorttext;
  article.richtext = submittedcontent;

  console.log(article);

  articleString = JSON.stringify(article);
  console.log(articleString);
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
          console.log(userlist);
        });
    }*/

}
