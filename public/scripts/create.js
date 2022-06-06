

const elements = document.querySelectorAll(".btn");

elements.forEach((element, i) => {
  element.addEventListener("click", ()=>{
      let command = element.dataset["element"];

      if (command == "createLink" || command == "insertImage") {
        let url = prompt("URL eingeben", "https://")
        document.execCommand(command, false, url);
      }else {
        document.execCommand(command, false, null);
      }
  });
});
