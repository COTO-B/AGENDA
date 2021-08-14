//import

//APP
//....variables
//....functions
//....init
//....events handlers

//NOTE: importar para transpiling y polyfiling
import "core-js/stable";

import icons from "../img/icons.svg";
//calendar
import flatpickr from "flatpickr";
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
  initialMessage,
} from "./projectDetail";

//FIX: ver si poner el update para actualisar solo lo que cambia del dom

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

  //render project detail
  const renderProjectDetail = function (project) {
    //no project found
    if (!project) {
      projectHeadEl.innerHTML = "";
      projectHeadEl.insertAdjacentHTML("afterbegin", initialMessage());

      projectTaskEl.innerHTML = "";
      btnNewTaskOpen.classList.add("hidden");
      return;
    }

    //render head
    projectHeadEl.innerHTML = "";
    projectHeadEl.insertAdjacentHTML(
      "afterbegin",
      createProjectHeadMarkup(project)
    );

    //render tasks
    projectTaskEl.innerHTML = "";
    console.log(project.projectTask);
    project.projectTask.forEach((taskObject) => {
      projectTaskEl.insertAdjacentHTML(
        "afterbegin",
        createProjectTaskMarkup(taskObject)
      );
    });

    //render btn
    btnNewTaskOpen.classList.remove("hidden");
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

  //task btns functionality circle function
  const circleBtnTaskToggle = function (taskIconBtn, svg) {
    let taskCheck;

    if (taskIconBtn.classList.contains("project__btn-circle--active")) {
      svg.setAttribute("href", `${icons}#icon-circle1`);
      taskCheck = false;
    } else {
      svg.setAttribute("href", `${icons}#icon-checkmark-outline`);
      taskCheck = true;
    }

    taskIconBtn.classList.toggle("project__btn-circle--active");

    return taskCheck;
  };

  //task btns functionality
  const taskHeadBtns = function () {
    const taskHeadEl = document.querySelectorAll(".project__task-header");
    // console.log(taskHeadEl); for each node list contain task icon btns
    taskHeadEl.forEach(function (el) {
      el.addEventListener("click", function (e) {
        const taskIconBtn = e.target.closest(".project__btn-icon");

        if (!taskIconBtn) return;

        let taskCheckState;
        const activeTaskId = +taskIconBtn.parentElement.dataset.taskid;
        const activeTask = activeProject().projectTask.find(
          (t) => t.taskId === activeTaskId
        );
        const svg = taskIconBtn.children[0].children[0];

        if (svg.dataset.icon === "circle") {
          taskCheckState = circleBtnTaskToggle(taskIconBtn, svg);

          activeTask.taskCheck = taskCheckState;
        }

        if (svg.dataset.icon === "delete") {
          const indexActiveTask =
            activeProject().projectTask.indexOf(activeTask);
          //remove from object
          activeProject().projectTask.splice(indexActiveTask, 1);
          //remove from DOM
          el.parentElement.remove();
        }

        if (svg.dataset.icon === "calendar") {
          console.log("lanzar calendario");
        }
        setLocalStorage(projects);
      });
    });
  };

  //NOTE:EVENTS.
  //FIX: si guardo en projetcs dejar aca todo, el resto va en sus modulos y solo llamo a la funcion como ej project form functionality
  const addListeners = function () {
    //New project form functionality
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
      //render project detail
      renderProjectDetail(activeProject());
      // close window
      toggleWindow("project");
    });

    //Load Project new task btn functionality
    btnNewTask();

    //create and save task
    formTaskEl.addEventListener("submit", function (e) {
      e.preventDefault();

      //select active project and save data
      activeProject().projectTask.push(createTaskObject());
      console.log(activeProject().projectTask);
      setLocalStorage(projects);
      console.log(projects);

      //FIX:aca estoy, ver como poner calendario
      //REVIEW: Si no pongo fecha sacar el boton.
      //render project detail
      //FIX:revisar libreria para mostrar calendario. en bankist en js ver labelDate para mostrar la fecha
      renderProjectDetail(activeProject());
      //close window
      toggleWindow("task");
      //Load Project task head btns functionality
      taskHeadBtns();
      //TODO:dspues de crear el task mover a la parte de arriba del project detail window para ver el task recien creado, esto pasa cuando hay muchas task, hacer TEST:
    });

    //FIX:aca estoy, ver como poner calendario

    //calendario en bton del add task
    const inputTaskCalendar = document.querySelector(".btn--open-calendar");

    // const inputTaskCalendar = document.querySelector(".project__btn-date");
    flatpickr("#task-name", {});
    inputTaskCalendar.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(inputTaskCalendar);
      flatpickr("#taskname", {});
      console.log(flatpickr("#calendar", {}));
    });
    // --------------------calendario

    //render project when changed
    window.addEventListener("hashchange", function () {
      renderList();
      renderProjectDetail(activeProject());
      //Load Project task head btns functionalitya
      taskHeadBtns();
    });

    //Load Project task head btns functionality
    taskHeadBtns();
  };

  //NOTE: INIT-------------------------------
  const init = function () {
    //load local storage
    getLocalStorage();
    renderList();

    console.log(activeProject());

    //render active project detail
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
