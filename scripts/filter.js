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
filtertopiccheckfeminismus = params.get("filter-topiccheck-feminismus");
filtertopiccheckrassismus = params.get("filter-topiccheck-rassismus");
filtertopicchecksonstige = params.get("filter-topiccheck-sonstige");

filtertagcheckdemoaufruf = params.get("filter-tagcheck-demoaufruf");
filtertagcheckaktionsbericht = params.get("filter-tagcheck-aktionsbericht");
filtertagchecknazisangreifen = params.get("filter-tagcheck-nazis-angreifen");
tagsearch = params.get("tagsearch");

const searchParams = {
    "search": search,
    "artikel": filtercheckartikel,
    "video": filtercheckvideo,
    "foto": filtercheckfoto,
    "placesearch": placesearch,
    "locationrange": locationrange,
    "arbeit": filtertopiccheckarbeit,
    "sozial": filtertopicchecksozial,
    "oekologie": filtertopiccheckoekologie,
    "kultur": filtertopiccheckkultur,
    "militarismus": filtertopiccheckmilitarismus,
    "antifa": filtertopiccheckantifa,
    "feminismus": filtertopiccheckfeminismus,
    "rassismus": filtertopiccheckrassismus,
    "sonstige": filtertopicchecksonstige,
    "demoaufruf": filtertagcheckdemoaufruf,
    "aktionsbericht": filtertagcheckaktionsbericht,
    "nazis-angreifen": filtertagchecknazisangreifen,
    "tagsearch": tagsearch
}

var filteredArticleList = [];

//console.log(searchParams);

filterOutput = [];
searchOutput = "";
//console.log(filterOutput);

Object.keys(searchParams).forEach(parameter => {
    //console.log(parameter);
    //console.log(searchParams[parameter]);
    if (searchParams[parameter] === null) {} else {
        if (parameter == "search" || parameter == "placesearch" || parameter == "tagsearch" || parameter == "locationrange") {
            if (parameter == "search" || parameter == "placesearch" || parameter == "tagsearch") {
                if (searchParams[parameter] == "") {} else {
                    if (parameter == "search") {
                        //console.log(searchParams[parameter]);
                        searchOutput = searchParams[parameter];
                    }

                    if (parameter == "tagsearch") {
                        //console.log(searchParams[parameter]);
                        tagsearchOutput = searchParams[parameter];
                        tagsearchOutput = tagsearchOutput.replace(/ /g, "-")
                        filterOutput.push(tagsearchOutput.toLowerCase());
                        //console.log(tagsearchOutput);
                    }
                }
            }
        } else {
            filterOutput.push(parameter);
            //console.log(filterOutput);
        }

    }
});

taglist = [];
taglistfilter = [];



fetch('/Artikel/articlelist.json')
    .then(response => response.json())
    .then(articlelist => {
        //console.log(articlelist);
        let i = 0;
        articlelist.articles.forEach(article => {
            filtermediatype = articlelist.articles[i].mediatype;
            filterlocation = articlelist.articles[i].location;
            filtertopics = articlelist.articles[i].topics;
            filtertags = articlelist.articles[i].tags;
            filtertitle = articlelist.articles[i].title;

            filtershorttext = articlelist.articles[i].shorttext;

            //taglist
            //console.log(filtertags);
            filtertags.forEach(tag => {
                //console.log(taglist);
                if (taglist.includes(tag)) {} else {
                    taglist.push(tag);
                    //console.log(taglist);
                }
            });

            //Search
            searchConfirm = null;
            //console.log(searchOutput);
            //console.log(filtershorttext);
            //console.log(filtertitle);

            searchTitleTest = filtertitle.includes(searchOutput);
            searchShorttextTest = filtershorttext.includes(searchOutput);

            //console.log(searchShorttextTest);
            //console.log(searchTitleTest);

            if (searchTitleTest === false && searchShorttextTest === false) {
                searchConfirm = false;
            }

            //Check Mediatype
            mediatypeConfirm = null;
            if (filterOutput.includes("artikel") == true || filterOutput.includes("video") == true || filterOutput.includes("foto") == true) {
                if (filterOutput.includes(filtermediatype)) {
                    mediatypeConfirm = true;
                } else {
                    if (mediatypeConfirm === null) {
                        mediatypeConfirm = false;
                    }
                }
            } else {
                mediatypeConfirm = null;
            }

            //Check Location



            //Check Topics
            topicConfirm = null;
            //console.log(filtertopics);
            if (filterOutput.includes("arbeit") == true || filterOutput.includes("sozial") == true || filterOutput.includes("oekologie") == true || filterOutput.includes("kultur") == true || filterOutput.includes("militarismus") == true || filterOutput.includes("antifa") == true || filterOutput.includes("feminismus") == true || filterOutput.includes("rassismus") == true || filterOutput.includes("sonstige") == true) {
                //console.log(articlelist.articles[i].postid);
                //console.log(filterOutput);
                filtertopics.forEach(topic => {
                    //console.log(topic.toLowerCase());
                    if (filterOutput.includes(topic.toLowerCase())) {
                        topicConfirm = true;
                        //console.log(articlelist.articles[i].postid + " " + topic.toLowerCase() + " " + topicsConfirm);
                        //console.log(topicConfirm);
                    } else {
                        //console.log(topicConfirm);
                        if (topicConfirm === null) {
                            topicConfirm = false;
                        }
                    }
                });

            } else {
                topicsConfirm = null;
            }

            //Check Tags


            //console.log(filtertags);
            tagsConfirm = null;
            //console.log("taglist: " + taglist);
            //console.log(filterOutput);
            //console.log("filtertags: " + filtertags);


            if (filterOutput.length == 0) {
                tagsConfirm = null;
            } else {
                if (filterOutput.includes("arbeit") == true || filterOutput.includes("sozial") == true || filterOutput.includes("oekologie") == true || filterOutput.includes("kultur") == true || filterOutput.includes("militarismus") == true || filterOutput.includes("antifa") == true || filterOutput.includes("feminismus") == true || filterOutput.includes("rassismus") == true || filterOutput.includes("sonstige") == true) {
                    tagsConfirm = null;
                    filtertags.forEach(tag => {
                        //console.log(tag);
                        //console.log(filterOutput);
                        if (filterOutput.includes(tag.toLowerCase().replace(/ /g, "-")) == true) {
                            //console.log(tag.toLowerCase().replace(/ /g, "-"));
                            tagsConfirm = true;
                        }
                    });
                } else {
                    filtertags.forEach(tag => {
                        //console.log(tag);
                        if (filterOutput.includes(tag.toLowerCase().replace(/ /g, "-")) == true) {
                            tagsConfirm = true;
                        } else {
                            if (tagsConfirm === null) {
                                tagsConfirm = false;
                            }
                        }
                    });
                }
            }



            //console.log(tagsConfirm);




            //console.log(searchOutput);
            //console.log(filterOutput);

            //console.log(mediatypeConfirm);
            //console.log(topicConfirm);
            //console.log(tagsConfirm);

            if (mediatypeConfirm === false || topicConfirm === false || tagsConfirm === false || searchConfirm === false) {} else {
                //console.log(articlelist.articles[i].postid);
                filteredArticleList.push(articlelist.articles[i].postid);
                //console.log(filteredArticleList);
            }
            i++;
        });

    })

    .then(formupdater => {

        //tagsearch Taglistupdate
        //console.log(taglist);
        taglist.forEach(tag => {
            tag = tag.replace(/ /g, "-");

            //console.log(tag);
            //console.log(filterOutput);
            isCheckedChecker = filterOutput.includes(tag.toLowerCase());
            //console.log(isCheckedChecker);

            if (isCheckedChecker == true) {
                if (tag.toLowerCase() === "arbeit" || tag.toLowerCase() === "sozial" || tag.toLowerCase() === "oekologie" || tag.toLowerCase() === "kultur" || tag.toLowerCase() === "militarismus" || tag.toLowerCase() === "antifa" || tag.toLowerCase() === "feminismus" || tag.toLowerCase() === "rassismus" || tag.toLowerCase() === "sonstige") {} else {
                    if (taglistfilter.includes(tag) == true) {} else {
                        //console.log(tag);
                        taglistfilter.push(tag);
                    }

                }

            }



        });
        taglistfilter.forEach(tag => {
            document.getElementById("filter-tags").insertAdjacentHTML("beforeend", "<div><input type='checkbox' id='filter-tagcheck-" + tag + "' name='filter-tagcheck-" + tag + "'> <label for='filter-tagcheck-" + tag + "'>" + tag + "</label>");
        });

        //checkboxes checked
        inputListArray = Array.from(document.getElementsByTagName("input"));
        //console.log(inputListArray);
        let i = 0;
        inputListArray.forEach(element => {
            if (element.type == 'checkbox') {
                //console.log(filterOutput);
                //console.log(element.name);

                elementSplit = element.name.split("-");
                //console.log(elementSplit);

                elementSplit.splice(0, 2);

                elementString = elementSplit.toString().replace(/,/g, " ");
                //console.log(elementString);

                filterOutput.forEach(tag => {
                    tag = tag.replace(/-/g, " ");
                    //console.log(tag);


                    nameCheck = elementString.includes(tag);
                    //console.log(nameCheck);
                    if (nameCheck == true) {
                        element.checked = true;
                    }
                });
            }
        });


        //tagsearch autocomplete
        taglist.forEach(tag => {
            document.getElementById("filter-tag-list").insertAdjacentHTML("beforeend", "<option value='" + tag + "'></option>")
        });


    });
