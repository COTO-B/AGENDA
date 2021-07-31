//REVIEW:NEW PROJECT BTN----------------------------------------------------
import { toggleProjectWindow, generateProjectId } from "./helpers";

export const btnNewProject = function () {
  //NOTE:VARIABLES
  const btnNewProjectOpen = document.querySelector(".nav__btn--add-project");
  //FIX: esoty repietiendo el overay en helper.js
  const overlay = document.querySelector(".overlay");

  const btnShowColor = document.querySelector(".color__btn-dropdown");

  const btnNewProjectClose = document.querySelector(
    ".btn--close-project-window"
  );
  const btnColorDropdown = document.querySelector(".color__btn-dropdown");
  const colorsContainer = document.querySelector(".color__list");

  //open and reset form to default
  btnNewProjectOpen.addEventListener("click", function () {
    //FIX: estoy repitiendo formEl
    const formEl = document.querySelector(".upload");

    btnShowColor.innerHTML = "";
    const defaultMarkup = `<span class="color__item-circle color__item-circle--selected color__item-circle--9" data-color="9"></span>
  <span>Electric Blue</span>`;

    btnShowColor.insertAdjacentHTML("afterbegin", defaultMarkup);

    formEl.reset();

    toggleProjectWindow();
  });

  //close when click on button or outside of window project. poner las dos en una formula
  btnNewProjectClose.addEventListener("click", toggleProjectWindow);

  overlay.addEventListener("click", toggleProjectWindow);

  //color dropdown
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

//FIN BTN NEW PROJECT------------------------

//REVIEW: FORM-----------------------

export const createProjectObject = function () {
  //leer la form y guardar en local storage

  //NOTE: VARIABLES. ver si dejar esto mas reducido las const
  const inputProjectName = document.querySelector(".upload__input-name").value;
  const inputProjectColor = document.querySelector(
    ".color__item-circle--selected"
  ).dataset.color;
  const inputProjectDescription = document.querySelector(
    ".upload__input-description"
  ).value;

  return {
    projectId: generateProjectId(),
    projectName: `${inputProjectName}`,
    projectColor: `${inputProjectColor}`,
    projectDescription: `${inputProjectDescription}`,
    projectTask: [],
  };
};
