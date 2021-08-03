//import

//APP
//....variables
//....functions
//....init
//....events handlers

//NOTE: importar para transpiling y polyfiling
import "core-js/stable";

import icons from "../img/icons.svg";
import { btnNewProject, createProjectObject, formProjectEl } from "./header";
import createProjectMarkup from "./projectList";
import { toggleWindow } from "./helpers";
import { btnNewTask } from "./projectDetail";

// IFFI. ver si ocupar iifi o no
const APP = (function () {
  //NOTE:VARIABLES--------------

  const projectList = document.querySelector(".list");
  //save data
  let projects = [];

  //NOTE:FUNCTIONS---------------------------
  const renderList = function () {
    projectList.innerHTML = "";
    projects.forEach((project) => {
      projectList.insertAdjacentHTML(
        "afterbegin",
        createProjectMarkup(project)
      );
    });
  };

  //render project detail
  const getLocalStorage = function () {
    const data = JSON.parse(localStorage.getItem("projects"));
    if (!data) return;
    projects = data;
  };

  //dejar como modulo para project y task con input si es project o task. otra opcion es midificar let project y uadar todo nuevvamente
  const setLocalStorage = function (projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  //NOTE:EVENTS.
  //FIX: si guardo en projetcs dejar aca todo el resto va en sus modulos y solo llamo a la funcion como ej project form functionality
  const addListeners = function () {
    //Project form functionality
    btnNewProject();

    //create and save new project
    formProjectEl.addEventListener("submit", function (e) {
      e.preventDefault();
      //get form input project object and save on projects[]
      projects.push(createProjectObject());
      setLocalStorage(projects);
      console.log(projects);
      //change ID in URL hash
      window.history.pushState(
        null,
        "",
        `#${projects[projects.length - 1].projectId}`
      );
      //render project on list
      renderList();
      // cerrar la ventana
      toggleWindow("project");
    });

    //Project detail functionality
    btnNewTask();

    //create and save task

    //render project detail
    window.addEventListener("hashchange", function () {
      console.log("hola");

      renderList();

      //TODO: Render project detail
    });
  };

  //NOTE: INIT-------------------------------
  const init = function () {
    //load local storage
    getLocalStorage();
    renderList();
    console.log(projects);

    //add events listeners
    addListeners();
  };

  init(); //ver donde poner esto. esta va al final para ejecutar espues de leer todo
  return {
    //poner aca lo que quiero llamar despues
  };
})();
