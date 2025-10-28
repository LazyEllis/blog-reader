import styles from "../styles/Dialog.module.css";

const Dialog = ({ children }) => (
  <dialog className={styles.dialog} open>
    <div className={styles.backdrop}></div>

    <div className={styles.panelOuter}>
      <div className={styles.panelInner}>
        <div className={styles.panel}>{children}</div>
      </div>
    </div>
  </dialog>
);

export default Dialog;
