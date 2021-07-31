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
  //save data
  let projects = [];

  //NOTE:FUNCTIONS---------------------------

  const getLocalStorage = function () {
    const data = JSON.parse(localStorage.getItem("projects"));

    if (!data) return;

    projects = data;
    console.log(projects);

    //render project list
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
      //get form input object and save on projects[]
      projects.push(createProjectObject());
      // guardar el local storage.
      setLocalStorage(projects);
      console.log(projects);
      // cerrar la ventana
      toggleProjectWindow();
      //render project on list
      renderProjectList(projects[projects.length - 1]);
    });
    //FIX:aca quede hacer que cuando cambie el hash quede ese elemento seleccionado. tambien cambir projectlist con ID. idea identificar el id del hash que cambio y render project list.
    window.addEventListener("hashchange", function () {
      console.log("hola");
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
