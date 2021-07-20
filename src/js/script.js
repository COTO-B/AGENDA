// libreria para generar id de hash

const colorsContainer = document.querySelector(".color__list");

const colors = document.querySelectorAll(".color__item");

colorsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".color__item");

  console.log(colorsContainer, colors, clicked, "hola", clicked.dataset.color);
});

//insertar con insertAdjacementHTML afterbegin, en el boton default

// antes de insertar borrar lo que existe
//  _clear() {
//     innerHTML = "";
//   }

const btnShowColor = document.querySelector(".color__btn-dropdown");
console.log(btnShowColor);

//borrando todo el boton y sus tags
btnShowColor.innerHTML = "";
//mostrar el boton seleccionado con el click
const markup = `<span class="color__item-circle color__item-circle--default"></span>
<span>TEST color</span>`;

btnShowColor.insertAdjacentHTML("afterbegin", markup);
