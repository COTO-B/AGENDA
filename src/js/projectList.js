//RENDER LIST
import icons from "../img/icons.svg";

export const createProjectMarkup = function (projectObject, edit = false) {
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
      
      <div class="edit-project-window ${edit === "show" ? "" : "hidden"}" >
        <ul>
          <li class="edit-project">
            <svg>
              <use data-icon="calendar" href="${icons}#icon-edit-pencil"></use>
            </svg>
            <span>Edit</span>
          </li>
          <li class="delete-project">
            <svg>
              <use data-icon="calendar" href="${icons}#icon-trash"></use>
            </svg>
            <span>Delete</span>
          </li>
          <li class="status-project">
            <svg>
              <use data-icon="calendar" href="${icons}#icon-trash"></use>
            </svg>
            <span>Delete</span>
          </li>
        </ul>
      </div>
    

    </a>
  </li>`;

  return markup;
};

export const a = function () {
  console.log("a");
};
