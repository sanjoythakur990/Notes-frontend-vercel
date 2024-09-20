import React, { useState, useEffect } from "react"; 
import "./App.css";
import axios from "axios";
import NoteModal from "./components/NoteModal";
import NotesList from "./components/NotesList";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/notes');
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addOrEditNote = async (note) => {
        try {
            if (currentNote) {
                await axios.put(`http://localhost:8000/notes/${currentNote.id}`, note);
            } else {
                await axios.post('http://localhost:8000/notes', note);
            }
            fetchNotes();
            closeModal();
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/notes/${id}`);
            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const openModal = (note = null) => {
        setCurrentNote(note);
        setModalOpen(true);
    };

    const closeModal = () => {
        setCurrentNote(null);
        setModalOpen(false);
    };

    return (
        <div className="App">
            <h1>My Notes</h1>
            <div className="header">
                <button onClick={() => openModal()}>Add New Note</button>
                <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>
            <NotesList notes={filteredNotes} onDelete={deleteNote} onEdit={openModal} />
            {modalOpen && <NoteModal note={currentNote} onSave={addOrEditNote} onClose={closeModal} />}
        </div>
    );
}

export default App;
