//get Data from Submit directly
/*
function filterData() {


    var all = document.querySelectorAll("input")
    console.log(all);

    all.forEach(filterpoint => {
        console.log(filterpoint.name + " = " + filterpoint.value);
    });

}
*/
//get Data from URL
let url = window.location.href;
let params = (new URL(url)).searchParams;


search = params.get("search");

filtercheckartikel = params.get("filter-check-artikel");
filtercheckvideo = params.get("filter-check-video");
filtercheckfoto = params.get("filter-check-foto");

placesearch = params.get("placesearch");
locationrange = params.get("locationrange");

filtertopiccheckarbeit = params.get("filter-topiccheck-arbeit");
filtertopicchecksozial = params.get("filter-topiccheck-sozial");
filtertopiccheckoekologie = params.get("filter-topiccheck-oekologie");
filtertopiccheckkultur = params.get("filter-topiccheck-kultur");
filtertopiccheckmilitarismus = params.get("filter-topiccheck-militarismus");
filtertopiccheckantifa = params.get("filter-topiccheck-antifa");
filtertopiccheckqueer = params.get("filter-topiccheck-queer");
filtertopiccheckrassismus = params.get("filter-topiccheck-rassismus");
filtertopicchecksonstige = params.get("filter-topiccheck-sonstige");

filtertagcheckdemoaufuruf = params.get("filter-tagcheck-demoaufruf");
filtertagcheckaktionsbericht = params.get("filter-tagcheck-aktionsbericht");
filtertagchecknazisangreifen = params.get("filter-tagcheck-nazis-angreifen");
tagsearch = params.get("tagsearch");

console.log("search = " + search);

console.log("artikel = " + filtercheckartikel);
console.log("video = " + filtercheckvideo);
console.log("foto = " + filtercheckfoto);

console.log("placesearch = " + placesearch);
console.log("locationrange = " + locationrange);

console.log("arbeit = " + filtertopiccheckarbeit);
console.log("sozial = " + filtertopicchecksozial);
console.log("oekologie = " + filtertopiccheckoekologie);
console.log("kultur = " + filtertopiccheckkultur);
console.log("militarismus + " + filtertopiccheckmilitarismus);
console.log("antifa = " + filtertopiccheckantifa);
console.log("queer " + filtertopiccheckqueer);
console.log("rassismus " + filtertopiccheckrassismus);
console.log("sonstige" + filtertopicchecksonstige);

console.log("demoaufruf = " + filtertagcheckdemoaufuruf);
console.log("aktionsbericht = " + filtertagcheckaktionsbericht);
console.log("nazis angreifen = " + filtertagchecknazisangreifen);
