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
  //TODO:cambiar por findActiveProject
  const activeProject = function () {
    const id = +window.location.hash.slice(1);

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

  //FIX:aca estoy cambien los botones de lugar revisar los queryselector. cuando hago click en el boton hacer cambio de hash para que quede activo,lo encuentro revisando al primer hermann el de mas arriba en el dom
  //edit project functionality
  const editProjectBtn = function () {
    const editProjectEl = document.querySelectorAll(".preview__btn--window");

    editProjectEl.forEach(function (el) {
      el.addEventListener("click", function (e) {
        console.log("aaaa");
        const editBtn = e.target.closest(".preview__link");

        console.log(editBtn.parentElement);

        console.log(editBtn);

        const id = +editBtn.hash.slice(1);
        console.log(id);

        console.log(activeProject());

        const proy = projects.find((proj) => proj.projectId === id);
        console.log(proy);

        //TEST:talvez borrar el editBtn y no el padre
        // editBtn.parentElement.innerHTML = "";

        // editBtn.parentElement.insertAdjacentHTML(
        //   "afterbegin",
        //   createProjectMarkup(proy, "show")
        // );

        //TODO:poner que cuando hago click afuera se hidden el window

        //FIX: nose si debe ir este ya que modifico el markup dandole un argumento
        // console.log(editBtn.childNodes[7]);
        // console.log(editBtn.childNodes);

        editBtn.childNodes[7].classList.remove("hidden");

        //FIX:nueva forma cargar el hash

        // console.log(editBtn.childNodes[7]);
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
      renderList();

      renderProjectDetail(activeProject());
      //Load Project task head btns functionalitya
      taskHeadBtns();
      //edit project functionality
      editProjectBtn();
    });

    //Load Project task head btns functionality
    taskHeadBtns();

    //edit project functionality
    editProjectBtn();
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
