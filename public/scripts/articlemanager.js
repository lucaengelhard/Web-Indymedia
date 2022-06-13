const overviewlist = document.querySelector(".articleoverview-list");

fetch("/artikel/articlelist.json")
  .then(res => res.json())
  .then(data => {
    //console.log(data);

    articles = data.articles;

    articles.forEach((article, i) => {

      topicMarkup = "";

      article.topics.forEach((topic, i) => {
        overviewlasttop = article.topics.length == i + 1;
        if (!overviewlasttop) {
          topicMarkup = topicMarkup.concat("<span>" + topic + "</span> | ")
        } else {
          topicMarkup = topicMarkup.concat("<span>" + topic + "</span>")
        }

        //console.log(topicMarkup);
      });

      if (article.featured) {
        overviewlist.insertAdjacentHTML("afterbegin", "<li data-postid='"+article.postid+"'><div class='overview-content'><div class='overview-author'>" + article.author + "</div>  <a href='"+article.posturl+"'> <div class='overview-title'>"+article.title+"</div>  </a>     <div class='overview-shorttext'>" + article.shorttext + "</div>      <div class='overview-topics'>" + topicMarkup + "</div>    </div>    <div class='overview-featured'>      <input type='checkbox' name='featuredcheck' value='' class='overview-featured-check' id='"+article.postid +"checkbox' checked>      <label for='"+article.postid +"checkbox' class='overview-featured-button'>featured</label>    </div>  </li>");
      } else {
        overviewlist.insertAdjacentHTML("afterbegin", "<li data-postid='"+article.postid+"'><div class='overview-content'><div class='overview-author'>"+article.author+"</div> <a href='"+article.posturl+"'> <div class='overview-title'>"+article.title+"</div>  </a>    <div class='overview-shorttext'>"+article.shorttext+"</div>      <div class='overview-topics'>"+topicMarkup+"</div>    </div>    <div class='overview-featured'>      <input type='checkbox' name='featuredcheck' value='' class='overview-featured-check' id='"+article.postid +"checkbox'>      <label for='"+article.postid +"checkbox' class='overview-featured-button'>featured</label>    </div>  </li>");
      }
    });

    overviewArticles = Array.from(overviewlist.children);
    console.log(overviewArticles);

    overviewArticles.forEach((article, i) => {
      featuredbutton = article.querySelector(".overview-featured-button");
      console.log(featuredbutton);

      featuredbutton.onclick = e => {
        clickedbutton = e.target;
        clickedarticleid = clickedbutton.parentElement.parentElement.dataset.postid;

        clickedcheckbox = clickedbutton.parentElement.querySelector(".overview-featured-check");
        checkboxchecked = !clickedcheckbox.checked;

        noimage=false;

        articles.forEach((article, i) => {
          if(article.postid == parseInt(clickedarticleid)){
            if(article.image ==""){
              noimage=true;
            }
          }
        });

        console.log(noimage);

        if(checkboxchecked){
          if(noimage){
            quoteinput = prompt("Um Artikel ohne Titelbild zu featuren, braucht es ein einprägsames Zitat aus dem Artikel");
            console.log(quoteinput);

            if(quoteinput != "" && quoteinput != null){
              featuredswitch = {
                "postid": clickedarticleid,
                "featuredswitch": checkboxchecked,
                "quote": quoteinput
              }
            } else {
              return
            }


          }else {
            featuredswitch = {
              "postid": clickedarticleid,
              "featuredswitch": checkboxchecked
            }
          }
        } else {
          featuredswitch = {
            "postid": clickedarticleid,
            "featuredswitch": checkboxchecked
          }
        }






        console.log(featuredswitch);

        featuredsubmit = JSON.stringify(featuredswitch);

        console.log(featuredsubmit);
        const options = {
          method: 'Post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: featuredsubmit
        };

        fetch("/featuredswitch", options)
        .then(res => res.json())
        .then(response => {
          console.log(response);
        })

      }

    });

  });
