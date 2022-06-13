imageclicklist = Array.from(document.querySelectorAll("img"));

bodygallery = document.querySelector("body");

console.log(imageclicklist);

lightboxcheck = false;

imageclicklist.forEach((image, i) => {
  image.addEventListener("click", e => {
    clickedimg = e.target;

    if(!lightboxcheck){
      clickedimg.classList.add("lightbox");
      bodygallery.classList.add("bodylightbox");
      lightboxcheck = true;
    }else {
      clickedimg.classList.remove("lightbox");
      bodygallery.classList.remove("bodylightbox");
      lightboxcheck = false;
    }

  })
});
