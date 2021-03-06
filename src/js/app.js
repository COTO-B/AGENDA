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
import {
  btnNewProject,
  createProjectObject,
  formProjectEl,
  projectMenu,
  addProjectBtnForm,
  saveProjectBtnForm,
} from "./header";
import { createProjectMarkup } from "./projectList";

import { toggleWindow } from "./helpers";

import {
  createTaskObject,
  formTaskEl,
  createProjectHeadMarkup,
  createProjectTaskMarkup,
  createProjectBtnTaskMarkup,
  btnNewTaskOpen,
  btnNewTask,
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
  //TODO:cambiar por findActiveProject ver si ponerlo en helpers
  const activeProject = function (hash = false) {
    const id = hash === false ? +window.location.hash.slice(1) : +hash;

    console.log(id);

    const activeProjectObject = projects.find((proj) => proj.projectId === id);

    return activeProjectObject;
  };

  const findActiveTask = function (activeTaskId) {
    return activeProject().projectTask.find((t) => t.taskId === activeTaskId);
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

  //circle task btns functionality
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
    // console.log(taskHeadEl);

    //create date instances
    flatpickr(".editTaskDate", {
      altInput: true,
      altFormat: "M j, Y",
      dateFormat: "M j, Y",
      onChange: function (dateObj, dateStr, input) {
        const activeTaskId = +input.input.closest(".project__task-header")
          .dataset.taskid;

        findActiveTask(activeTaskId).taskDate = dateStr;

        setLocalStorage(projects);
      },
    });

    //-------------------
    //for each node list that contain task icon btns
    taskHeadEl.forEach(function (el) {
      el.addEventListener("click", function (e) {
        const taskIconBtn = e.target.closest(".project__btn-icon");

        if (!taskIconBtn) return;

        let taskCheckState;
        const activeTaskId = +taskIconBtn.parentElement.dataset.taskid;

        const svg = taskIconBtn.children[0].children[0];

        //set checkmark
        if (svg.dataset.icon === "circle") {
          taskCheckState = circleBtnTaskToggle(taskIconBtn, svg);

          findActiveTask(activeTaskId).taskCheck = taskCheckState;
        }

        //delete task
        if (svg.dataset.icon === "delete") {
          const indexActiveTask = activeProject().projectTask.indexOf(
            findActiveTask(activeTaskId)
          );
          //remove from object
          activeProject().projectTask.splice(indexActiveTask, 1);
          //remove from DOM
          el.parentElement.remove();
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
      //FIX: ACA ESTOY . poner un if (identificar con la clase del btn o poner datset en btn y leer eso) si es nuevo crearobject, si no, guardar sobre proyecto sin push, primero encontrar y reemplazar(crear funcion como input el id y guarda como projectobjetc)

      //ver si pcupar addProjectBtnForm de header, no me funciono revisar
      let projectId;
      //add project btn
      if (!formProjectEl.children[5].classList.contains("hidden")) {
        projects.push(createProjectObject());
        projectId = `#${projects[projects.length - 1].projectId}`;
      }
      //save project btn
      if (!formProjectEl.children[6].classList.contains("hidden")) {
        console.log("saveeeeee");
        //cambiar por el id correcto esto es solo test
        projectId = "#7257744937737";
      }

      setLocalStorage(projects);
      console.log(projects);
      //change ID in URL hash y se actualiza la pagina y lo agarra el event hashchange
      window.location.hash = projectId;

      //sin hash change, no se actualiza la pagina y hay que render nuevamente y se pierde la funcionalidad del edit btn
      // window.history.pushState(
      //   null,
      //   "",
      //   `#${projects[projects.length - 1].projectId}`
      // );
      // //render project on list
      // renderList();
      // //render project detail
      // renderProjectDetail(activeProject());
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

      //render project detail
      renderProjectDetail(activeProject());
      //close window
      toggleWindow("task");
      //Load Project task head btns functionality
      taskHeadBtns();
      //TODO:dspues de crear el task mover a la parte de arriba del project detail window para ver el task recien creado, esto pasa cuando hay muchas task, hacer TEST:
    });

    //render project when changed
    window.addEventListener("hashchange", function () {
      console.log("hash change");

      renderList();
      renderProjectDetail(activeProject());
      //Load Project task head btns functionality
      taskHeadBtns();
      //edit project functionality
      projectMenu(projects);
    });

    //Load Project task head btns functionality
    taskHeadBtns();

    //edit project functionality
    projectMenu(projects);
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
