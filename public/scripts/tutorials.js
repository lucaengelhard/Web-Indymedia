tutorialSearch = document.getElementById("tutorial-search-input");

columnLeft = document.getElementById("column-left");
columnRight = document.getElementById("column-right");
articleText = document.getElementById("article-text");

tutorialSearch.addEventListener("input", searchInput);

tutorialInitial();


function searchInput(input){
  input = tutorialSearch.value;
  //console.log(input);

  fetch('/tutorials/tutoriallist.json')
  .then(res => res.json())
  .then(tutoriallist => {
    tutorials = tutoriallist.tutorials;
    tutorialFiltered = [];
    if(input.length != 0){
    tutorials.forEach((tutorial, i) => {
      input = input.toLowerCase();

      titlecheck = false;
      if(tutorial.title.toLowerCase().includes(input)){
        titlecheck = true;
      }

      shorttextcheck = false;
      if(tutorial.shorttext.toLowerCase().includes(input)){
        shorttextcheck = true;
      }

      richtextcheck = false;
      if(tutorial.richtext.toLowerCase().includes(input)){
        richtextcheck = true;
      }

      if(titlecheck || shorttextcheck || richtextcheck){
        tutorialFiltered.push(tutorial.postid);
      }
    });

    searchBuilder(tutorialFiltered, tutorials);

  } else {
    //Alle anzeigen
    tutorials.forEach((tutorial, i) => {
      tutorialFiltered.push(tutorial.postid);
    });

    searchBuilder(tutorialFiltered, tutorials);
  }
  });
}

function searchBuilder(tutorialFiltered, tutorials){
  //console.log(tutorialFiltered);
  //console.log(tutorials);

  columnLeft.innerHTML = "";
  columnRight.innerHTML = "";
  articleText.innerHTML = "";
  columnSwitch = 0;
  tutorials.forEach((tutorial, i) => {


    if(tutorialFiltered.includes(tutorial.postid)){
      if(tutorial.image == ""){
        //console.log("noimage");

        //Arikel Einbauen
        articleText.insertAdjacentHTML("beforeend", "<article id='"+tutorial.postid+"' class='post-text' title='"+tutorial.title+"'> <a class='article-link' href='"+tutorial.posturl+"'><h4><span class='post-author'>"+tutorial.author+"</span></h4><h1>"+tutorial.title+"</h1><p>"+tutorial.shorttext+"</p></a><a class='morebutton' href='"+tutorial.posturl+"'><p>mehr &gt;&gt;</p></a></article>");
      } else {
        //console.log("image");

        //Artikel Einbauen
        if(columnSwitch == 0){
          columnLeft.insertAdjacentHTML("beforeend", "<article id='"+tutorial.postid+"' class='post-image' title='"+tutorial.title+"'> <a class='article-link' href='"+tutorial.posturl+"'><img src='"+tutorial.image+"'><h4><span class='post-author'>"+tutorial.author+"</span></h4><h1>"+tutorial.title+"</h1><p>"+tutorial.shorttext+"</p></a><a class='morebutton' href='"+tutorial.posturl+"'><p>mehr &gt;&gt;</p></a></article>");
          columnSwitch = 1;
        } else {
          columnRight.insertAdjacentHTML("beforeend", "<article id='"+tutorial.postid+"' class='post-image' title='"+tutorial.title+"'> <a class='article-link' href='"+tutorial.posturl+"'><img src='"+tutorial.image+"'><h4><span class='post-author'>"+tutorial.author+"</span></h4><h1>"+tutorial.title+"</h1><p>"+tutorial.shorttext+"</p></a><a class='morebutton' href='"+tutorial.posturl+"'><p>mehr &gt;&gt;</p></a></article>");
          columnSwitch = 0;
        }

      }
    }
  });


}


//Initial
function tutorialInitial() {
  let url = window.location.href;
  let params = (new URL(url)).searchParams;

  //console.log(params.get("tutorialSearch"));

  tutorialSearch.value = params.get("tutorialSearch");

  searchInput();
}
