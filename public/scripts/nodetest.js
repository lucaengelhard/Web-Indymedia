/*async function getList() {
  const articlelist = await fetch('/Artikel/articlelist.json')
  const articlelistJSON = await articlelist.json();

  //console.log(articlelistJSON);

  const options = {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(articlelistJSON)
  };

  const response = await fetch("/api", options)
  console.log(response);
}
*/

const article = {
    "postid": "8",
    "posturl": "",
    "featured": false,
    "mediatype": "artikel",
    "title": "Alle zusammen gegen ihre% Repression?",
    "author": "anonym",
    "date": "16.04.22",
    "location": "Lübeck",
    "topics": ["FemiNIsmus", "arbeit","antifa"],
    "tags": ["repression", "danni", "peter", "aktionsbericht"],
    "image": "../assets/images/landingimage.png",
    "shorttext": "Die studentische Veranstaltungsgruppe „Politik & Popcorn“ der Universität zu Lübeck hat am vergangenen Montag zur anstehenden Landtagswahl in Schleswig-Holstein Vertreter*innen aus der Politik zu einer"
};

const options = {
  method: 'Post',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(article)
};

fetch("/api", options);

function getFile(){
  fetch('/nodefiletest/articlelist.json')
  .then(response => response.json())
  .then(userlist => {
    console.log(userlist);
  });
}
