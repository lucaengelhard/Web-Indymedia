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

const user = {
    "id": 1,
    "name": "John Doe",
    "age": 22
};

const options = {
  method: 'Post',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(user)
};

fetch("/api", options);

function getFile(){
  fetch('/nodefiletest/user.json')
  .then(response => response.json())
  .then(userlist => {
    console.log(userlist);
  });
}
