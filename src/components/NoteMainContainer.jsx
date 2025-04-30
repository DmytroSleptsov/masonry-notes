import NoteList from "./NoteList";
import uuid from "react-uuid";
import styles from "./NoteMainContainer.module.css";
import { useEffect, useState } from "react";
import AddNoteForm from "./AddNoteForm";
import { AnimatePresence, motion } from "framer-motion";

function id() {
    return uuid();
}

const NoteMainContainer = () => {
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
    const [filteredNotes, setFilteredNotes] = useState(cloneNotes());
    const [isCreatingMode, setIsCreatingMode] = useState(false);
    const [findString, setFindString] = useState('');

    let isSomePinnedNotes = filteredNotes.some(note => note.isPinned);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    function cloneNotes() {
        return [...notes];
    }

    function addNote(newNoteTitle, newNoteText) {
        let newNote = {
            id: id(),
            title: newNoteTitle,
            text: newNoteText,
            isPinned: false
        };

        setFilteredNotes([newNote, ...filteredNotes])
        setNotes([newNote, ...notes]);
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

    function changeIsPinnedNote(id) {
        let changedNote;
        let updatedFilteredNotes = [...filteredNotes];
        updatedFilteredNotes.forEach(note => {
            if (note.id === id) {
                note.isPinned = !note.isPinned;
                changedNote = note;
            }
        });

        setFilteredNotes([changedNote, ...filteredNotes.filter(note => note.id !== id)]);
        setNotes([changedNote, ...notes.filter(note => note.id !== id)]);
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
                <AnimatePresence>
                    {
                        isSomePinnedNotes &&
                        <motion.div
                            className={styles.pinnedNotesContainer}
                            layout
                            transition={{ duration: 0.2 }}>
                            <motion.p
                                className={styles.notesListTitle}
                                layout
                                transition={{ duration: 0.2 }}>
                                PINNED
                            </motion.p>
                            <NoteList
                                filteredNotes={filteredNotes.filter(note => note.isPinned)}
                                deleteNote={deleteNote}
                                changeProp={changeProp}
                                changeIsPinnedNote={changeIsPinnedNote}
                                searchString={findString.toLowerCase()} />
                        </motion.div>
                    }
                    {
                        (isSomePinnedNotes && filteredNotes.filter(note => !note.isPinned).length !== 0) &&
                        <motion.p
                            className={styles.notesListTitle}
                            layout
                            transition={{ duration: 0.2 }}>
                            OTHER
                        </motion.p>
                    }
                    <NoteList
                        filteredNotes={filteredNotes.filter(note => !note.isPinned)}
                        deleteNote={deleteNote}
                        changeProp={changeProp}
                        changeIsPinnedNote={changeIsPinnedNote}
                        searchString={findString.toLowerCase()} />
                </AnimatePresence>
            </div>
        </div >
    );
}

export default NoteMainContainer;