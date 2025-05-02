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
    const [isCreatingMode, setIsCreatingMode] = useState(false);
    const [findString, setFindString] = useState('');

    let filteredNotes = filterNotes();
    let isSomePinnedNotes = filteredNotes.some(note => note.isPinned);

    useEffect(() => {
        filteredNotes = filterNotes();
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

        setNotes([newNote, ...notes]);
    }

    function deleteNote(id) {
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
        let changedNote = {};
        let updatedNotes = cloneNotes();
        updatedNotes.forEach(note => {
            if (note.id === id) {
                changedNote = { ...note };
                changedNote.isPinned = !changedNote.isPinned;
            }
        });

        setNotes([changedNote, ...(updatedNotes.filter(note => note.id !== id))]);
    }

    function filterNotes() {
        if (!findString) {
            return cloneNotes();
        }

        return notes.filter(note =>
            isNoteIncludingString(note, findString)
        );
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
                        <div
                            key="pinned"
                            className={styles.pinnedNotesContainer}>
                            <motion.p
                                className={styles.notesListTitle}
                                transition={{ duration: 0.2 }}
                                layout>
                                PINNED
                            </motion.p>
                            <NoteList
                                filteredNotes={filteredNotes.filter(note => note.isPinned)}
                                allNotes={notes}
                                deleteNote={deleteNote}
                                changeProp={changeProp}
                                changeIsPinnedNote={changeIsPinnedNote}
                                searchString={findString.toLowerCase()} />
                        </div>
                    }
                    {
                        (isSomePinnedNotes && filteredNotes.filter(note => !note.isPinned).length !== 0) &&
                        <div>
                            <motion.div
                                className={styles.splitLine}
                                transition={{ duration: 0.2 }}
                                layout>
                            </motion.div>
                            <motion.p
                                className={styles.notesListTitle}
                                transition={{ duration: 0.2 }}
                                layout>
                                OTHER
                            </motion.p>
                        </div>
                    }
                    <NoteList
                        key="unPinned"

                        filteredNotes={filteredNotes.filter(note => !note.isPinned)}
                        allNotes={notes}
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