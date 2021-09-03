//open close window function
export const overlay = document.querySelector(".overlay");
export const overlayTask = document.querySelector(".overlay-task");
export const overlayEdit = document.querySelector(".overlay-edit");

export const toggleWindow = function (type) {
  const projectWindow = document.querySelector(".add-project-window");
  const taskWindow = document.querySelector(".add-task-window");

  if (type === "project") {
    console.log(overlay);
    console.log(projectWindow);
    overlay.classList.toggle("hidden");
    projectWindow.classList.toggle("hidden");
    console.log(overlay);
    console.log(projectWindow);
  }
  if (type === "task") {
    overlayTask.classList.toggle("hidden");
    taskWindow.classList.toggle("hidden");
  }
  //FIX: estoy aca ver si dejar esto ahora no lo estoy llamando desde header project menu
  if (
    typeof type === "object" &&
    type.classList.contains("edit-project-window")
  ) {
    overlayEdit.classList.toggle("hidden");
    type.classList.toggle("hidden");
  }
};

//ID
//ID function. cambiar por una alibreria. dejar como mudulo para oucpar en project y task
export const generateId = function (type) {
  if (type === "project") {
    return Math.trunc(Math.random() * 10000000000000);
  }
  if (type === "task") {
    return Math.trunc(Math.random() * 1000000);
  }
};
