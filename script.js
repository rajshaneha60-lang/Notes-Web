const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");
const errorMsg = document.getElementById("errorMsg");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Display notes on page load
displayNotes();

addNoteBtn.addEventListener("click", () => {
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        errorMsg.textContent = "⚠ Please enter a note!";
        return;
    }

    errorMsg.textContent = "";

    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));

    noteInput.value = "";
    displayNotes();
});

function displayNotes() {
    notesContainer.innerHTML = "";

    notes.forEach((note, index) => {
        const noteCard = document.createElement("div");
        noteCard.classList.add("note-card");

        const notePara = document.createElement("p");
        notePara.textContent = note;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");
        editBtn.onclick = () => editNote(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => deleteNote(index);

        noteCard.appendChild(notePara);
        noteCard.appendChild(editBtn);
        noteCard.appendChild(deleteBtn);

        notesContainer.appendChild(noteCard);
    });
}

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

function editNote(index) {
    const updatedNote = prompt("Edit your note:", notes[index]);

    if (updatedNote !== null && updatedNote.trim() !== "") {
        notes[index] = updatedNote.trim();
        localStorage.setItem("notes", JSON.stringify(notes));
        displayNotes();
    }
}