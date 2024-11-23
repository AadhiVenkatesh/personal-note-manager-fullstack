import React, { useState, useEffect } from "react";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";
import SearchBar from "./components/SearchBar";
import "./styles/App.css";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const fetchNotes = async (filters = {}) => {
    const response = await axios.get(
      "https://personal-notes-manager-backend-bsq8.onrender.com/api/notes",
      {
        params: filters,
      }
    );
    setNotes(response.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="app-container">
      <h1>Note Manager</h1>
      <SearchBar onSearch={fetchNotes} />
      <NoteForm
        fetchNotes={fetchNotes}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />
      <NoteList
        notes={notes}
        fetchNotes={fetchNotes}
        setSelectedNote={setSelectedNote}
      />
    </div>
  );
}

export default App;
