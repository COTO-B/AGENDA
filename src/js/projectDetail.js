import { toggleWindow, generateId, overlayTask, taskWindow } from "./helpers";
import icons from "../img/icons.svg";

export const formTaskEl = document.querySelector(".upload-task");

export const btnNewTaskOpen = document.querySelector(".project__btn--new-task");

export const btnNewTask = function () {
  //NOTE:VARIABLES

  const btnNewTaskClose = document.querySelector(".btn--close-task-window");

  //NOTE: FUNCTIONS

  //open and reset form
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
        class="btn btn--small project__btn project__btn-circle">
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

export const taskChekBtn = function () {
  //FIX: ACA QUEDE. poner mas de un event listener pero separados hover cambiar svg y color. click mantener el svg y color cambiado. href set attribute

  const TaskHeadBtns = document.querySelector(".project__task-header");

  TaskHeadBtns.addEventListener("click", function (e) {
    const circleBtn = e.target.closest(".project__btn-circle");
    //poner clase al use para seleccionarlo o ver otra forma de navegar por el dom
    console.log(circleBtn);
    console.log(circleBtn.children);
    console.log(circleBtn.childNodes);
  });
};
