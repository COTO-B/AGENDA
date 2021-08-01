//import

//APP
//....variables
//....functions
//....init
//....events handlers

//NOTE: importar para transpiling y polyfiling
import "core-js/stable";

import icons from "../img/icons.svg";
import { btnNewProject, createProjectObject } from "./header";
import renderProjectList from "./projectList";
import { toggleProjectWindow } from "./helpers";

// IFFI. ver si ocupar iifi o no
const APP = (function () {
  //NOTE:VARIABLES--------------
  const formEl = document.querySelector(".upload");
  //REVIEW:este tb esta en projectlist no repetir
  const projectList = document.querySelector(".list");
  //save data
  let projects = [];

  //NOTE:FUNCTIONS---------------------------

  const getLocalStorage = function () {
    const data = JSON.parse(localStorage.getItem("projects"));

    if (!data) return;

    projects = data;
    console.log(projects);

    //render project list. repetido revisae REVIEW:
    projectList.innerHTML = "";
    projects.forEach((project) => {
      renderProjectList(project);
    });
  };

  //dejar como modulo para project y task con input si es project o task. otra opcion es midificar let project y uadar todo nuevvamente
  const setLocalStorage = function (projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  //NOTE:EVENTS
  const addListeners = function () {
    //new project
    btnNewProject();

    //create new proyect
    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      //get form input project object and save on projects[]
      projects.push(createProjectObject());
      // guardar el local storage.estoy guardando todo nuevamente todos los projects
      setLocalStorage(projects);
      console.log(projects);
      // cerrar la ventana
      toggleProjectWindow();
      //change ID in URL hash
      window.history.pushState(
        null,
        "",
        `#${projects[projects.length - 1].projectId}`
      );
      console.log(projects[projects.length - 1].projectId);
      //render project on list
      // renderProjectList(projects[projects.length - 1]);
      //aca estamos render todo esto esta repetido revisar REVIEW:
      projectList.innerHTML = "";
      projects.forEach((project) => {
        renderProjectList(project);
      });
    });

    //render project detail
    window.addEventListener("hashchange", function () {
      console.log("hola");

      //REVIEW::render project list, primero clear. este render tb esta arriba no repetir despues arreglar
      projectList.innerHTML = "";
      projects.forEach((project) => {
        renderProjectList(project);
      });

      //FIX: aca quede, arreglar lo repetido de REVIEW: estoy render todo cada vez creo que da igual. hacer una funcion para no reperit todo. ver si el elemento projectList lo dejo solo en modulo projectlist e importar para no repetir. tambien poner en esta linea el render del detalle proyecto
    });
  };

  //TODO:render el detalle del proy. dejar el ultimo proyecto creado como default y seleccionado en la lista y render el detalle

  //NOTE: INIT-------------------------------
  const init = function () {
    //load local storage
    getLocalStorage();
    console.log(projects);

    //add events listeners
    addListeners();
  };

  init(); //ver donde poner esto. esta va al final para ejecutar espues de leer todo
  return {
    //poner aca lo que quiero llamar despues
  };
})();
