import { toggleWindow, generateId, overlay, overlayEdit } from "./helpers";

export const formProjectEl = document.querySelector(".upload");

// form BTNS
const addProjectBtnForm = document.querySelector(".upload__btn--add-project");
const saveProjectBtnForm = document.querySelector(".upload__btn--save-project");

const btnShowColor = document.querySelector(".color__btn-dropdown");

//Project form functionality
export const btnNewProject = function () {
  //NOTE:VARIABLES
  const btnNewProjectOpen = document.querySelector(".nav__btn--new-project");

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

  //FIX:estoy aca ocupar este markup para render con el btn edit, ver si modificar markup var etc..
  //haciendo el markup para el color
  const colorMarkup = function (clickedElement) {
    //FIX: REVIEW: aca estoy, que el input sea color name y color number. en el event de abajo obtener . textcontent y dateset,color para obtener el input para la funcion
    const projectColorName = clickedElement.textContent;
    const projectColorNumber = clickedElement.dataset.color;
    return `<span class="color__item-circle color__item-circle--selected color__item-circle--${projectColorNumber}" data-color="${projectColorNumber}"></span>
    <span>${projectColorName}</span>`;
  };

  //show selected color
  colorsContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".color__item");
    console.log(clicked, clicked.textContent, clicked.dataset.color);

    //borrando todo el boton y sus tags
    btnShowColor.innerHTML = "";

    //mostrar el boton seleccionado con el click
    btnShowColor.insertAdjacentHTML("afterbegin", colorMarkup(clicked));

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

//TODO: este deberia ir en proyect list, es del project menu btn
//hide edit  window
let menuWindow;
overlayEdit.addEventListener("click", function () {
  console.log("overlay");
  toggleWindow(menuWindow);
});

//TODO: este deberia ir en proyect list
export const projectMenu = function (projects) {
  const projectBtnMenu = document.querySelectorAll(".preview__btn--window");

  //array de colores
  //TODO:ver donde dejar esto
  const colorsIndex = [
    "Berry Red",
    "Red",
    "Salmon",
    "Dark Orange",
    "Cyber Yellow",
    "Spring Bud",
    "Green",
    "Medium Spring",
    "Elecctric Blue",
    "Azure",
    "Han Purplee",
    "Electric Purple",
    "Magenta",
  ];

  //TODO:ver si sacar edit y delete de aca y meter en open nemu window{}, linea de abajo
  let editProject, deleteProject, id;

  //open menu window
  projectBtnMenu.forEach(function (el) {
    //TODO:ver si cambiar el li por button
    editProject = el.nextElementSibling.children[0].children[0];
    deleteProject = el.nextElementSibling.children[0].children[1];

    // console.log(el, id);
    //FIX:estoy aca ver como sacar el id, editproject y delete pq cada foreach se esta creando uno nuevo
    el.addEventListener("click", function () {
      menuWindow = el.nextElementSibling;
      // console.log(menuWindow);
      console.log("btn");
      //default hidden (menu y overlay), aca muestro cuando hago click en el boton 3 puntos(menu)
      toggleWindow(menuWindow);
    });

    editProject.addEventListener("click", function () {
      id = el.previousElementSibling.hash;
      console.log("EDITTTTTTTT BTN", id, +id.slice(1));
      console.log(projects);
      const activeProjectObject = projects.find(
        (proj) => proj.projectId === +id.slice(1)
      );
      console.log(activeProjectObject);
      console.log(
        activeProjectObject.projectName,
        activeProjectObject.projectColor,
        activeProjectObject.projectDescription
      );

      //nombre color
      console.log(colorsIndex[activeProjectObject.projectColor - 1]);
      // FIX:estoy aca poner el color y la desripcion, revisar el id siempre tira el mismo
      const inputProjectName = (document.querySelector(
        ".upload__input-name"
      ).value = activeProjectObject.projectName);
      ///////////////////////////////////
      //para color mejor ocupar color markup method (colorMarkup)

      // const inputProjectColorName = (document.querySelector(
      //   ".color__btn-dropdown"
      // ).children[1].innerHTML =
      //   colorsIndex[activeProjectObject.projectColor - 1]);
      // //color number tb cambiar el css
      // const inputProjectColorNumber = (document.querySelector(
      //   ".color__item-circle--selected"
      // ).dataset.color = activeProjectObject.projectColor);

      ////////////////////////////////
      const inputProjectDescription = (document.querySelector(
        ".upload__input-description"
      ).innerHTML = activeProjectObject.projectDescription);

      // console.log(
      //   inputProjectName,
      //   inputProjectColorNumber,
      //   inputProjectColorName
      // );

      //oculto menu y overlay edit, los dejo hidden para mostrar la form project
      toggleWindow(menuWindow);
      toggleWindow("project");

      //cambiar de btn
      addProjectBtnForm.classList.add("hidden");
      saveProjectBtnForm.classList.remove("hidden");
    });
    //TODO:save btn
    //TODO:delete proyect
  });
};
