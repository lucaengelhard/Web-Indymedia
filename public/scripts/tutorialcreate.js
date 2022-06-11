const stepList = document.querySelector(".tutorial-steps-wrapper");
const addButton = document.querySelector(".tutorial-steps-add");

addButton.addEventListener("click", e =>{
  stepList.insertAdjacentHTML("beforeend", "<div class='tutorial-step'>  <div class='tutorial-steps-header'> <div class='tutorial-steps-counter'>1</div>    <input type='text' class='tutorial-steps-title' placeholder='Schrittüberschrift'>    <input type='file' name='tutorial-steps-image' class='tutorial-steps-image' id='tutorial-steps-image' value=''>    <button type='button' name='tutorial-steps-delete' class='tutorial-steps-delete'>-</button>  </div>  <textarea name='tutorial-steps-content' class='tutorial-steps-content' placeholder='Erkläre diesen Schritt'></textarea> </div>")

  stepHandler();
});




function stepHandler(){
  const stepList = document.querySelector(".tutorial-steps-wrapper");
  const steps = Array.from(stepList.children);
  steps.forEach((step, i) => {

    //Step Counter
    const counter = step.querySelector(".tutorial-steps-counter");
    counter.innerHTML = i + 1;

    //Remove Button
    deleteButton = step.querySelector(".tutorial-steps-delete");
    deleteButton.addEventListener("click", e => {
      step.remove();
    });
  });
}



/*
<div class="tutorial-step">
  <div class="tutorial-steps-header">
    <div class="tutorial-steps-counter">1</div>
    <input type="text" class="tutorial-steps-title" placeholder="Schrittüberschrift">
    <!--<label for="tutorial-steps-image">Titelbild</label>-->
    <input type="file" name="tutorial-steps-image" class="tutorial-steps-image" id="tutorial-steps-image" value="">

    <button type="button" name="tutorial-steps-delete" class="tutorial-steps-delete">-</button>
  </div>

  <textarea name="tutorial-steps-content" class="tutorial-steps-content" placeholder="Erkläre diesen Schritt"></textarea>
</div>
*/
