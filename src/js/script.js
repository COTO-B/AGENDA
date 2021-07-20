// libreria para generar id de hash

//SELECTORS
const colorsContainer = document.querySelector(".color__list");
const colors = document.querySelectorAll(".color__item");
const btnShowColor = document.querySelector(".color__btn-dropdown");
const btnColorDropdown = document.querySelector(".color__btn-dropdown");
const btnNewProjectOpen = document.querySelector(".nav__btn--add-project");
const btnNewProjectClose = document.querySelector(".btn--close-project-window");
const overlay = document.querySelector(".overlay");
const projectWindow = document.querySelector(".add-project-window");
const form = document.querySelector(".upload");

//FIX:quede aca revisar mapty para guardar en local storage
//STATE - DATA
const state = {
  projectId: "",
  projectName: "",
  projectColor: "",
  projectDescription: "",
  projectTasks: {
    id: "",
    color: "",
    description: "",
    date: "",
  },
};
//NEW PROJECT
//open close window

const toggleProjectWindow = function () {
  overlay.classList.toggle("hidden");
  projectWindow.classList.toggle("hidden");
};

//open and rest to default
btnNewProjectOpen.addEventListener("click", function () {
  btnShowColor.innerHTML = "";
  const defaultMarkup = `<span class="color__item-circle color__item-circle--default"></span>
  <span>Electric Blue</span>`;
  btnShowColor.insertAdjacentHTML("afterbegin", defaultMarkup);

  form.reset();

  toggleProjectWindow();
});

//close when click on button or outside of window project
btnNewProjectClose.addEventListener("click", toggleProjectWindow);

overlay.addEventListener("click", toggleProjectWindow);

//color dropdown
btnColorDropdown.addEventListener("click", function (e) {
  e.preventDefault();

  //toggle hidden
  colorsContainer.classList.toggle("hidden");
});
//FIX:salir cuando hago click afuera del dropdown de los colores
//REVIEW:ver si añadir seleccion con el teclado
colorsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".color__item");

  const colorName = clicked.textContent;
  const colorNumber = clicked.dataset.color;

  //borrando todo el boton y sus tags
  btnShowColor.innerHTML = "";
  //haciendo el markup
  const markup = `<span class="color__item-circle color__item-circle--${colorNumber}"></span>
  <span>${colorName}</span>`;

  //mostrar el boton seleccionado con el click
  btnShowColor.insertAdjacentHTML("afterbegin", markup);

  //toggle hidden
  colorsContainer.classList.toggle("hidden");
});
