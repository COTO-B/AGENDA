// libreria para generar id de hash

//ELEMENTS
const colorsContainer = document.querySelector(".color__list");
const colors = document.querySelectorAll(".color__item");
const btnShowColor = document.querySelector(".color__btn-dropdown");
const btnColorDropdown = document.querySelector(".color__btn-dropdown");
const btnNewProjectOpen = document.querySelector(".nav__btn--add-project");
const btnNewProjectClose = document.querySelector(".btn--close-project-window");
// const btnAddProject = document.querySelector(".upload__btn--add-project");
const overlay = document.querySelector(".overlay");
const projectWindow = document.querySelector(".add-project-window");
const form = document.querySelector(".upload");
const inputProjectName = document.querySelector(".upload__input-name");
const inputProjectDescription = document.querySelector(
  ".upload__input-description"
);

//NEW PROJECT
//open close window function
const toggleProjectWindow = function () {
  overlay.classList.toggle("hidden");
  projectWindow.classList.toggle("hidden");
};

//open and reset to default
btnNewProjectOpen.addEventListener("click", function () {
  btnShowColor.innerHTML = "";
  const defaultMarkup = `<span class="color__item-circle color__item-circle--selected color__item-circle--9" data-color="9"></span>
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

//REVIEW:ver si añadir seleccion con el teclado.salir cuando hago click afuera del dropdown de los colores

//show selected color
colorsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".color__item");

  const projectColorName = clicked.textContent;
  const projectColorNumber = clicked.dataset.color;

  //borrando todo el boton y sus tags
  btnShowColor.innerHTML = "";

  //haciendo el markup
  const markup = `<span class="color__item-circle color__item-circle--selected color__item-circle--${projectColorNumber}" data-color="${projectColorNumber}"></span>
  <span>${projectColorName}</span>`;

  //mostrar el boton seleccionado con el click
  btnShowColor.insertAdjacentHTML("afterbegin", markup);

  //toggle hidden
  colorsContainer.classList.toggle("hidden");
});

//FIX:quede aca. crear un array donde esten todos los projects y adentro guardar como objeto(o clase) los proyectos y en el task del project hacer un array para guardar las task como objetos

//ID. cambiar por una alibreria, mientras ocupar 2 random. meter esto cuando hace clik en el btn add project
const generateProjectId = function () {
  return Math.trunc(Math.random() * 10000000000000);
};

//Set Local Storage
const setLocalStorage = function () {
  localStorage.setItem("projects", JSON.stringify(projects));
};

//aca guardo los projectos
projects = [];

//guardo las task que despues empujo al projecto
tasks = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputProjectColor = document.querySelector(
    ".color__item-circle--selected"
  );

  const projectName = inputProjectName.value;
  const projectColor = inputProjectColor.dataset.color;
  const projectDescription = inputProjectDescription.value;

  projects.push({
    projectId: generateProjectId(),
    projectname: `${projectName}`,
    projectColor: `${projectColor}`,
    projectDescription: `${projectDescription}`,
  });
  console.log(projects);

  // guardar el local storage. mapty
  setLocalStorage();

  //FIX: ver como guardar la data. despues dejarlo con clases.. solo esta guardando la ultima en local sotarage revisar. tambien ver stringifly y parse

  //cerrar la ventana
  toggleProjectWindow();
});

const data = JSON.parse(localStorage.getItem("projects"));
console.log(data);
