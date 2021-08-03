import { toggleWindow, generateId, overlayTask, taskWindow } from "./helpers";

export const btnNewTask = function () {
  //NOTE:VARIABLES

  const formTaskEl = document.querySelector(".upload-task");

  const btnNewTaskOpen = document.querySelector(".project__btn--new-task");

  const btnNewTaskClose = document.querySelector(".btn--close-task-window");

  //NOTE: FUNCTIONS

  btnNewTaskOpen.addEventListener("click", function () {
    toggleWindow("task");
    //FIX: quede aca revisar el reset
    formTaskEl.reset();
  });

  overlayTask.addEventListener("click", function () {
    toggleWindow("task");
  });
  btnNewTaskClose.addEventListener("click", function () {
    toggleWindow("task");
  });
};
