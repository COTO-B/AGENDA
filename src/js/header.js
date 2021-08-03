import { toggleWindow, generateId, overlay } from "./helpers";

export const formProjectEl = document.querySelector(".upload");

//Project form functionality
export const btnNewProject = function () {
  //NOTE:VARIABLES
  const btnNewProjectOpen = document.querySelector(".nav__btn--new-project");

  const btnShowColor = document.querySelector(".color__btn-dropdown");

  const btnNewProjectClose = document.querySelector(
    ".btn--close-project-window"
  );
  const btnColorDropdown = document.querySelector(".color__btn-dropdown");
  const colorsContainer = document.querySelector(".color__list");

  //NOTE: FUNCTIONS
  //open project window and reset form to default
  btnNewProjectOpen.addEventListener("click", function () {
    btnShowColor.innerHTML = "";
    const defaultMarkup = `<span class="color__item-circle color__item-circle--selected color__item-circle--9" data-color="9"></span>
    <span>Electric Blue</span>`;

    btnShowColor.insertAdjacentHTML("afterbegin", defaultMarkup);

    formProjectEl.reset();

    toggleWindow("project");

    //focus. FIX:buscar otro metodo
    setTimeout(function () {
      document.querySelector(".upload__input-name").focus();
    }, 100);
  });

  // close functionality
  btnNewProjectClose.addEventListener("click", function () {
    toggleWindow("project");
  });

  overlay.addEventListener("click", function () {
    toggleWindow("project");
  });

  //color dropdown toggle window
  btnColorDropdown.addEventListener("click", function (e) {
    e.preventDefault();
    //toggle hidden
    colorsContainer.classList.toggle("hidden");
  });

  //TODO:ver si añadir seleccion con el teclado.salir cuando hago click afuera del dropdown de los colores

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
};

//create project
export const createProjectObject = function () {
  const inputProjectName = document.querySelector(".upload__input-name").value;
  const inputProjectColor = document.querySelector(
    ".color__item-circle--selected"
  ).dataset.color;
  const inputProjectDescription = document.querySelector(
    ".upload__input-description"
  ).value;

  return {
    projectId: generateId("project"),
    projectName: `${inputProjectName}`,
    projectColor: `${inputProjectColor}`,
    projectDescription: `${inputProjectDescription}`,
    projectTask: [],
  };
};
