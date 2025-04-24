import { useEffect, useRef } from "react";
import Modal from "./Modal";
import styles from "./UpdateNoteModal.module.css";

const UpdateNoteModal = ({ modalActive, setModalActive, updatedNote, setUpdatedNote, changeProp }) => {
    const textAreaRef = useRef();
    const textPaddingBottom = 10;

    useEffect(() => {
        if (modalActive == true) {
            let textarea = textAreaRef.current;
            setAutoHeight(textarea);
            textarea.focus();
        }
    }, [modalActive]);

    function setAutoHeight(element) {
        element.style.height = 0;
        element.style.height = textPaddingBottom + element.scrollHeight + "px";
    }

    function updateNoteByProp(prop, value) {
        let noteCopy = { ...updatedNote };
        noteCopy[prop] = value;
        setUpdatedNote(noteCopy);
    }

    function save() {
        changeProp(updatedNote.id, 'title', updatedNote.title);
        changeProp(updatedNote.id, 'text', updatedNote.text);
        setModalActive(false);
    }

    return (
        <Modal
            active={modalActive}
            setActive={setModalActive}>
            <div className={styles.content}>
                <input
                    className={styles.titleInput}
                    type="text"
                    value={updatedNote ? updatedNote.title : ''}
                    onChange={event => updateNoteByProp('title', event.target.value)} />
                <textarea
                    ref={textAreaRef}
                    className={styles.textarea}
                    value={updatedNote ? updatedNote.text : ''}
                    onChange={event => updateNoteByProp('text', event.target.value)}
                    onInput={event => setAutoHeight(event.target)}>
                </textarea>
                <button
                    className={styles.saveButton}
                    onClick={save}>
                    Save
                </button>
            </div>
        </Modal>
    );
}

export default UpdateNoteModal;