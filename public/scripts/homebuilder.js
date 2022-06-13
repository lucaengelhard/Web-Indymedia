fetch("/artikel/articlelist.json")
.then(res => res.json())
.then(response => {

  topics = {
    "arbeit": [],
    "sozial": [],
    "oekologie": [],
    "kultur": [],
    "militarismus": [],
    "antifa": [],
    "feminismus": [],
    "rassismus": [],
    "sonstige": [],
  }

  articles = response.articles;
  //console.log(articles);

  //console.log(Object.keys(topics));

  Object.keys(topics).forEach((key, i) => {
    //console.log(key, topics[key]);
    articles.forEach((article, i) => {
      topicCheck = article.topics.includes(key);
      //console.log(key +" "+ topicCheck);

      if(topicCheck){
        topics[key].push(article.postid);
      }
    });
  });

  //console.log(topics);


  const sectionList = Array.from(document.querySelectorAll(".section-topic"));

  //console.log(sectionList);

  const landing = document.querySelector(".landing");
  landingCounter = 0;
  articles.slice().reverse().forEach((article, i) => {
    console.log(article);
    if(landingCounter <= 2 && article.featured){

      if(article.image != ""){
        landing.insertAdjacentHTML("beforeend", "<article class='landing-tab tagtopic-"+article.topics[0]+"' onclick='landingSwap(this)'>        <div class='landing-img'><img src='"+article.image+"' alt=''></div>        <div class='landing-text'>          <h4>            <span class='post-author'>"+article.author+"</span> |            <span class='post-date'>"+article.date+"</span> |            <span class='post-location'>"+article.location+"</span>          </h4>          <h1>"+article.title+"</h1>          <p>"+article.shorttext+"          </p>          <a class='morebutton' href='"+article.posturl+"'>            <p>mehr >></p>          </a>        </div>      </article>");
      } else {
        landing.insertAdjacentHTML("beforeend", "<article class='landing-tab tagtopic-"+article.topics[0]+"' onclick='landingSwap(this)'>          <div class='landing-img'><div class='landing-quotebox'><img src='/assets/elements/quotewhite.svg'><span class='landingquote'>"+article.quote+"</span></div></div>          <div class='landing-text'>            <h4>              <span class='post-author'>"+article.author+"</span> |              <span class='post-date'>"+article.date+"</span> |              <span class='post-location'>"+article.location+"</span>            </h4>            <h1>"+article.title+"</h1>            <p>"+article.shorttext+"            </p>            <a class='morebutton' href='"+article.posturl+"'>              <p>mehr >></p>            </a>          </div>        </article>");
      }



      landingCounter++
    }

  });

  landinglist = Array.from(landing.children);

  console.log(landinglist);

  landinglist[0].classList.add("landing-current");



  sectionList.forEach((section, i) => {
    const articleImage = section.querySelector(".article-image");
    const columnLeft = section.querySelector(".column-left");
    const columnRight = section.querySelector(".column-right");
    const articleText = section.querySelector(".article-text");

    //console.log(section.id);

    //console.log(articleImage);
    //console.log(columnLeft);
    //console.log(columnRight);
    //console.log(articleText);

    articlestoprint = Object.entries(topics)[i][1];

    //console.log(articlestoprint);

    featuredCounter = 0;
    noImageCounter = 0;
    imageCounter = 0;

    columnswap = 0;

    articles.slice().reverse().forEach((article, i) => {
      if(articlestoprint.includes(article.postid)){
        //console.log(article);

        topicMarkup = "";

        lasttopic = 1;
        article.topics.forEach(topic => {
          //console.log(lasttopic);
          if (lasttopic === 1) {
            topicLower = topic.toLowerCase();
            topicClass = "tagtopic-" + section.id;
            //console.log(topicClass);
          }
          if (lasttopic == article.topics.length) {
            topicMarkup = topicMarkup.concat("<span>" + topic.toLowerCase() + "<span>")
            //console.log(topicMarkup);

          } else {
            topicMarkup = topicMarkup.concat("<span>" + topic.toLowerCase() + "<span> | ")
            //console.log(topicMarkup);
            lasttopic++;
          }

        });

        //console.log(topicMarkup);

        article.postid;
        article.posturl;
        article.featured;
        article.mediatype;
        article.title;
        article.author;
        article.date;
        article.location;
        article.topics;
        article.tags;
        article.image;
        article.video;
        article.shorttext;












        if(article.mediatype == "artikel"){
          //console.log(article.image);
          if(article.image == ""){

            if(article.featured && featuredCounter <= 0){
              articleImage.insertAdjacentHTML("afterbegin", "<article id='" + article.postid + "' class='post-text " + topicClass + "' title='" + article.title + "'><a class='article-link' href='" + article.posturl + "'><div class='featured-quote'><div>"+article.quote+"</div></div><h4><span class='post-author'>" + article.author + "</span> | <span class='post-date'>" + article.date + "</span> | <span class='post-location'>" + article.location + "</span> </h4> <h1>" + article.title + "</h1> <h4 class='post-tags'>" + topicMarkup + "</h4> <p>" + article.shorttext + " </p> <a class='morebutton' href='" + article.posturl + "'> <p>mehr >></p>  </a> </a> </article>");

              featuredCounter++;

            } else if (noImageCounter <= 4) {
              articleText.insertAdjacentHTML("beforeend", "<article id='" + article.postid + "' class='post-text " + topicClass + "' title='" + article.title + "'><a class='article-link' href='" + article.posturl + "'><h4><span class='post-author'>" + article.author + "</span> | <span class='post-date'>" + article.date + "</span> | <span class='post-location'>" + article.location + "</span> </h4> <h1>" + article.title + "</h1> <h4 class='post-tags'>" + topicMarkup + "</h4> <p>" + article.shorttext + " </p> <a class='morebutton' href='" + article.posturl + "'> <p>mehr >></p>  </a> </a> </article>");

              noImageCounter++;
            }
          } else {
            if(article.featured == true && featuredCounter <= 0){
              articleImage.insertAdjacentHTML("afterbegin", "<article id='" + article.postid + "' class='featured-post " + topicClass + "' title='" + article.title + "'><a class='article-link' href='" + article.posturl + "'><img src='" + article.image + "'><h4><span class='post-author'>" + article.author + "</span> | <span class='post-date'>" + article.date + "</span> | <span class='post-location'>" + article.location + "</span> </h4> <h1>" + article.title + "</h1> <h4 class='post-tags'>" + topicMarkup + "</h4> <p>" + article.shorttext + " </p> <a class='morebutton' href='" + article.posturl + "'> <p>mehr >></p>  </a> </a> </article>");

              featuredCounter++;
            } else {
              if(article.image != ""){
                if (columnswap == 0 && imageCounter <= 12) {
                  columnLeft.insertAdjacentHTML("beforeend", "<article id='" + article.postid + "' class='post-image " + topicClass + "' title='" + article.title + "'><a class='article-link' href='" + article.posturl + "'><img src='" + article.image + "'><h4><span class='post-author'>" + article.author + "</span> | <span class='post-date'>" + article.date + "</span> | <span class='post-location'>" + article.location + "</span> </h4> <h1>" + article.title + "</h1> <h4 class='post-tags'>" + topicMarkup + "</h4> <p>" + article.shorttext + " </p> <a class='morebutton' href='" + article.posturl + "'> <p>mehr >></p>  </a> </a> </article>");

                  //console.log(article.postid +" "+article.image);
                  imageCounter++;
                  columnswap = 1;
                } else {
                  if(imageCounter <= 12){
                    columnRight.insertAdjacentHTML("beforeend", "<article id='" + article.postid + "' class='post-image " + topicClass + "' title='" + article.title + "'><a class='article-link' href='" + article.posturl + "'><img src='" + article.image + "'><h4><span class='post-author'>" + article.author + "</span> | <span class='post-date'>" + article.date + "</span> | <span class='post-location'>" + article.location + "</span> </h4> <h1>" + article.title + "</h1> <h4 class='post-tags'>" + topicMarkup + "</h4> <p>" + article.shorttext + " </p> <a class='morebutton' href='" + article.posturl + "'> <p>mehr >></p>  </a> </a> </article>");

                    imageCounter++;
                    columnswap = 0;
                    //console.log(article.postid +" "+article.image);
                  }

                }
              }
              }

          }
        }else {
          if(article.mediatype == "video") {
            if (article.featured == true && featuredCounter <= 0) {
              articleImage.insertAdjacentHTML("afterbegin", "<article id='" + article.postid + "' class='featured-post " + topicClass + "' title='" + article.title + "'><a class='article-link' href='" + article.posturl + "'><video controls> <source src='" + article.video + "' type='video/mp4'></video><h4><span class='post-author'>" + article.author + "</span> | <span class='post-date'>" + article.date + "</span> | <span class='post-location'>" + article.location + "</span> </h4> <h1>" + article.title + "</h1> <h4 class='post-tags'>" + topicMarkup + "</h4> <p>" + article.shorttext + " </p> <a class='morebutton' href='" + article.posturl + "'> <p>mehr >></p>  </a> </a> </article>");

              featuredCounter++;

            } else {
              if (columnswap == 0 && imageCounter <= 12) {
                columnLeft.insertAdjacentHTML("beforeend", "<article id='" + article.postid + "' class='post-image " + topicClass + "' title='" + article.title + "'><a class='article-link' href='" + article.posturl + "'><video controls> <source src='" + article.video + "' type='video/mp4'></video><h4><span class='post-author'>" + article.author + "</span> | <span class='post-date'>" + article.date + "</span> | <span class='post-location'>" + article.location + "</span> </h4> <h1>" + article.title + "</h1> <h4 class='post-tags'>" + topicMarkup + "</h4> <p>" + article.shorttext + " </p> <a class='morebutton' href='" + article.posturl + "'> <p>mehr >></p>  </a> </a> </article>");

                //console.log("links");


                imageCounter++;
                columnswap = 1;
              } else {
                if(imageCounter <= 12){
                columnRight.insertAdjacentHTML("beforeend", "<article id='" + article.postid + "' class='post-image " + topicClass + "' title='" + article.title + "'><a class='article-link' href='" + article.posturl + "'><video controls> <source src='" + article.video + "' type='video/mp4'></video><h4><span class='post-author'>" + article.author + "</span> | <span class='post-date'>" + article.date + "</span> | <span class='post-location'>" + article.location + "</span> </h4> <h1>" + article.title + "</h1> <h4 class='post-tags'>" + topicMarkup + "</h4> <p>" + article.shorttext + " </p> <a class='morebutton' href='" + article.posturl + "'> <p>mehr >></p>  </a> </a> </article>");

                //console.log("rechts");

                imageCounter++;

                columnswap = 0;
              }
              }

            }
          }
          else {
            if (article.featured == true && featuredCounter <= 0) {
              articleImage.insertAdjacentHTML("afterbegin", "<article id='" + article.postid + "' class='featured-post " + topicClass + "' title='" + article.title + "'><a class='article-link' href='" + article.posturl + "'><img src='" + article.gallerypath[0] + "'><h4><span class='post-author'>" + article.author + "</span> | <span class='post-date'>" + article.date + "</span> | <span class='post-location'>" + article.location + "</span> </h4> <h1>" + article.title + "</h1> <h4 class='post-tags'>" + topicMarkup + "</h4> <p>" + article.shorttext + " </p> <a class='morebutton' href='" + article.posturl + "'> <p>mehr >></p>  </a> </a> </article>");

              featuredCounter++;

            } else {
              if (columnswap == 0 && imageCounter <= 12) {
                columnLeft.insertAdjacentHTML("beforeend", "<article id='" + article.postid + "' class='post-image " + topicClass + "' title='" + article.title + "'><a class='article-link' href='" + article.posturl + "'><img src='" + article.gallerypath[0] + "'><h4><span class='post-author'>" + article.author + "</span> | <span class='post-date'>" + article.date + "</span> | <span class='post-location'>" + article.location + "</span> </h4> <h1>" + article.title + "</h1> <h4 class='post-tags'>" + topicMarkup + "</h4> <p>" + article.shorttext + " </p> <a class='morebutton' href='" + article.posturl + "'> <p>mehr >></p>  </a> </a> </article>");

                //console.log("links");


                imageCounter++;
                columnswap = 1;
              } else {
                if(imageCounter <= 12){
                columnRight.insertAdjacentHTML("beforeend", "<article id='" + article.postid + "' class='post-image " + topicClass + "' title='" + article.title + "'><a class='article-link' href='" + article.posturl + "'><img src='" + article.gallerypath[0] + "'><h4><span class='post-author'>" + article.author + "</span> | <span class='post-date'>" + article.date + "</span> | <span class='post-location'>" + article.location + "</span> </h4> <h1>" + article.title + "</h1> <h4 class='post-tags'>" + topicMarkup + "</h4> <p>" + article.shorttext + " </p> <a class='morebutton' href='" + article.posturl + "'> <p>mehr >></p>  </a> </a> </article>");

                //console.log("rechts");

                imageCounter++;

                columnswap = 0;
              }
              }

            }
          }

        }

      }
    });

    //console.log(section);
    /*
    articleText.insertAdjacentHTML("beforeend", "<div class='post-reminder "+topicClass+"'><h1>Hier könnte dein Beitrag stehen</h1><button class='reminder-button' type'button' onclick='alert('alerta')'>Beitrag schreiben</button></div></div><div class='more-topic '"+topicClass+"><a href='/artikel.html?search=&placesearch=&locationrange=0&filter-topiccheck-"+section.id+"=on&tagsearch=&confirm=Auswahl+bestätigen' class='morebutton'><p>weiterlesen >></p></a></div>")*/

/*
    <div class="post-reminder tagtopic-arbeit">
      <h1>Hier könnte dein Beitrag stehen</h1>
      <button class="reminder-button" type="button" onclick="alert('Alerta')">Beitrag schreiben</button>
    </div>
    </div>
    <div class="more-topic tagtopic-arbeit"><a href="#" class="morebutton">
      <p>weiterlesen >></p>
    </a></div>*/

  });

  /*
  articles.forEach((article, i) => {
    console.log(article);
    console.log(topicArray);

    topicArray.forEach((topic, i) => {
      //console.log(topic);
      topicCheck = article.topics.includes(topic);

      topicCheckString = topic + " " + topicCheck
      console.log(topicCheckString);

      if(topicCheck){

      }
    });


  });*/

})
