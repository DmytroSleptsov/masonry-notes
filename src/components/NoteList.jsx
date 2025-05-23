import { useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";
import styles from "./NoteList.module.css";
import { AnimatePresence, motion } from "framer-motion";
import UpdateNoteModal from "./UpdateNoteModal";

const NoteList = ({ filteredNotes, deleteNote, changeProp, getIsUpdatedNote, setUpdatedNoteId, searchString }) => {
    const [modalActive, setModalActive] = useState(false);
    const [updatedNote, setUpdatedNote] = useState(null);
    const notesListRef = useRef(null);

    useEffect(() => {
        if (filteredNotes.length === 0) {
            return;
        }

        let columnLengths = [0, 0, 0];
        let masonry = notesListRef.current;
        let noteIds = filteredNotes.map(note => note.id);
        let noteItems = Array.from(masonry.querySelectorAll(`.${styles.masonryItem}`))
        let deletedElements = noteItems
            .filter(note => !note.classList.contains(styles.placeholder)
                && !noteIds.some(id => id === note.dataset.id));

        if (deletedElements) {
            deletedElements.forEach(element => {
                element.style.top = `${element.offsetTop}px`;
                element.style.left = `${element.offsetLeft}px`;
                element.style.width = `${element.offsetWidth}px`;
                element.style.height = `${element.offsetHeight}px`;
                element.style.zIndex = 1;
                element.style.position = 'absolute';
            })
        }

        let filteredNoteItems = noteItems.filter(note =>
            noteIds.some(id => id === note.dataset.id || note.classList.contains(styles.placeholder))
        );
        let rowGap = parseFloat(getComputedStyle(masonry).getPropertyValue('row-gap'));

        let placeholders = Array.from(masonry.querySelectorAll(`.${CSS.escape(styles.placeholder)}`));

        filteredNoteItems.forEach(noteItem => {
            let column = columnLengths.findIndex(length => length === Math.min(...columnLengths));
            noteItem.style.order = column + 1;
            columnLengths[column] += noteItem.offsetHeight + rowGap;
        });

        placeholders.forEach((placeholder, index) => {
            placeholder.style.order = index + 1;
            columnLengths[index] += placeholder.offsetHeight + rowGap;
        });

        masonry.style.minHeight = `${Math.max(...columnLengths)}px`;
    }, [filteredNotes]);

    let noteList =
        <div
            className={styles.masonry}
            ref={notesListRef}>
            <AnimatePresence >
                {
                    filteredNotes.map((note) =>
                        <motion.div
                            key={note.id}
                            data-id={note.id}
                            initial={{ opacity: 0, y: -100, x: 100 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, x: 200 }}
                            transition={{ duration: 0.2 }}
                            className={styles.masonryItem}
                            layout="position"
                            onClick={() => {
                                setModalActive(true);
                                setUpdatedNote(note);
                            }}>
                            <NoteItem
                                key={note.id}
                                note={note}
                                deleteNote={deleteNote}
                                changeProp={changeProp}
                                getIsUpdatedNote={getIsUpdatedNote}
                                setUpdatedNoteId={setUpdatedNoteId}
                                searchString={searchString} />
                        </motion.div>
                    )
                }
                <div key={'placeholder1'} className={styles.placeholder}></div>
                <div key={'placeholder2'} className={styles.placeholder}></div>
                <div key={'placeholder3'} className={styles.placeholder}></div>
            </AnimatePresence >
        </div>

    return (
        <div>
            <div className={styles.list}>
                {noteList}
            </div>
            <UpdateNoteModal
                modalActive={modalActive}
                setModalActive={setModalActive}
                updatedNote={updatedNote}
                setUpdatedNote={setUpdatedNote}
                changeProp={changeProp} />
        </div>
    );
}

export default NoteList;