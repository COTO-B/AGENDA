import { toggleWindow, generateId, overlay, overlayEdit } from "./helpers";

export const formProjectEl = document.querySelector(".upload");

// form BTNS
export const addProjectBtnForm = document.querySelector(
  ".upload__btn--add-project"
);
export const saveProjectBtnForm = document.querySelector(
  ".upload__btn--save-project"
);

const btnShowColor = document.querySelector(".color__btn-dropdown");
const inputProjectDescription = document.querySelector(
  ".upload__input-description"
);

const colorMarkup = function (projectColorName, projectColorNumber) {
  return `<span class="color__item-circle color__item-circle--selected color__item-circle--${projectColorNumber}" data-color="${projectColorNumber}"></span>
  <span>${projectColorName}</span>`;
};

//Project form functionality
export const btnNewProject = function () {
  //NOTE:VARIABLES
  const btnNewProjectOpen = document.querySelector(".nav__btn--new-project");

  const btnNewProjectClose = document.querySelector(
    ".btn--close-project-window"
  );
  //TODO:este esta repetido REVIEW:revisar
  const btnColorDropdown = document.querySelector(".color__btn-dropdown");
  const colorsContainer = document.querySelector(".color__list");

  //NOTE: FUNCTIONS
  //open project window and reset form to default
  btnNewProjectOpen.addEventListener("click", function () {
    btnShowColor.innerHTML = "";
    const defaultMarkup = `<span class="color__item-circle color__item-circle--selected color__item-circle--9" data-color="9"></span>
    <span>Electric Blue</span>`;

    btnShowColor.insertAdjacentHTML("afterbegin", defaultMarkup);

    //reset form
    formProjectEl.reset();
    inputProjectDescription.innerHTML = "";

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

    //mostrar el boton seleccionado con el click
    btnShowColor.insertAdjacentHTML(
      "afterbegin",
      colorMarkup(projectColorName, projectColorNumber)
    );

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
    //FIX:estoy aca ver como sacar el id, editproject, save y delete pq cada foreach se esta creando uno nuevo, talvez con closest
    //FIX:cuando pongo save o add project en la form no funciona el boton edit nuevamente
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

      //find project
      const activeProjectObject = projects.find(
        (proj) => proj.projectId === +id.slice(1)
      );

      //color name y color number
      const projectColorName =
        colorsIndex[activeProjectObject.projectColor - 1];
      const projectColorNumber = activeProjectObject.projectColor;
      //borrando todo el boton y sus tags
      btnShowColor.innerHTML = "";
      //mostrar el boton seleccionado con el click
      btnShowColor.insertAdjacentHTML(
        "afterbegin",
        colorMarkup(projectColorName, projectColorNumber)
      );

      //project name
      const inputProjectName = (document.querySelector(
        ".upload__input-name"
      ).value = activeProjectObject.projectName);
      //project description
      inputProjectDescription.innerHTML =
        activeProjectObject.projectDescription;

      //oculto menu y overlay edit, los dejo hidden para mostrar la form project
      toggleWindow(menuWindow);
      toggleWindow("project");

      //cambiar de btn
      addProjectBtnForm.classList.add("hidden");
      saveProjectBtnForm.classList.remove("hidden");
    });
  });
  //TODO:save btn
  const saveProjectObject = function () {
    console.log("save project");
    // FIX:estoy aca. definir nombre, color, nombre color y descripton en la parte donde esta el id, ya que aca los voy a ocupar. otra forma es ocupar el markup de createprojectobject
  };
  //TODO:delete proyect
};
