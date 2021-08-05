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
import {
  createTaskObject,
  formTaskEl,
  createProjectHeadMarkup,
  createProjectTaskMarkup,
  createProjectBtnTaskMarkup,
  btnNewTaskOpen,
} from "./projectDetail";

// IFFI. ver si ocupar iifi o no
const APP = (function () {
  //NOTE:VARIABLES--------------

  const projectList = document.querySelector(".list");

  const projectHeadEl = document.querySelector(".project__head");

  const projectTaskEl = document.querySelector(".project__task-list");
  //save data
  let projects = [];

  //NOTE:FUNCTIONS---------------------------

  //FIX:quede aca revisar para que cuando no existe la pagina (hash) salir de la funcion o definir el actieprojectobject como otra cosa.
  //con return se ejecuta la funcion revisar esto

  const activeProject = function () {
    const id = +window.location.hash.slice(1);

    const activeProjectObject = projects.find((proj) => proj.projectId === id);

    return activeProjectObject;
  };

  const renderList = function () {
    projectList.innerHTML = "";
    projects.forEach((project) => {
      projectList.insertAdjacentHTML(
        "afterbegin",
        createProjectMarkup(project)
      );
    });
  };

  const initialMessage = function () {
    const Markup = `
    <div class="message" >Hello, to start try creating a new project!!!</div>
    `;

    return Markup;
  };

  //render project detail
  const renderProjectDetail = function (project) {
    //no project found
    if (!project) {
      projectHeadEl.innerHTML = "";
      projectHeadEl.insertAdjacentHTML("afterbegin", initialMessage());

      projectTaskEl.innerHTML = "";
      // btnNewTaskOpen.style.transition("none");
      btnNewTaskOpen.classList.add("hidden");
      return;
    }

    //render head
    projectHeadEl.innerHTML = "";
    projectHeadEl.insertAdjacentHTML(
      "afterbegin",
      createProjectHeadMarkup(project)
    );

    //render detail
    projectTaskEl.innerHTML = "";
    console.log(project.projectTask);
    project.projectTask.forEach((taskObject) => {
      projectTaskEl.insertAdjacentHTML(
        "afterbegin",
        createProjectTaskMarkup(taskObject)
      );
    });

    btnNewTaskOpen.classList.remove("hidden");

    // projectDetailEl.insertAdjacentHTML(
    //   "beforeend",
    //   createProjectBtnTaskMarkup()
    // );
  };

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
    formTaskEl.addEventListener("submit", function (e) {
      e.preventDefault();

      //select active project and save data
      activeProject().projectTask.push(createTaskObject());
      console.log(activeProject().projectTask);
      setLocalStorage(projects);
      console.log(projects);

      //render project detail
      renderProjectDetail(activeProject());

      //close window
      toggleWindow("task");
    });

    //render project
    window.addEventListener("hashchange", function () {
      renderList();
      renderProjectDetail(activeProject());
    });
  };

  //NOTE: INIT-------------------------------
  const init = function () {
    //load local storage
    getLocalStorage();
    renderList();

    console.log(activeProject());

    //render project detail
    renderProjectDetail(activeProject());
    console.log(projects);

    //add events listeners
    addListeners();
  };

  init(); //ver donde poner esto. esta va al final para ejecutar espues de leer todo
  return {
    //poner aca lo que quiero llamar despues
  };
})();
