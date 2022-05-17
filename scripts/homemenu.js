viewportsize = window.innerWidth;
//console.log(viewportsize);
menu = document.getElementById("homepage_menu");
viewportsize = window.innerWidth;
if (viewportsize >= 1251) {

    var p = document.getElementById("antifa");
    p = p.parentElement;
    var style = p.currentStyle || window.getComputedStyle(p);

    //console.log(style.marginLeft);

    space = style.marginLeft;

    spaceNumber = parseFloat(space);
    //console.log(spaceNumber);

    menuwidth = spaceNumber - 16;
    //console.log(menuwidth);

    menuwidthstring = menuwidth.toString() + "px";
    //console.log(menuwidthstring);

    menu = document.getElementById("homepage_menu");

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

        menuwidth = spaceNumber - 16;
        //console.log(menuwidth);

        menuwidthstring = menuwidth.toString() + "px";
        //console.log(menuwidthstring);



        menu.style.width = menuwidthstring;
    } else {
        menu.removeAttribute("style");
    }
});

topics = document.getElementsByClassName("section_topic");
const topicOptions = {
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.3
};

let firstload = 0;


const topicObserver = new IntersectionObserver(function (topicentry, topicObserver) {
    //console.log(topicentry);

    for (let i = 0; i < topicentry.length; i++) {
        //console.log(topicentry[i].target);
        currentTopic = topicentry[i].target.id;
        //console.log(currentTopic);

        if (firstload == 9) {

            if (currentTopic == "arbeit") {
                topiclist = document.getElementsByClassName("menu_topic");
                for (let a = 0; a < topiclist.length; a++) {
                    topiclist[a].classList.remove("currentTopic");
                }
                document.getElementById("arbeit_menu").classList.add("currentTopic");
                document.getElementById("nav").classList = " ";
                document.getElementById("nav").classList.add("bordercolor_arbeit");

            }

            if (currentTopic == "sozial") {
                topiclist = document.getElementsByClassName("menu_topic");
                for (let a = 0; a < topiclist.length; a++) {
                    topiclist[a].classList.remove("currentTopic");
                }
                document.getElementById("sozial_menu").classList.add("currentTopic");
                document.getElementById("nav").classList = " ";
                document.getElementById("nav").classList.add("bordercolor_sozial");
            }

            if (currentTopic == "oekologie") {
                topiclist = document.getElementsByClassName("menu_topic");
                for (let a = 0; a < topiclist.length; a++) {
                    topiclist[a].classList.remove("currentTopic");
                }
                document.getElementById("oekologie_menu").classList.add("currentTopic");
                document.getElementById("nav").classList = " ";
                document.getElementById("nav").classList.add("bordercolor_oekologie");

            }

            if (currentTopic == "kultur") {
                topiclist = document.getElementsByClassName("menu_topic");
                for (let a = 0; a < topiclist.length; a++) {
                    topiclist[a].classList.remove("currentTopic");
                }
                document.getElementById("kultur_menu").classList.add("currentTopic");
                document.getElementById("nav").classList = " ";
                document.getElementById("nav").classList.add("bordercolor_kultur");
            }

            if (currentTopic == "militarismus") {
                topiclist = document.getElementsByClassName("menu_topic");
                for (let a = 0; a < topiclist.length; a++) {
                    topiclist[a].classList.remove("currentTopic");
                }
                document.getElementById("militarismus_menu").classList.add("currentTopic");
                document.getElementById("nav").classList = " ";
                document.getElementById("nav").classList.add("bordercolor_militarismus");
            }

            if (currentTopic == "antifa") {
                topiclist = document.getElementsByClassName("menu_topic");
                for (let a = 0; a < topiclist.length; a++) {
                    topiclist[a].classList.remove("currentTopic");
                }
                document.getElementById("antifa_menu").classList.add("currentTopic");
                document.getElementById("nav").classList = " ";
                document.getElementById("nav").classList.add("bordercolor_antifa");
            }

            if (currentTopic == "feminismus") {
                topiclist = document.getElementsByClassName("menu_topic");
                for (let a = 0; a < topiclist.length; a++) {
                    topiclist[a].classList.remove("currentTopic");
                }
                document.getElementById("feminismus_menu").classList.add("currentTopic");
                document.getElementById("nav").classList = " ";
                document.getElementById("nav").classList.add("bordercolor_feminismus");
            }

            if (currentTopic == "rassismus") {
                topiclist = document.getElementsByClassName("menu_topic");
                for (let a = 0; a < topiclist.length; a++) {
                    topiclist[a].classList.remove("currentTopic");
                }
                document.getElementById("rassismus_menu").classList.add("currentTopic");
                document.getElementById("nav").classList = " ";
                document.getElementById("nav").classList.add("bordercolor_rassismus");
            }

            if (currentTopic == "sonstige") {
                topiclist = document.getElementsByClassName("menu_topic");
                for (let a = 0; a < topiclist.length; a++) {
                    topiclist[a].classList.remove("currentTopic");
                }
                document.getElementById("sonstige_menu").classList.add("currentTopic");
                document.getElementById("nav").classList = " ";
                document.getElementById("nav").classList.add("bordercolor_sonstige");
            }
        }
    }

}, topicOptions);

for (let t = 0; t < topics.length; t++) {
    //console.log(topics[t]);
    topicObserver.observe(topics[t]);
    firstload = firstload + 1;
    //console.log(firstload);
}
