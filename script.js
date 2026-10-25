const addButton = document.getElementById("add");
const removeButton = document.getElementById("remove");
const searchButton = document.getElementById("search");

const tableDiv = document.querySelector(".table");

let chessList = JSON.parse(localStorage.getItem("chess")) || [];

createCard();

addButton.addEventListener("click", async function () {
  const { value: addFen } = await Swal.fire({
    title: "Enter Fen Code",
    input: "text",
    inputPlaceholder: "Enter The Fen To Add",
    confirmButtonText: "Add",
    showCancelButton: true,
    cancelButtonText: "Cancel",
  });
  if (!addFen) return;

  if (!addFen.includes("/")) {
    Swal.fire("Error", "This Fen Code Not Found", "error");
    return;
  }

  const { value: addName } = await Swal.fire({
    title: "Add Name",
    input: "text",
    inputPlaceholder: "Enter the name to Add",
    confirmButtonText: "Add",
    showCancelButton: true,
    cancelButtonText: "Cancel",
  });
  if (!addName) return;

  let exist = chessList.some(
    (ex) => ex.name.toLowerCase() == addName.toLowerCase(),
  );
  if (exist) {
    Swal.fire("Error", "This Game Name Aleady Exist", "error");
    return;
  }

  const { value: addNote } = await Swal.fire({
    title: "Add Note",
    input: "text",
    inputPlaceholder: "Enter the Note to Add",
    confirmButtonText: "Add",
    showCancelButton: true,
    cancelButtonText: "Cancel",
  });

  if (addNote === undefined) return;

  const fenCode = addFen;

  chessList.push({ code: fenCode, name: addName, note: addNote });
  localStorage.setItem("chess", JSON.stringify(chessList));
  createCard();
});
function createCard(list = chessList) {
  tableDiv.innerHTML = "";

  list.forEach((item) => {
    const newCard = document.createElement("div");
    newCard.className = "k1";

    const titleLabel = document.createElement("label");
    titleLabel.textContent = item.name;
    const noteP = document.createElement("p");
    noteP.textContent = item.note;

    const boardImg = document.createElement("img");
    boardImg.onerror = function () {
      boardImg.src = "";
      boardImg.alt = "Image Not Loading";
      boardImg.style.textAlign = "center";
      boardImg.style.fontSize = "25px";
      boardImg.style.color = "red";
    };

    const editButton = document.createElement("button");
    editButton.innerHTML = '<img src="img/editButton.png">';
    editButton.id = "edit";

    boardImg.src = `https://lichess1.org/export/fen.gif?fen=${item.code}&theme=brown&piece=cburnett`;

    newCard.appendChild(titleLabel);
    newCard.appendChild(boardImg);
    newCard.appendChild(noteP);
    newCard.appendChild(editButton);
    editButton.addEventListener("click", () => editCard(item));

    tableDiv.appendChild(newCard);
  });
}
removeButton.addEventListener("click", async function () {
  const { value: removeName } = await Swal.fire({
    title: "Enter The Name Want To Remove",
    input: "text",
    inputPlaceholder: "Name..",
    confirmButtonText: "Removes",
    showCancelButton: true,
    cancelButtonText: "Cancel",
  });
  if (!removeName) return;
  let exist = chessList.some(
    (ex) => ex.name.toLowerCase() == removeName.toLowerCase(),
  );
  if (!exist) {
    Swal.fire("Error", "This Match  Not Found", "error");
    return;
  }
  chessList = chessList.filter(
    (rem) => rem.name.toLowerCase() != removeName.toLowerCase(),
  );

  localStorage.setItem("chess", JSON.stringify(chessList));
  createCard();
});
searchButton.addEventListener("click", async function () {
  const { value: searchName } = await Swal.fire({
    title: "Enter The Name Want To Search",
    input: "text",
    inputPlaceholder: "Name..",
    confirmButtonText: "Search",
    showCancelButton: true,
    cancelButtonText: "Cancel",
  });
  if (!searchName) return;

  let exist = chessList.some(
    (ex) => ex.name.toLowerCase() == searchName.toLowerCase(),
  );
  if (!exist) {
    Swal.fire("Error", "This Match  Not Found", "error");
    return;
  }

  const filterLists = chessList.filter(
    (rem) => rem.name.toLowerCase() == searchName.toLowerCase(),
  );

  createCard(filterLists);
});

async function editCard(item) {
  const { value: newName } = await Swal.fire({
    title: "Edit Name",
    input: "text",
    inputValue: item.name,
    showCancelButton: true,
  });
  if (!newName) return;

  let exist = chessList.some(
    (ex) => ex !== item && ex.name.toLowerCase() == newName.toLowerCase(),
  );

  if (exist) {
    Swal.fire("Error", "This Game Name Aleady Exist", "error");
    return;
  }

  const { value: newNote } = await Swal.fire({
    title: "Edit Note",
    input: "text",
    inputValue: item.note,
    showCancelButton: true,
  });
  if (newNote === undefined) return;

  item.name = newName;
  item.note = newNote;

  localStorage.setItem("chess", JSON.stringify(chessList));
  createCard();
}
