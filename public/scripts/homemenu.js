//Hompage Menu Position

menumargin = 30;

viewportsize = window.innerWidth;
//console.log(viewportsize);
menu = document.getElementById("homepage-menu");

if (viewportsize >= 1251) {

    var p = document.getElementById("antifa");
    p = p.parentElement;
    var style = p.currentStyle || window.getComputedStyle(p);

    //console.log(style.marginLeft);

    space = style.marginLeft;

    spaceNumber = parseFloat(space);
    //console.log(spaceNumber);

    menuwidth = spaceNumber - menumargin;
    //console.log(menuwidth);

    menuwidthstring = menuwidth.toString() + "px";
    //console.log(menuwidthstring);

    menu = document.getElementById("homepage-menu");


    //console.log(menuwidthstring);
    menu.style.width = menuwidthstring;

} else {
    menu.removeAttribute("style");
}

visualViewport.addEventListener('resize', function () {
    viewportsize = window.innerWidth;
    if (viewportsize >= 1251) {

        var p = document.getElementById("antifa");
        p = p.parentElement;
        var style = p.currentStyle || window.getComputedStyle(p);

        //console.log(style.marginLeft);

        space = style.marginLeft;

        spaceNumber = parseFloat(space);
        //console.log(spaceNumber);

        menuwidth = spaceNumber - menumargin;
        //console.log(menuwidth);

        menuwidthstring = menuwidth.toString() + "px";
        //console.log(menuwidthstring);



        menu.style.width = menuwidthstring;
    } else {
        menu.removeAttribute("style");
    }
});



//Homemenu Colorchanger

topicList = document.getElementsByClassName("section-topic");
//console.log(topicList);

topicListArray = Array.prototype.slice.call(topicList);
//console.log(topicListArray);

landingsection = document.getElementById("landing");

const topicObserverOptions = {
    rootMargin: "150px 0px 100px 0px",
    threshold: 0.5
};

const topicObserver = new IntersectionObserver(function (observedTopics, topicObserver) {
    observedTopics.forEach(observedTopic => {

        //console.log(observedTopic.target);
        currentTopic = observedTopic.target.id;

        //console.log(currentTopic);

        //console.log(currentTopic);

        if (currentTopic == "arbeit") {
            topiclist = document.getElementsByClassName("menu-topic");
            for (let a = 0; a < topiclist.length; a++) {
                topiclist[a].classList.remove("currentTopic");
            }
            document.getElementById("arbeit-menu").classList.add("currentTopic");
            document.getElementById("nav").classList = " ";
            document.getElementById("nav").classList.add("bordercolor-arbeit");

        }

        if (currentTopic == "sozial") {
            topiclist = document.getElementsByClassName("menu-topic");
            for (let a = 0; a < topiclist.length; a++) {
                topiclist[a].classList.remove("currentTopic");
            }
            document.getElementById("sozial-menu").classList.add("currentTopic");
            document.getElementById("nav").classList = " ";
            document.getElementById("nav").classList.add("bordercolor-sozial");
        }

        if (currentTopic == "oekologie") {
            topiclist = document.getElementsByClassName("menu-topic");
            for (let a = 0; a < topiclist.length; a++) {
                topiclist[a].classList.remove("currentTopic");
            }
            document.getElementById("oekologie-menu").classList.add("currentTopic");
            document.getElementById("nav").classList = " ";
            document.getElementById("nav").classList.add("bordercolor-oekologie");

        }

        if (currentTopic == "kultur") {
            topiclist = document.getElementsByClassName("menu-topic");
            for (let a = 0; a < topiclist.length; a++) {
                topiclist[a].classList.remove("currentTopic");
            }
            document.getElementById("kultur-menu").classList.add("currentTopic");
            document.getElementById("nav").classList = " ";
            document.getElementById("nav").classList.add("bordercolor-kultur");
        }

        if (currentTopic == "militarismus") {
            topiclist = document.getElementsByClassName("menu-topic");
            for (let a = 0; a < topiclist.length; a++) {
                topiclist[a].classList.remove("currentTopic");
            }
            document.getElementById("militarismus-menu").classList.add("currentTopic");
            document.getElementById("nav").classList = " ";
            document.getElementById("nav").classList.add("bordercolor-militarismus");
        }

        if (currentTopic == "antifa") {
            topiclist = document.getElementsByClassName("menu-topic");
            for (let a = 0; a < topiclist.length; a++) {
                topiclist[a].classList.remove("currentTopic");
            }
            document.getElementById("antifa-menu").classList.add("currentTopic");
            document.getElementById("nav").classList = " ";
            document.getElementById("nav").classList.add("bordercolor-antifa");
        }

        if (currentTopic == "feminismus") {
            topiclist = document.getElementsByClassName("menu-topic");
            for (let a = 0; a < topiclist.length; a++) {
                topiclist[a].classList.remove("currentTopic");
            }
            document.getElementById("feminismus-menu").classList.add("currentTopic");
            document.getElementById("nav").classList = " ";
            document.getElementById("nav").classList.add("bordercolor-feminismus");
        }

        if (currentTopic == "rassismus") {
            topiclist = document.getElementsByClassName("menu-topic");
            for (let a = 0; a < topiclist.length; a++) {
                topiclist[a].classList.remove("currentTopic");
            }
            document.getElementById("rassismus-menu").classList.add("currentTopic");
            document.getElementById("nav").classList = " ";
            document.getElementById("nav").classList.add("bordercolor-rassismus");
        }

        if (currentTopic == "sonstige") {
            topiclist = document.getElementsByClassName("menu-topic");
            for (let a = 0; a < topiclist.length; a++) {
                topiclist[a].classList.remove("currentTopic");
            }
            document.getElementById("sonstige-menu").classList.add("currentTopic");
            document.getElementById("nav").classList = " ";
            document.getElementById("nav").classList.add("bordercolor-sonstige");
        }
    });
}, topicObserverOptions);



topicListArray.forEach(topic => {
    console.log(topic);
    topicObserver.observe(topic);
})

document.body.onload = function () {
  topiclistStart = Array.from(document.getElementsByClassName("section-topic"));
    if (window.scrollY <= 200) {

      topiclistStart.forEach((topic, i) => {
        topic.classList.remove("currentTopic");
      });
    }
};

document.body.onscroll = function () {
  topiclistStart = Array.from(document.getElementsByClassName("section-topic"));
    if (window.scrollY <= 200) {

      topiclistStart.forEach((topic, i) => {
        topic.classList.remove("currentTopic");
        document.getElementById("nav").classList = " ";
      });

    }
};
