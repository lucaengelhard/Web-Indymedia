tablist = currentSelect = document.getElementsByClassName("landing_tab");

function testFunction(element) {

    for (let i = 0; i < tablist.length; i++) {
        //console.log(tablist[i]);
        currentCheck = tablist[i].classList.contains("landing_current")
        // console.log(currentCheck);
        if (currentCheck === true) {
            tablist[i].classList.remove("landing_current");
        }
    }

    element.classList.add("landing_current");
}
