import styles from "./NoteItem.module.css";

const NoteItem = ({ note, deleteNote }) => {
    const christ = "\u274C"

    return (
        <div
            className={styles.noteItem}>
            < div >
                <h3
                    className={styles.noteTitle}>
                    {note.title}
                </h3>
                <p
                    className={styles.noteText}>
                    {note.text}
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