import { useEffect, useState } from "react";
import styles from "./AddNoteForm.module.css";
import { motion } from "framer-motion";

const AddNoteForm = ({ addNote, isCreatingMode, setIsCreatingMode }) => {
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteText, setNewNoteText] = useState('');

    useEffect(() => {
        if (!isCreatingMode) {
            clearForm();
        }
    }, [isCreatingMode])

    function saveNote() {
        if (!newNoteTitle && !newNoteText) {
            return;
        }

        addNote(newNoteTitle, newNoteText);
        clearForm();
        setIsCreatingMode(false);
    }

    function setAutoHeight(element) {
        element.style.height = element.scrollHeight + 'px';
    }

    function clearForm() {
        setNewNoteTitle('');
        setNewNoteText('');
    }

    return (
        <motion.div
            transition={{ duration: 0.2 }}
            layout>
            <div className={styles.addNoteForm}
                onClick={(event) => event.stopPropagation()}>
                <motion.div
                    layout>
                    <input
                        maxLength={40}
                        className={styles.titleInput}
                        value={newNoteTitle}
                        type="text"
                        placeholder="Set Title..."
                        onChange={event => setNewNoteTitle(event.target.value)}
                        onFocus={() => setIsCreatingMode(true)} />
                </motion.div>
                {
                    isCreatingMode &&
                    <div
                        className={styles.textareaContainer}>
                        <textarea
                            value={newNoteText}
                            className={styles.noteText}
                            placeholder="Set Text..."
                            onChange={event => setNewNoteText(event.target.value)}
                            onInput={event => setAutoHeight(event.target)}
                        />
                        <button
                            onClick={saveNote}
                            className={styles.saveButton}>
                            Save
                        </button>
                    </div>
                }
            </div>
        </motion.div>
    )
}

export default AddNoteForm;