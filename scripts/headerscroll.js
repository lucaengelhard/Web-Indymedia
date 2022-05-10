const header = document.querySelector("header");
const sectionOne = document.querySelector("#landing");

const sectionOneOptions = {
    rootMargin: "-200px 0px 0px 0px"
};

var intersectcount = 0;

var statecheck = 0;

const sectionOneObserver = new IntersectionObserver(function (entries, sectionOneObserver) {
    entries.forEach(entry => {
        if (!entries.isIntersecting) {
            if (intersectcount == 0) {
                intersectcount++;
                //console.log(intersectcount);
            } else {
                if (statecheck == 0) {
                    header.classList.add("headerswitch");
                    intersectcount++;
                    //console.log(intersectcount);
                    statecheck = 1;
                    //console.log(statecheck);
                } else {
                    header.classList.remove("headerswitch");
                    intersectcount++;
                    //console.log(intersectcount);
                    statecheck = 0;
                    //console.log(statecheck);
                }
            }
        }
    })
}, sectionOneOptions);

sectionOneObserver.observe(sectionOne);
