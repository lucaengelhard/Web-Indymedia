body = document.querySelector("body");

const track = document.querySelector(".carousel-track");
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
