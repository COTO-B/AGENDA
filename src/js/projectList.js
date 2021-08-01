//RENDER LIST
import icons from "../img/icons.svg";

const renderProjectList = function (projectObject) {
  //NOTE:VARIABLES
  const projectList = document.querySelector(".list");

  const id = +window.location.hash.slice(1);
  console.log(id, projectObject.projectId, id === projectObject.projectId);
  //haciendo el markup
  let markup = `
  <li class="preview">
  
    <a class="preview__link ${
      projectObject.projectId === id ? "preview__link--active" : ""
    }" href="#${projectObject.projectId}">
      <span class="color__item-circle color__item-circle--${
        projectObject.projectColor
      }"></span>
      <h3 class="preview__title">${projectObject.projectName}</h3>

      <button type="button" class="btn btn--small preview__btn--window">
        <svg class="preview__btn--edit">
          <use
            href="${icons}#icon-dots-three-horizontal"></use>
        </svg>
      </button>
    </a>
</li>`;

  projectList.insertAdjacentHTML("afterbegin", markup);
  //TODO:mostrar el boton seleccionado con el click, hacer en otra funcion, tambien render por default el primer proyecto, hacerlo en otra funcion ta vez despues en init
};

export default renderProjectList;
