function filterdprint(filteredArticleList){
  console.log(filteredArticleList);


//get article list
fetch('/Artikel/articlelist.json')
  .then(response => response.json())
  .then(articlelist => {
    // Do something with your data
    console.log(filteredArticleList);
    let i = 0;
    columnswap = 0;
    featuredCounter = 0;
    articlelist.articles.slice().reverse().forEach(article => {
      //console.log(filteredArticleList);

      //Parse JSON
      postid = articlelist.articles[i].postid;
      posturl = articlelist.articles[i].posturl;
      featured = articlelist.articles[i].featured;
      mediatype = articlelist.articles[i].mediatype;
      title = articlelist.articles[i].title;
      author = articlelist.articles[i].author;
      date = articlelist.articles[i].date;
      articlelocation = articlelist.articles[i].location;
      topics = articlelist.articles[i].topics;
      tags = articlelist.articles[i].tags;
      imageurl = articlelist.articles[i].image;
      video = article.video;
      shorttext = articlelist.articles[i].shorttext;

      //console.log(article);

      if (filteredArticleList.includes(articlelist.articles[i].postid)) { //Topics to Markup
        //console.log(topics);
        topicMarkup = "";

        lasttopic = 1;
        topics.forEach(topic => {
          //console.log(lasttopic);
          if (lasttopic === 1) {
            topicLower = topic.toLowerCase();
            topicClass = "tagtopic-" + topicLower;
            //console.log(topicClass);
          }
          if (lasttopic == topics.length) {
            topicMarkup = topicMarkup.concat("<span>" + topic.toLowerCase() + "<span>")
            //console.log(topicMarkup);

          } else {
            topicMarkup = topicMarkup.concat("<span>" + topic.toLowerCase() + "<span> | ")
            //console.log(topicMarkup);
            lasttopic++;
          }

        });

        //Implement in Page

        articleImage = document.getElementsByClassName("article-image");
        columnLeft = document.getElementsByClassName("column-left");
        columnRight = document.getElementsByClassName("column-right");
        articleText = document.getElementsByClassName("article-text");

        if (mediatype == "artikel") {
          if (imageurl == "") {
            //console.log("noimage");
            articleText[0].insertAdjacentHTML("afterbegin", "<article id='" + postid + "' class='post-text " + topicClass + "' title='" + title + "'><a class='article-link' href='" + posturl + "'><div class='subtitle'><span class='post-author'>" + author + "</span> | <span class='post-date'>" + date + "</span> | <span class='post-location'>" + articlelocation + "</span> </div> <h1>" + title + "</h1> <div class='post-tags subtitle'>" + topicMarkup + "</div> <p>" + shorttext + " </p> <a class='morebutton' href='" + posturl + "'> <p>mehr >></p>  </a> </a> </article>");
          } else {
            if (featured == true && featuredCounter <= 0) {
              articleImage[0].insertAdjacentHTML("afterbegin", "<article id='" + postid + "' class='featured-post " + topicClass + "' title='" + title + "'><a class='article-link' href='" + posturl + "'><img src='" + imageurl + "'><div class='subtitle'><span class='post-author'>" + author + "</span> | <span class='post-date'>" + date + "</span> | <span class='post-location'>" + articlelocation + "</span> </div> <h1>" + title + "</h1> <div class='post-tags subtitle'>" + topicMarkup + "</div> <p>" + shorttext + " </p> <a class='morebutton' href='" + posturl + "'> <p>mehr >></p>  </a> </a> </article>");

              featuredCounter++;

            } else {
              if (columnswap == 0) {
                columnLeft[0].insertAdjacentHTML("afterbegin", "<article id='" + postid + "' class='post-image " + topicClass + "' title='" + title + "'><a class='article-link' href='" + posturl + "'><img src='" + imageurl + "'><div class='subtitle'><span class='post-author'>" + author + "</span> | <span class='post-date'>" + date + "</span> | <span class='post-location'>" + articlelocation + "</span> </div> <h1>" + title + "</h1> <div class='post-tags subtitle'>" + topicMarkup + "</div> <p>" + shorttext + " </p> <a class='morebutton' href='" + posturl + "'> <p>mehr >></p>  </a> </a> </article>");

                //console.log("links");

                columnswap = 1;
              } else {
                columnRight[0].insertAdjacentHTML("afterbegin", "<article id='" + postid + "' class='post-image " + topicClass + "' title='" + title + "'><a class='article-link' href='" + posturl + "'><img src='" + imageurl + "'><div class='subtitle'><span class='post-author'>" + author + "</span> | <span class='post-date'>" + date + "</span> | <span class='post-location'>" + articlelocation + "</span> </div> <h1>" + title + "</h1> <div class='post-tags subtitle'>" + topicMarkup + "</div> <p>" + shorttext + " </p> <a class='morebutton' href='" + posturl + "'> <p>mehr >></p>  </a> </a> </article>");

                //console.log("rechts");

                columnswap = 0;
              }

            }
          }
        } else {
          if (article.mediatype == "video") {
            if (featured == true && featuredCounter <= 0) {
              articleImage[0].insertAdjacentHTML("afterbegin", "<article id='" + postid + "' class='featured-post " + topicClass + "' title='" + title + "'><a class='article-link' href='" + posturl + "'><video controls> <source src='" + video + "' type='video/mp4'></video><div class='subtitle'><span class='post-author'>" + author + "</span> | <span class='post-date'>" + date + "</span> | <span class='post-location'>" + articlelocation + "</span> </div> <h1>" + title + "</h1> <div class='post-tags subtitle'>" + topicMarkup + "</div> <p>" + shorttext + " </p> <a class='morebutton' href='" + posturl + "'> <p>mehr >></p>  </a> </a> </article>");

              featuredCounter++;

            } else {
              if (columnswap == 0) {
                columnLeft[0].insertAdjacentHTML("afterbegin", "<article id='" + postid + "' class='post-image " + topicClass + "' title='" + title + "'><a class='article-link' href='" + posturl + "'><video controls> <source src='" + video + "' type='video/mp4'></video><div class='subtitle'><span class='post-author'>" + author + "</span> | <span class='post-date'>" + date + "</span> | <span class='post-location'>" + articlelocation + "</span> </div> <h1>" + title + "</h1> <div class='post-tags subtitle'>" + topicMarkup + "</div> <p>" + shorttext + " </p> <a class='morebutton' href='" + posturl + "'> <p>mehr >></p>  </a> </a> </article>");

                //console.log("links");

                columnswap = 1;
              } else {
                columnRight[0].insertAdjacentHTML("afterbegin", "<article id='" + postid + "' class='post-image " + topicClass + "' title='" + title + "'><a class='article-link' href='" + posturl + "'><video controls> <source src='" + video + "' type='video/mp4'></video><div class='subtitle'><span class='post-author'>" + author + "</span> | <span class='post-date'>" + date + "</span> | <span class='post-location'>" + articlelocation + "</span> </div class='subtitle'> <h1>" + title + "</h1> <div class='post-tags'>" + topicMarkup + "</div> <p>" + shorttext + " </p> <a class='morebutton' href='" + posturl + "'> <p>mehr >></p>  </a> </a> </article>");

                //console.log("rechts");

                columnswap = 0;
              }
            }


          } else {
            if (article.featured == true && featuredCounter <= 0) {
              articleImage[0].insertAdjacentHTML("afterbegin", "<article id='" + article.postid + "' class='featured-post " + topicClass + "' title='" + article.title + "'><a class='article-link' href='" + article.posturl + "'><img src='" + article.gallerypath[0] + "'><div class='subtitle'><span class='post-author'>" + article.author + "</span> | <span class='post-date'>" + article.date + "</span> | <span class='post-location'>" + article.location + "</span> </div> <h1>" + article.title + "</h1> <div class='post-tags subtitle'>" + topicMarkup + "</div> <p>" + article.shorttext + " </p> <a class='morebutton' href='" + article.posturl + "'> <p>mehr >></p>  </a> </a> </article>");

              featuredCounter++;
            } else {
              if (columnswap == 0) {
                columnLeft[0].insertAdjacentHTML("afterbegin", "<article id='" + article.postid + "' class='post-image " + topicClass + "' title='" + article.title + "'><a class='article-link' href='" + article.posturl + "'><img src='" + article.gallerypath[0] + "'><div class='subtitle'><span class='post-author'>" + article.author + "</span> | <span class='post-date'>" + article.date + "</span> | <span class='post-location'>" + article.location + "</span> </div> <h1>" + article.title + "</h1> <div class='post-tags subtitle'>" + topicMarkup + "</div> <p>" + article.shorttext + " </p> <a class='morebutton' href='" + article.posturl + "'> <p>mehr >></p>  </a> </a> </article>");

                //console.log("links");



                columnswap = 1;
              } else {

                columnRight[0].insertAdjacentHTML("afterbegin", "<article id='" + article.postid + "' class='post-image " + topicClass + "' title='" + article.title + "'><a class='article-link' href='" + article.posturl + "'><img src='" + article.gallerypath[0] + "'><div class='subtitle'><span class='post-author'>" + article.author + "</span> | <span class='post-date'>" + article.date + "</span> | <span class='post-location'>" + article.location + "</span> </div> <h1>" + article.title + "</h1> <div class='post-tags subtitle'>" + topicMarkup + "</div> <p>" + article.shorttext + " </p> <a class='morebutton' href='" + article.posturl + "'> <p>mehr >></p>  </a> </a> </article>");

                //console.log("rechts");
                columnswap = 0;

              }

            }
          }


        }


      }






      i++;
    });

    const postTagsDiv = Array.from(document.querySelectorAll(".post-tags"));

    //console.log(postTagsDiv);

    postTagsDiv.forEach((div, i) => {
      Array.from(div.querySelectorAll("span")).forEach((tag, i) => {
        tag.style.textTransform="capitalize";
      });
    });





  });}

  //Tags Uppercase
