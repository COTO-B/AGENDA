import { toggleWindow, generateId, overlay, overlayEdit } from "./helpers";

export const formProjectEl = document.querySelector(".upload");

// form BTNS
const addProjectBtnForm = document.querySelector(".upload__btn--add-project");
const saveProjectBtnForm = document.querySelector(".upload__btn--save-project");

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

    //cambiar de btn
    addProjectBtnForm.classList.remove("hidden");
    saveProjectBtnForm.classList.add("hidden");

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

export const projectMenu = function (projects) {
  const projectBtnMenu = document.querySelectorAll(".preview__btn--window");

  //TODO:ver si sacar edit y delete de aca y meter en open nemu window{}, linea de abajo
  let editProject, deleteProject, menuWindow;

  //open menu window
  projectBtnMenu.forEach(function (el) {
    const id = el.previousElementSibling.hash;
    //TODO:ver si cambiar el li por button
    const editProject = el.nextElementSibling.children[0].children[0];
    const deleteProject = el.nextElementSibling.children[0].children[1];

    el.addEventListener("click", function () {
      menuWindow = el.nextElementSibling;
      console.log(menuWindow);

      //default hidden (menu y overlay), aca muestro cuando hago click en el boton 3 puntos(menu)
      toggleWindow(menuWindow);
    });

    //REVIEW: FIX:ACA ESTOY.  edit proyect btn. esta tomando como input el objeto proyect , ver si mover esto a app ya que voy a modificar proyect o que el resultado retur sea el nuevo proyect ya modificado

    editProject.addEventListener("click", function () {
      //TODO:
      //cambiar el atributo del input,value al del proy actual (id). revisar html para sber que clase ocupar para seleccionar. y guardar en proyects
      // FIX: leer con el id el nombre del project
      console.log("EDITTTTTTTT BTN", id, +id.slice(1));
      console.log(projects);
      const activeProjectObject = projects.find(
        (proj) => proj.projectId === +id.slice(1)
      );
      console.log(activeProjectObject);

      const inputProjectName = document.querySelector(
        ".upload__input-name"
      ).value;

      console.log(inputProjectName);

      //oculto menu y overlay edit, los dejo hidden para mostrar la form project
      toggleWindow(menuWindow);
      toggleWindow("project");

      //cambiar de btn
      addProjectBtnForm.classList.add("hidden");
      saveProjectBtnForm.classList.remove("hidden");

      //TODO:delete proyect
    });
    // console.log(editProject); //undefined
  });

  //hide edit  window
  overlayEdit.addEventListener("click", function () {
    toggleWindow(menuWindow);
  });
};
