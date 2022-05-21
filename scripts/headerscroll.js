if (window.innerWidth <= 1250) {

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

            if (intersectcheck === true) {
                //console.log("switch");

                header.classList.remove("headerswitch");
                headercheck = false;
            }
            if (intersectcheck === false) {
                if (window.innerWidth <= 1250) {
                    //console.log("start");
                    header.classList.add("headerswitch");
                    headercheck = true;
                }
            }
        })
    }, sectionOneOptions);

    sectionOneObserver.observe(sectionOne);
} else {
    header.classList.remove("headerswitch");
}

visualViewport.addEventListener('resize', function () {
    if (window.innerWidth <= 1250) {

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

                if (intersectcheck === true) {
                    //console.log("switch");

                    header.classList.remove("headerswitch");
                    headercheck = false;
                }
                if (intersectcheck === false) {
                    //console.log("start");
                    if (window.innerWidth <= 1250) {
                        header.classList.add("headerswitch");
                        headercheck = true;
                    }
                }
            })
        }, sectionOneOptions);

        sectionOneObserver.observe(sectionOne);
    } else {
        header.classList.remove("headerswitch");
    }
});
