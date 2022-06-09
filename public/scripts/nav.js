document.getElementById("nav-burger").onclick = function() {
  const navList = document.getElementById("nav-list");
  navList.classList.add("burger-active");
}


document.getElementById("burger-close").onclick = function() {
  const navList = document.getElementById("nav-list");
  navList.classList.remove("burger-active");
}

/*
  if (isBurgerMenu == true) {
    const navList = document.getElementById("nav-list");
    navList.classList.add("burger-active");
  } else {
    const clickedLine = e.target.matches("line");
    const clickedSvg = e.target.matches("svg");

    isBurgerClose = isBurgerCloseChecker(clickedLine, clickedSvg, e);
    //console.log(isBurgerClose);

    if (isBurgerClose == true) {
      const navList = document.getElementById("nav-list");
      navList.classList.remove("burger-active");
    }

  }
})


function isBurgerCloseChecker(clickedLine, clickedSvg, e) {
  if(clickedLine == true) {
    const isBurgerClose = e.target.parentElement.parentElement.parentElement.parentElement.matches(".burger-close");
    return isBurgerClose;
  } else {
    if (clickedSvg == true) {
      const isBurgerClose = e.target.parentElement.matches(".burger-close");
      return isBurgerClose;
    } else {
      return;
    }
  }
}
*/
