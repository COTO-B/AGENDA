//RENDER LIST
import icons from "../img/icons.svg";

const createProjectMarkup = function (projectObject) {
  //NOTE:VARIABLES

  const id = +window.location.hash.slice(1);
  //ver si poner guard clause

  //haciendo el markup
  const markup = `
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

  return markup;
};

export default createProjectMarkup;
