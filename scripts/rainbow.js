    const rainbows = document.getElementsByClassName("rainbow");
    //console.log(rainbows);

    for (let i = 0; i < rainbows.length; i++) {
        //console.log(rainbows[i]);
        rainbowcontent = rainbows[i].innerHTML;
        //console.log(rainbowcontent.charAt(0));
        rainbowfirstletter = rainbowcontent.charAt(0);

        if (rainbows[i].classList.contains("logo")) {
            if (document.getElementById("header").classList.contains("headerstart")) {
                rainbowupdate = "<span class='closeLetters'>" +
                    "<span style='color:var(--rassismus)'>" + rainbowfirstletter + "</span>" +
                    "<span style='color:var(--queer)'>" + rainbowfirstletter + "</span>" +
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
                    "<span style='color:var(--queer)'>" + rainbowfirstletter + "</span>" +
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
        } else {
            rainbowupdate = "<span class='closeLetters'>" +
                "<span style='color:var(--rassismus)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--queer)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--antifa)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--militarismus)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--kultur)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--oekologie)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--sozial)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:var(--arbeit)'>" + rainbowfirstletter + "</span>" +
                "<span style='color:white'>" + rainbowfirstletter + "</span>" +
                '</span>' + rainbowcontent;

            //console.log(rainbowupdate);

            rainbows[i].innerHTML = rainbowupdate;
        }




    }
