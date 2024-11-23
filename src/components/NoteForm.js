import React, { useState, useEffect } from "react";
import axios from "axios";

const NoteForm = ({ fetchNotes, selectedNote, setSelectedNote }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Others",
  });

  useEffect(() => {
    if (selectedNote) {
      setFormData({
        title: selectedNote.title,
        description: selectedNote.description,
        category: selectedNote.category,
      });
    } else {
      setFormData({ title: "", description: "", category: "Others" });
    }
  }, [selectedNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedNote) {
      await axios.put(
        `https://personal-notes-manager-backend-bsq8.onrender.com/api/notes/${selectedNote.id}`,
        formData
      );
      setSelectedNote(null);
    } else {
      await axios.post(
        "https://personal-notes-manager-backend-bsq8.onrender.com/api/notes",
        formData
      );
    }
    fetchNotes();
    setFormData({ title: "", description: "", category: "Others" });
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Others">Others</option>
      </select>
      <button type="submit">{selectedNote ? "Update Note" : "Add Note"}</button>
    </form>
  );
};

export default NoteForm;
