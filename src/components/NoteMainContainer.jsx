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
        filterNotes(findString);
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
            if (note.id === id && note[prop] !== value) {
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
            return;
        }

        let filteredNotes = notes.filter(note =>
            isNoteIncludingString(note, findString)
        );

        setFilteredNotes(filteredNotes);
    }

    function isNoteIncludingString(note, str) {
        return (
            isTextIncludesString(note.title, str) ||
            isTextIncludesString(note.text, str)
        );
    }

    function isTextIncludesString(text, str) {
        return text
            .toLowerCase()
            .includes(str.toLowerCase().trim());
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
                    setUpdatedNoteId={setUpdatedNoteId}
                    searchString={findString.toLowerCase()} />
            </div>
        </div>
    );
}

export default NoteMainContainer;