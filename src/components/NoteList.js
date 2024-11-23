import React from "react";
import axios from "axios";

const NoteList = ({ notes, fetchNotes, setSelectedNote }) => {
  const handleDelete = async (id) => {
    await axios.delete(
      `https://personal-notes-manager-backend-bsq8.onrender.com/api/notes/${id}`
    );
    fetchNotes();
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
  };

  return (
    <div className="note-list">
      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <small>Category: {note.category}</small>
            <div className="note-actions">
              <button onClick={() => handleEdit(note)}>Edit</button>
              <button onClick={() => handleDelete(note.id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NoteList;
