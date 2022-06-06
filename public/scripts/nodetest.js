var submittedcontent = postSubmit();

document.getElementById("editor-submit-button").onclick = function() {
  postSubmit();
  articleSubmit(submittedcontent);
}

function postSubmit() {
  editorElement = document.getElementById("editor-richtext");

  submittedcontent = editorElement.innerHTML;
  return submittedcontent;
}

function articleSubmit(submittedcontent) {
  console.log(submittedcontent);

  const article = {
    "postid": "8",
    "posturl": "",
    "featured": true,
    "mediatype": "artikel",
    "title": "Alle zusammen gegen ihre% Repression?",
    "author": "anonym",
    "date": "16.04.22",
    "location": "Lübeck",
    "topics": ["FemiNIsmus", "arbeit", "antifa"],
    "tags": ["repression", "danni", "peter", "aktionsbericht"],
    "image": "../assets/images/landingimage.png",
    "shorttext": "Die studentische Veranstaltungsgruppe „Politik & Popcorn“ der Universität zu Lübeck hat am vergangenen Montag zur anstehenden Landtagswahl in Schleswig-Holstein Vertreter*innen aus der Politik zu einer",
    "richtext": ""
  };

  article.richtext = submittedcontent;

  console.log(article);

  const options = {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(article)
  };

  fetch("/api", options);

  function getFile() {
    fetch('../artikel/articlelist.json')
      .then(response => response.json())
      .then(userlist => {
        console.log(userlist);
      });
  }

}
