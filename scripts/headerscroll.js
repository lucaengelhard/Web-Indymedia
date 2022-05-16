const header = document.querySelector("header");
const sectionOne = document.querySelector("#landing");

headerheight = header.offsetHeight;

const sectionOneOptions = {
    rootMargin: "-56px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function (entries, sectionOneObserver) {
    entries.forEach(entry => {

        intersectcheck = entry.isIntersecting;
        //console.log(intersectcheck);

        if (intersectcheck === false) {
            //console.log("switch");
            header.classList.add("headerswitch");
            document.getElementById("logogap").style.color = "white";
        }
        if (intersectcheck === true) {
            //console.log("start");
            header.classList.remove("headerswitch");
            document.getElementById("logogap").style.color = "black";
        }
    })
}, sectionOneOptions);

sectionOneObserver.observe(sectionOne);
