tablist = document.getElementsByClassName("landing-tab");

function landingSwap(element) {

    for (let i = 0; i < tablist.length; i++) {
        //console.log(tablist[i]);
        currentCheck = tablist[i].classList.contains("landing-current")
        //console.log(currentCheck);
        if (currentCheck === true) {
            tablist[i].classList.remove("landing-current");
        }
    }

    element.classList.add("landing-current");
}


//Landing Resizer

viewportsizeLanding = window.innerWidth;
landingArray = Array.prototype.slice.call(document.getElementsByClassName("landing-img"));

if (viewportsizeLanding >= 921) {
    referenceelement = document.getElementById("arbeit");
    referenceparent = referenceelement.parentElement;

    referncestyle = referenceparent.currentStyle || window.getComputedStyle(referenceparent);

    refMarginL = referncestyle.marginLeft;
    refWidthAdd = referenceelement.querySelector(".article-image").clientWidth;

    //console.log(refMarginL);
    //console.log(refWidthAdd);

    leftwidth = parseFloat(refMarginL) + refWidthAdd;
    leftwidthString = leftwidth.toString() + "px";

    //console.log(landingArray);

    landingArray.forEach(landingObject => {
        //console.log(leftwidthString);
        landingObject.style.width = leftwidthString;
        landingObject.style.maxWidth = leftwidthString;
        //console.log(landingObject.clientWidth);
    });
} else {
    landingArray.forEach(landingObject => {
        landingObject.removeAttribute("style");
    });
    //.removeAttribute("style")
}



visualViewport.addEventListener('resize', function () {
    viewportsizeLanding = window.innerWidth;

    if (viewportsizeLanding >= 921) {
        referenceelement = document.getElementById("arbeit");
        referenceparent = referenceelement.parentElement;

        referncestyle = referenceparent.currentStyle || window.getComputedStyle(referenceparent);

        refMarginL = referncestyle.marginLeft;
        refWidthAdd = referenceelement.querySelector(".article-image").clientWidth;

        //console.log(refMarginL);
        //console.log(refWidthAdd);

        leftwidth = parseFloat(refMarginL) + refWidthAdd;
        leftwidthString = leftwidth.toString() + "px";

        landingArray = Array.prototype.slice.call(document.getElementsByClassName("landing-img"));

        //console.log(landingArray);

        landingArray.forEach(landingObject => {
            //console.log(leftwidthString);
            landingObject.style.width = leftwidthString;
            landingObject.style.maxWidth = leftwidthString;
            //console.log(landingObject.clientWidth);
        });
    } else {
        landingArray.forEach(landingObject => {
            landingObject.removeAttribute("style");
        });
    }

});
