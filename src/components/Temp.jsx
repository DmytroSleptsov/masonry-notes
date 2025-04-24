import styles from "./Temp.module.css";

const Temp = () => {
    return (
        <div className={styles.tempFlex}>
            <div className={styles.tempElement}>
                <h3>1</h3>
            </div>
            <div className={styles.tempElement}>2</div>
            <div className={styles.tempElement}>
                <h1>3</h1>
            </div>
        </div>
    );
}

export default Temp;