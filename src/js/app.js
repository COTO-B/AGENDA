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

// const renderProjectList = function () {
//   console.log("render");
// };

// IFFI. ver si ocupar iifi o no
const APP = (function () {
  //NOTE:VARIABLES--------------
  const formEl = document.querySelector(".upload");

  let projects = [];

  //NOTE:FUNCTIONS---------------------------
  //Get local storage function
  const getLocalStorage = function () {
    const data = JSON.parse(localStorage.getItem("projects"));

    if (!data) return;

    projects = data;
    console.log(projects);

    //render la lista
    projects.forEach((project) => {
      renderProjectList(project);
    });
  };

  //Set Local Storage function. dejar como modulo para project y task con input si es project o task
  const setLocalStorage = function (projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  //save project
  const saveProject = function () {};

  //events
  const addListeners = function () {
    //new project
    btnNewProject();

    //submit form
    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      //get form input object and save on projects[]
      projects.push(createProjectObject());
      // guardar el local storage.
      setLocalStorage(projects);
      console.log(projects);
      // cerrar la ventana
      toggleProjectWindow();
      //render list
      // elegir el ultimo del array
      // renderProjectList(project[4]);
    });
  };

  const ejemplo = function () {
    console.log("ejemplo1");
  };

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
    ejemplo,
  };
})();

APP.ejemplo();
