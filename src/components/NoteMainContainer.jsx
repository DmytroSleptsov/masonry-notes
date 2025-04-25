import NoteList from "./NoteList";
import uuid from "react-uuid";
import styles from "./NoteMainContainer.module.css";
import { useEffect, useState } from "react";
import AddNoteForm from "./AddNoteForm";

function id() {
    return uuid();
}

const NoteMainContainer = () => {
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
    const [filteredNotes, setFilteredNotes] = useState(cloneNotes());
    const [isCreatingMode, setIsCreatingMode] = useState(false);
    const [updatedNoteId, setUpdatedNoteId] = useState(null);
    const [findString, setFindString] = useState('');

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    function cloneNotes() {
        return [...notes];
    }

    function addNote(newNoteTitle, newNoteText) {
        let newNote = { id: id(), title: newNoteTitle, text: newNoteText };
        let notesCopy = cloneNotes();
        notesCopy.unshift(newNote);

        setNotes(notesCopy);
    }

    function deleteNote(id) {
        setFilteredNotes(filteredNotes.filter(note => note.id !== id));
        setNotes(notes.filter(note => note.id !== id));
    }

    function changeProp(id, prop, value) {
        let updatedNotes = cloneNotes();
        updatedNotes.forEach(note => {
            if (note.id === id && note[prop] != value) {
                note[prop] = value;
            }
        });

        setNotes(updatedNotes);
    }

    function getIsUpdatedNote(id) {
        return updatedNoteId === id;
    }

    function filterNotes(findString) {
        if (!findString) {
            setFilteredNotes(cloneNotes());
        }
        let filteredNotes = notes.filter(note =>
            note.title.toLowerCase().includes(findString.toLowerCase().trim()) ||
            note.text.toLowerCase().includes(findString.toLowerCase().trim())
        );

        setFilteredNotes(filteredNotes);
    }

    return (
        <div
            className={styles.clickArea}
            onClick={() => setIsCreatingMode(false)}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Cool Notes</h1>
                <input
                    className={styles.findInput}
                    placeholder="Search note..."
                    type="search"
                    value={findString}
                    onChange={event => {
                        setFindString(event.target.value)
                        filterNotes(event.target.value);
                    }} />
                {
                    !findString &&
                    <AddNoteForm
                        addNote={addNote}
                        isCreatingMode={isCreatingMode}
                        setIsCreatingMode={setIsCreatingMode} />
                }
                <NoteList
                    notes={notes}
                    filteredNotes={filteredNotes}
                    deleteNote={deleteNote}
                    changeProp={changeProp}
                    getIsUpdatedNote={getIsUpdatedNote}
                    setUpdatedNoteId={setUpdatedNoteId} />
            </div>
        </div>
    );
}

export default NoteMainContainer;