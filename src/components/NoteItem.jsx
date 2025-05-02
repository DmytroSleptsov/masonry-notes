import styles from "./NoteItem.module.css";
import uuid from "react-uuid";
import { TiPin, TiPinOutline } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";

const NoteItem = ({ note, deleteNote, searchString, changeIsPinnedNote }) => {
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
            <div className={styles.buttonsContainer}>
                <button
                    className={styles.button}
                    onClick={event => {
                        event.stopPropagation();
                        changeIsPinnedNote(note.id)
                    }}>
                    {
                        note.isPinned
                            ? <TiPin
                                className={styles.btnIcon} />
                            : <TiPinOutline
                                className={styles.btnIcon} />
                    }
                </button>
                <button
                    onClick={event => {
                        event.stopPropagation();
                        deleteNote(note.id);
                    }}
                    className={styles.button}>
                    <RxCross1
                        className={styles.btnIcon} />
                </button>
            </div>
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
        </div >
    );
}

export default NoteItem;