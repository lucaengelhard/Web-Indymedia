body = document.querySelector("body");


const carousel = document.querySelector(".carousel");
const track = document.querySelector(".carousel-track");

let url = window.location.href;
let params = (new URL(url)).searchParams;



const postid = params.get("postid");

fetch("/tutorials/tutoriallist.json")
.then(res => res.json())
.then(data => {
  tutorials = data.tutorials;
  currentTutorial = tutorials[postid - 1];

  //console.log(currentTutorial);


  //Print content
  const tabtitle = document.querySelector("title");

  const headerimage = document.querySelector(".article-headerimage");
  const author = document.querySelector(".post-author");
  const title = document.querySelector(".tutorial-title");
  const shorttext = document.querySelector(".post-shorttext");
  const content = document.querySelector(".post-body");


  tabtitle.innerHTML = currentTutorial.title;

  headerimage.innerHTML = "<img src='"+currentTutorial.image+"' alt=''>"
  author.innerHTML = currentTutorial.author;
  title.innerHTML = currentTutorial.title;
  shorttext.innerHTML = currentTutorial.shorttext;
  content.innerHTML = currentTutorial.richtext;

  //console.log(currentTutorial.steps);
  if(currentTutorial.steps.length != 0){

      //console.log(template);
      currentTutorial.steps.forEach((step, i) => {
        let listitem = "<li class='carousel-slide'><div class='slide-content'><img src="+step.image+" alt=''> <div class='carousel-heading'> <span class='carousel-heading-text'>"+step.heading+"</span></div><div class='carousel-content'>"+step.content+"</div></div>  </li>"

        //console.log(listitem);

        track.insertAdjacentHTML("beforeend", listitem)

      });




  }else {
    return;
  }
})
.then(further =>{
  const slides = Array.from(track.children);
  slides[0].classList.add("current-slide");

  const currentSlide = document.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibiling;

  const nextButton = document.querySelector(".carousel-button-right");
  const prevButton = document.querySelector(".carousel-button-left");

  const indicator = document.querySelector(".carousel-nav-indicator");

  function indicatorBuilder(slides) {
    //console.log(slides.length);
    slides.forEach((slide, i) => {
      indicatorNumber = i + 1
      indicator.insertAdjacentHTML("beforeend", "<button class='carousel-indicator'> " + indicatorNumber + " </button>");


      heading = slide.firstElementChild.querySelector(".carousel-heading");
      //console.log(slide.firstElementChild);
      heading.insertAdjacentHTML("afterbegin","<span class='carousel-number'>"+indicatorNumber+"</span>")
    });
    const indicatorPoints = Array.from(indicator.children);
    indicatorPoints[0].classList.add("current-indicator");

  }

  function slidesize(track, currentSlide) {
    currentHeight = currentSlide.getBoundingClientRect().height;
    currentWidth = currentSlide.getBoundingClientRect().width;
    track.style.height = currentHeight + "px";

    //console.log(currentHeight);

    return currentWidth;
  }

  var currentWidth = slidesize(track, currentSlide);

  const setSlidePosition = (slide, i) => {
    slide.style.left = currentWidth * i + "px";
  }

  const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = "translateX(-" + targetSlide.style.left + ")";

    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");

    const slideIndex = slides.findIndex(slide => slide === targetSlide)
    //console.log(slideIndex);

    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");

    if (slideIndex == 0) {
      prevButton.classList.add("is-hidden");
    }

    if (slideIndex == slides.length - 1) {
      nextButton.classList.add("is-hidden");
    }

    slidesize(track, targetSlide);
  }

  const updateIndicator = (currentIndicator, targetIndicator) => {
    currentIndicator.classList.remove("current-indicator");
    targetIndicator.classList.add("current-indicator");
  }

  indicatorBuilder(slides);
  const indicatorPoints = Array.from(indicator.children);

  slides.forEach(setSlidePosition);

  //Button left
  prevButton.addEventListener("click", e => {
    const currentSlide = document.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;
    const currentIndicator = document.querySelector(".current-indicator");
    const prevIndicator = currentIndicator.previousElementSibling;

    moveToSlide(track, currentSlide, prevSlide);
    updateIndicator(currentIndicator, prevIndicator);
  });

  //Button right
  nextButton.addEventListener("click", e => {
    const currentSlide = document.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;
    const currentIndicator = document.querySelector(".current-indicator");
    const nextIndicator = currentIndicator.nextElementSibling;

    moveToSlide(track, currentSlide, nextSlide);
    updateIndicator(currentIndicator, nextIndicator);
  });

  //Indicators
  indicator.addEventListener("click", e => {
    const targetIndicator = e.target.closest("button");

    if (!targetIndicator) return;

    const currentSlide = document.querySelector(".current-slide");
    const currentIndicator = document.querySelector(".current-indicator")

    const targetIndex = indicatorPoints.findIndex(point => point === targetIndicator)

    targetSlide = slides[targetIndex];
    moveToSlide(track, currentSlide, targetSlide);
    updateIndicator(currentIndicator, targetIndicator);
  })

  window.addEventListener("resize",() => {
    slides.forEach(setSlidePosition);
  });

  setTimeout(clickFix, 3000);

});

function clickFix(){
  const firstclick = document.querySelector(".current-indicator");
  //console.log("click");
  firstclick.click();
}

/*
const slides = Array.from(track.children);
slides[0].classList.add("current-slide");

const currentSlide = document.querySelector(".current-slide");
const nextSlide = currentSlide.nextElementSibiling;

const nextButton = document.querySelector(".carousel-button-right");
const prevButton = document.querySelector(".carousel-button-left");

const indicator = document.querySelector(".carousel-nav-indicator");

currentWidth = slidesize(track, currentSlide);

function indicatorBuilder(slides) {
  //console.log(slides.length);
  slides.forEach((slide, i) => {
    indicatorNumber = i + 1
    indicator.insertAdjacentHTML("beforeend", "<button class='carousel-indicator'> " + indicatorNumber + " </button>");

    heading = slide.firstElementChild.querySelector(".carousel-heading");
    heading.insertAdjacentHTML("afterbegin","<span class='carousel-number'>"+indicatorNumber+"</span>")
  });
  const indicatorPoints = Array.from(indicator.children);
  indicatorPoints[0].classList.add("current-indicator");

}

function slidesize(track, currentSlide) {
  currentHeight = currentSlide.getBoundingClientRect().height;
  currentWidth = currentSlide.getBoundingClientRect().width;
  track.style.height = currentHeight + "px";

  return currentWidth;
}

const setSlidePosition = (slide, i) => {
  slide.style.left = currentWidth * i + "px";
}

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";

  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");

  const slideIndex = slides.findIndex(slide => slide === targetSlide)
  //console.log(slideIndex);

  prevButton.classList.remove("is-hidden");
  nextButton.classList.remove("is-hidden");

  if (slideIndex == 0) {
    prevButton.classList.add("is-hidden");
  }

  if (slideIndex == slides.length - 1) {
    nextButton.classList.add("is-hidden");
  }

  slidesize(track, targetSlide);
}

const updateIndicator = (currentIndicator, targetIndicator) => {
  currentIndicator.classList.remove("current-indicator");
  targetIndicator.classList.add("current-indicator");
}

indicatorBuilder(slides);
const indicatorPoints = Array.from(indicator.children);

slides.forEach(setSlidePosition);

//Button left
prevButton.addEventListener("click", e => {
  const currentSlide = document.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentIndicator = document.querySelector(".current-indicator");
  const prevIndicator = currentIndicator.previousElementSibling;

  moveToSlide(track, currentSlide, prevSlide);
  updateIndicator(currentIndicator, prevIndicator);
});

//Button right
nextButton.addEventListener("click", e => {
  const currentSlide = document.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentIndicator = document.querySelector(".current-indicator");
  const nextIndicator = currentIndicator.nextElementSibling;

  moveToSlide(track, currentSlide, nextSlide);
  updateIndicator(currentIndicator, nextIndicator);
});

//Indicators
indicator.addEventListener("click", e => {
  const targetIndicator = e.target.closest("button");

  if (!targetIndicator) return;

  const currentSlide = document.querySelector(".current-slide");
  const currentIndicator = document.querySelector(".current-indicator")

  const targetIndex = indicatorPoints.findIndex(point => point === targetIndicator)

  targetSlide = slides[targetIndex];
  moveToSlide(track, currentSlide, targetSlide);
  updateIndicator(currentIndicator, targetIndicator);
})

window.addEventListener("resize",() => {
  slides.forEach(setSlidePosition);
});
*/
