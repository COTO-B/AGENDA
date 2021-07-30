//open close window function
export const toggleProjectWindow = function () {
  const overlay = document.querySelector(".overlay");
  const projectWindow = document.querySelector(".add-project-window");
  overlay.classList.toggle("hidden");
  projectWindow.classList.toggle("hidden");
};

//ID
//ID function. cambiar por una alibreria. dejar como mudulo para oucpar en project y task
export const generateProjectId = function () {
  return Math.trunc(Math.random() * 10000000000000);
};
