//console.log("FrontEnd Js ishga tushdi");

function itemtemplate(item) {
  return `<li
          class="list-group-item list-group-item-info d-flex align-items-center justify-content-between"
        >
          <span class="item-text">${item.reja}</span>
          <div>
            <button
              data-id="${item._id}"
              class="edit-me btn btn-secondary btn-sm mr-1">
              Ozgartirish
            </button>
            <button
               data-id="${item._id}"
              class="delete-me btn btn-danger btn-sm"
            >
              Ochirish
            </button>
          </div>
        </li>`;
}
let createField = document.getElementById("create-field");
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();
  axios
    .post("/create-item", { reja: createField.value })
    .then((response) => {
      document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemtemplate(response.data));
      createField.value = "";
      createField.focus();
    })
    .catch((err) => {
      console.log("Iltimos qaytattan harakat qilib koring");
    });
});

document.addEventListener("click", function (e) {
  //delete operation
  console.log(e.target);
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Aniq ochirmoqchimisiz?")) {
      axios
        .post("/delete-item", { id: e.target.getAttribute("data-id") })
        .then((response) => {
          console.log(response.data);
          e.target.parentElement.parentElement.remove();
        })
        .catch((err) => {
          console.log("Iltimos qaytattan harakat qilib koring");
        });
    }
  }

  //edit operation
  if (e.target.classList.contains("edit-me")) {
    let userInput = prompt(
      "Ozgartirish kiriting",
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
    );
    if (userInput) {
      axios
        .post("/edit-item", {
          id: e.target.getAttribute("data-id"),
          new_input: userInput,
        })
        .then((response) => {
          console.log(response.data);
          e.target.parentElement.parentElement.querySelector(
            ".item-text"
          ).innerHTML = userInput;
        })
        .catch((err) => {
          console.log("Iltimos qaytattan harakat qilib koring");
        });
    }
  }
});
document.getElementById("clean-all").addEventListener("click", function () {
  axios.post("/delete-all", { delete_all: true }).then((response) => {
    alert(response.data.state);
    document.location.reload();
  });
});
