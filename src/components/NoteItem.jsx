import styles from "./NoteItem.module.css";
import uuid from "react-uuid";

const NoteItem = ({ note, deleteNote, changeProp, searchString, changeIsPinnedNote }) => {
    const christ = "\u274C"

    function getTextSpans(text) {
        let array = [];
        let index = text.toLowerCase().indexOf(searchString);
        if (index < 0 || !searchString) {
            addTextSpan(text, array);
            return array;
        }

        addTextSpan(text.slice(0, index), array)
        addTextSpan(text.slice(index, index + searchString.length), array, true)
        array.push(...getTextSpans(text.slice(index + searchString.length)));

        return array;
    }

    function addTextSpan(text, array, isSelect = false) {
        if (!text) {
            return;
        }

        array.push(
            <span
                key={uuid()}
                className={isSelect
                    ? styles.searchString
                    : ''}>
                {text}
            </span>
        );
    }

    return (
        <div
            className={styles.noteItem}>
            < div >
                <h3
                    className={styles.noteTitle}>
                    {getTextSpans(note.title)}
                </h3>
                <p
                    className={styles.noteText}>
                    {getTextSpans(note.text)}
                </p>
            </div>
            <a
                onClick={event => {
                    event.stopPropagation();
                    deleteNote(note.id);
                }}
                className={styles.deleteButton}>
                {christ}
            </a>
            <button
                onClick={event => {
                    event.stopPropagation();
                    changeIsPinnedNote(note.id)
                }}>
                {note.isPinned ? 'Unpin' : 'Pin'}
            </button>
        </div >
    );
}

export default NoteItem;