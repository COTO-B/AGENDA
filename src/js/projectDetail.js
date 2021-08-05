import { toggleWindow, generateId, overlayTask, taskWindow } from "./helpers";
import icons from "../img/icons.svg";

export const formTaskEl = document.querySelector(".upload-task");

export const btnNewTaskOpen = document.querySelector(".project__btn--new-task");

export const btnNewTask = function () {
  //NOTE:VARIABLES

  const btnNewTaskClose = document.querySelector(".btn--close-task-window");

  //NOTE: FUNCTIONS

  //open and rest form
  btnNewTaskOpen.addEventListener("click", function () {
    toggleWindow("task");
    formTaskEl.reset();
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

  return {
    taskId: generateId("task"),
    taskName: `${inputTaskName}`,
    taskDescription: `${inputTaskDescription}`,
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
    <div class="project__task-header">
      <button
        type="button"
        class="btn btn--small project__btn project__btn-circule">
        <svg>
          <use href="${icons}#icon-circle1"></use>
        </svg>
      </button>

      <button
        type="button"
        class="btn btn--small project__btn project__btn-delete">
        <svg>
          <use href="${icons}#icon-trash"></use>
        </svg>
      </button>

      <button
        type="button"
        class="btn btn--small project__btn project__btn-date">
        <svg>
          <use href="${icons}#icon-calendar"></use>
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
