"use strict";
//adding notes

const noteTextElement = document.querySelector(".textarea");
const addNoteBtn = document.querySelector("button");
let notes = document.querySelectorAll(".note");
const dragableNotes = document.querySelector(".notes");

// console.log(noteTextElement);

addNoteBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const colorSelected = document.querySelector("input").value;

  if (noteTextElement.value.trim() === "") {
    alert("Fill Something in First");
  } else {
    if (dragableNotes.innerText === "No Data Yet") dragableNotes.innerText = "";
    const noteData = noteTextElement.value;

    const newNote = document.createElement("div");
    newNote.style.backgroundColor = colorSelected;
    newNote.className = "note";
    newNote.draggable = "true";

    const newNoteIcon = document.createElement("i");
    newNoteIcon.className = "fa-solid fa-grip-vertical";

    const newNoteText = document.createElement("p");
    newNoteText.textContent = noteData;

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-xmark pointer";
    // <i class="fa-solid fa-xmark"></i>

    newNote.appendChild(newNoteIcon);
    newNote.appendChild(newNoteText);
    newNote.appendChild(deleteIcon);

    dragableNotes.appendChild(newNote);

    noteTextElement.value = "";
    notes = document.querySelectorAll(".note");

    draggableFunction();
  }
});

//draggable notes

const draggableFunction = function () {
  notes.forEach((note, index) => {
    note.addEventListener("dragstart", (e) => {
      setTimeout(() => note.classList.add("dragging"), 0);
    });

    // set Attribute
    note.setAttribute("data-index", index);
    const deleteIcon = note.querySelector(".pointer");
    deleteIcon.addEventListener("click", () => deleteNote(note));
    note.addEventListener("dragend", () => note.classList.remove("dragging"));
  });

  const initSortableList = (e) => {
    e.preventDefault();

    const draggingItem = dragableNotes.querySelector(".dragging");

    const siblings = [
      ...dragableNotes.querySelectorAll(".note:not(.dragging)"),
    ];
    //   console.log(siblings, draggingItem);

    const nextSibling = siblings.find((sibling) => {
      return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });

    dragableNotes.insertBefore(draggingItem, nextSibling);
  };

  dragableNotes.addEventListener("dragover", initSortableList);
};

// delete note

const deleteNote = function (note) {
  console.log("IIIIIIIIIIIIIi");
  dragableNotes.removeChild(note);

  if (dragableNotes.innerText === "")
    dragableNotes.innerHTML = "<b>No Data Yet</b>";
  draggableFunction();
};