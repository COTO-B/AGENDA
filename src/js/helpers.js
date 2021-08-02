//open close window function
export const overlay = document.querySelector(".overlay");

export const toggleWindow = function (type) {
  const projectWindow = document.querySelector(".add-project-window");
  const taskWindow = document.querySelector(".add-task-window");
  console.log(type);

  overlay.classList.toggle("hidden");

  if (type === "project") {
    projectWindow.classList.toggle("hidden");
  }
  if (type === "task") taskWindow.classList.toggle("hidden");
};

//ID
//ID function. cambiar por una alibreria. dejar como mudulo para oucpar en project y task
export const generateProjectId = function () {
  return Math.trunc(Math.random() * 10000000000000);
};
