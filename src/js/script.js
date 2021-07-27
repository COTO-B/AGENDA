// libreria para generar id de hash

//ordenar como
//elements
//functions
//events handlers

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

const projectList = document.querySelector(".list");

//DATA
//aca guardo los projectos
projects = [];

//NEW PROJECT BTN
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

//RENDER LIST
const renderProjectlist = function (project) {
  //borrando todo el boton y sus tags. TODO:mover a otro lado borra cada proy
  // projectList.innerHTML = "";

  //FIX:quede aca no funciona el svg revisar forkify

  //haciendo el markup
  let markup = `
  <li class="preview">
  
    <a class="preview__link preview__link--active" href="">
      <span class="color__item-circle color__item-circle--${project.projectColor}"></span>
      <h3 class="preview__title">${project.projectName}</h3>

      <button type="button" class="btn btn--small preview__btn--window">
        <svg class="preview__btn--edit">
          <use
            href="src/img/icons.svg#icon-dots-three-horizontal"
          ></use>
        </svg>
      </button>
    </a>
</li>`;

  //mostrar el boton seleccionado con el click
  projectList.insertAdjacentHTML("afterbegin", markup);

  //cambiar el color de project list
  // document.querySelector(".preview__btn--edit").style.fill = "red";
};

//ID function. cambiar por una alibreria.
const generateProjectId = function () {
  return Math.trunc(Math.random() * 10000000000000);
};

//Set Local Storage function
const setLocalStorage = function () {
  localStorage.setItem("projects", JSON.stringify(projects));
};

//Get local storage function
const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem("projects"));
  console.log(data);

  if (!data) return;

  projects = data;

  //render la lista
  projects.forEach((project) => {
    renderProjectlist(project);
  });
};

getLocalStorage();

console.log(projects);

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
    projectName: `${projectName}`,
    projectColor: `${projectColor}`,
    projectDescription: `${projectDescription}`,
    projectTask: [],
  });
  console.log(projects);

  // guardar el local storage. mapty
  setLocalStorage();

  //FIX:  despues dejarlo con clases..

  //cerrar la ventana
  toggleProjectWindow();

  //TODO:render en la lista. en la parte de arriba
  //TODO:render en el detalle de peoject
});

//TODO: poner el la lista de proyectos (renderprojectlist) y poner en detalle project (renderproject)
