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
import createProjectMarkup from "./projectList";
import { toggleWindow } from "./helpers";

// IFFI. ver si ocupar iifi o no
const APP = (function () {
  //NOTE:VARIABLES--------------
  const formEl = document.querySelector(".upload");
  //REVIEW:este tb esta en projectlist no repetir
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
    renderList();
  };

  //dejar como modulo para project y task con input si es project o task. otra opcion es midificar let project y uadar todo nuevvamente
  const setLocalStorage = function (projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  //NOTE:EVENTS
  const addListeners = function () {
    //FIX:aca quede ordernar segus escrito
    //new project. TODO:dejar como event listener y despues llamar a btn
    //open new project form
    //poner listener del btnNewProjectOpen y adentro del event en esta hoja poner una funcion del markup(open and reset defaul) y despues otra funcion que llame a la funcionalidad del close btns y funcionalidad del dropdown
    btnNewProject();

    //create new project
    formEl.addEventListener("submit", function (e) {
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
    console.log(projects);

    //add events listeners
    addListeners();

    //FIX: poner cada enevet listener aca pero adentro de cada llamr a una funcion definida en funciones, por ejemplo renderProyectList, o createNewProyect
  };

  init(); //ver donde poner esto. esta va al final para ejecutar espues de leer todo
  return {
    //poner aca lo que quiero llamar despues
  };
})();
