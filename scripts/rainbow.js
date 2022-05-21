//get elements with rainbow class    
const rainbows = document.getElementsByClassName("rainbow");

//loop each element
for (let i = 0; i < rainbows.length; i++) {

    //get first letter
    rainbowcontent = rainbows[i].innerHTML;

    rainbowfirstletter = rainbowcontent.charAt(0);

    //special case logo
    if (rainbows[i].classList.contains("logo")) {
        if (document.getElementById("header").classList.contains("headerswitch")) {
            rainbowupdate = "<span class='closeLetters'>" +
                "<span style='color:var(--rassismus)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--feminismus)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--antifa)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--militarismus)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--kultur)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--oekologie)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--sozial)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--arbeit)'>" + rainbowfirstletter + "</span>" +
                "<span id='logogap' style='color:black'>" + rainbowfirstletter + "</span>" +
                '</span>' + rainbowcontent;
            rainbows[i].innerHTML = rainbowupdate;
        } else {
            rainbowupdate = "<span class='closeLetters'>" +
                "<span style='color:var(--rassismus)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--feminismus)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--antifa)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--militarismus)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--kultur)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--oekologie)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--sozial)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--arbeit)'>" + rainbowfirstletter + "</span>" +
                "<span id='logogap' style='color:white'>" + rainbowfirstletter + "</span>" +
                '</span>' + rainbowcontent;
            rainbows[i].innerHTML = rainbowupdate;
        }

    }
    //add rainbow
    else {
        rainbowupdate = "<span class='closeLetters'>" +
            "<span style='color:var(--rassismus)'>" + rainbowfirstletter + "</span>" +
            "<span style='color:var(--feminismus)'>" + rainbowfirstletter + "</span>" +
            "<span style='color:var(--antifa)'>" + rainbowfirstletter + "</span>" +
            "<span style='color:var(--militarismus)'>" + rainbowfirstletter + "</span>" +
            "<span style='color:var(--kultur)'>" + rainbowfirstletter + "</span>" +
            "<span style='color:var(--oekologie)'>" + rainbowfirstletter + "</span>" +
            "<span style='color:var(--sozial)'>" + rainbowfirstletter + "</span>" +
            "<span style='color:var(--arbeit)'>" + rainbowfirstletter + "</span>" +
            "<span style='color:white'>" + rainbowfirstletter + "</span>" +
            '</span>' + rainbowcontent;

        rainbows[i].innerHTML = rainbowupdate;
    }




}
