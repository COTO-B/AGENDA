import { toggleWindow, generateId, overlayTask, taskWindow } from "./helpers";
import icons from "../img/icons.svg";

import flatpickr from "flatpickr";

export const formTaskEl = document.querySelector(".upload-task");

export const btnNewTaskOpen = document.querySelector(".project__btn--new-task");

export const btnNewTask = function () {
  //NOTE:VARIABLES

  const btnNewTaskClose = document.querySelector(".btn--close-task-window");

  //NOTE: FUNCTIONS

  //open and reset add task form
  btnNewTaskOpen.addEventListener("click", function () {
    toggleWindow("task");
    formTaskEl.reset();
    //FIX:aca estoy, ver como poner calendario
    flatpickr("#task-name", {});
  });
  //Close functionality
  overlayTask.addEventListener("click", function () {
    toggleWindow("task");
  });
  btnNewTaskClose.addEventListener("click", function () {
    toggleWindow("task");
  });

  //calendar
};

//create task
export const createTaskObject = function () {
  const inputTaskName = document.querySelector(
    ".upload-task__input-name"
  ).value;

  const inputTaskDescription = document.querySelector(
    ".upload-task__input-description"
  ).value;

  //FIX:aca estoy, ver como poner calendario

  return {
    taskId: generateId("task"),
    taskName: `${inputTaskName}`,
    taskDescription: `${inputTaskDescription}`,
    taskCheck: false,
  };
};

export const createProjectHeadMarkup = function (projectObject) {
  const Markup = `
    <h2 class="project__name">${projectObject.projectName}</h2>

    <p class="project__description">${projectObject.projectDescription}
    </p>
    `;

  return Markup;
};

export const createProjectTaskMarkup = function (projectTaskObject) {
  const Markup = `
  <li class="project__task">
    <div class="project__task-header" data-taskid="${projectTaskObject.taskId}">
      

      <button
        type="button"
        class="btn btn--small project__btn project__btn-icon project__btn-circle ${
          projectTaskObject.taskCheck === true
            ? "project__btn-circle--active"
            : ""
        }">
      
        <svg>
          <use data-icon="circle" href="${icons}#icon-${
    projectTaskObject.taskCheck === true ? "checkmark-outline" : "circle1"
  }">
          </use>
        </svg>  
      </button>

      <button
        type="button"
        class="btn btn--small project__btn project__btn-icon project__btn-delete">
        <svg>
          <use data-icon="delete" href="${icons}#icon-trash"></use>
        </svg>
      </button>

      <button
        type="button"
        class="btn btn--small project__btn project__btn-icon project__btn-date">
        <svg>
          <use data-icon="calendar" href="${icons}#icon-calendar"></use>
        </svg>
        <span>Jul 1</span>
      </button>
    </div>
    
    <h3 class="project__task-name">${projectTaskObject.taskName}</h3>

    <p class="project__task-description">
      ${projectTaskObject.taskDescription}
    </p>
  </li>
  `;

  return Markup;
};

export const createProjectBtnTaskMarkup = function () {
  const Markup = `
  <button type="button" class="btn btn--big project__btn--new-task">
    <svg>
      <use href="${icons}#icon-add-outline"></use>
    </svg>
    <span>Add task</span>
  </button>  
  `;

  return Markup;
};

export const initialMessage = function () {
  const Markup = `
  <div class="project__head--message">
    <svg>
      <use href="${icons}#icon-mood-happy-outline"></use>
    </svg>
    <h2>Hello, to start try creating a new project!!!</h2>
  </div>
  `;

  return Markup;
};

//

//

//

// taskHead.addEventListener("mouseover", function (e) {
//   const taskIconBtn = e.target.closest(".project__btn-icon");

//   if (!taskIconBtn) return;

//   const svg = taskIconBtn.children[0].children[0];

//   if (svg.dataset.icon === "circle") {
//     svg.setAttribute("href", `${icons}#icon-checkmark-outline`);

//     taskIconBtn.classList.add("project__btn-circle--active");
//   }
// });

// taskHead.addEventListener("mouseout", function (e) {
//   const taskIconBtn = e.target.closest(".project__btn-icon");

//   if (!taskIconBtn) return;

//   const svg = taskIconBtn.children[0].children[0];

//   if (svg.dataset.icon === "circle") {
//     svg.setAttribute("href", `${icons}#icon-circle1`);

//     taskIconBtn.classList.remove("project__btn-circle--active");
//   }
// });
