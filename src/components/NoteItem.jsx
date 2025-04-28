import styles from "./NoteItem.module.css";

const NoteItem = ({ note, deleteNote, searchString }) => {
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
        </div >
    );
}

export default NoteItem;