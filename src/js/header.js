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

export const projectMenu = function () {
  const projectBtnMenu = document.querySelectorAll(".preview__btn--window");

  //TODO:ver si sacar edit y delete de aca y meter en open nemu window{}, linea de abajo
  let editProject, deleteProject, menuWindow;

  //open menu window
  projectBtnMenu.forEach(function (el) {
    el.addEventListener("click", function () {
      const id = el.previousElementSibling.hash;

      menuWindow = document.querySelectorAll(`a[href='${id}']`)[0].parentElement
        .children[2];

      editProject = menuWindow.children[0].children[0];
      deleteProject = menuWindow.children[0].children[1];

      // TODO:dejar como toggle en otra funcion y llamarla desde aca. ver ejemplo ya realice esto mas arriba toggle esta en helpers. pasar como argumento el id o menuwindow.
      //default hidden (menu y overlay), aca muestro cuando hago click en el boton 3 puntos(menu)
      menuWindow.classList.toggle("hidden");
      overlayEdit.classList.toggle("hidden");

      //REVIEW: FIX:ACA ESTOY.  edit proyect btn
      //FIX: no funca cuando apreto edit y despues apreto nuevamente no sale el window form FIX: parece que como esta este event adentro de otro event cada vez que apreto edit se empieza a a sumar una vez ms el btn, ver si sacando de aca el event se soluciona (talvez pasar editproject esta definido afuera de ese event no pasrlo como argumento)
      editProject.addEventListener("click", function () {
        //TODO:
        //cambiar el atributo del input,value al del proy actual (id). revisar html para sber que clase ocupar para seleccionar.
        console.log("EDITTTTTTTT BTN");
        console.log(editProject);
        //oculto menu y overlay edit, los dejo hidden para mostrar la form project
        menuWindow.classList.toggle("hidden");
        overlayEdit.classList.toggle("hidden");

        toggleWindow("project");

        //cambiar de btn
        addProjectBtnForm.classList.add("hidden");
        saveProjectBtnForm.classList.remove("hidden");

        //TODO:delete proyect
      });
    });
  });

  //hide edit  window
  overlayEdit.addEventListener("click", function () {
    menuWindow.classList.add("hidden");
    overlayEdit.classList.add("hidden");
  });
};
