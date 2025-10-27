import { CircleX } from "lucide-react";
import { classNames } from "../lib/utils";
import Alert from "./Alert";
import styles from "../styles/ErrorAlert.module.css";

const ErrorAlert = ({ className = "", errors }) => (
  <Alert className={classNames(styles.alert, className)}>
    <div className={styles.iconContainer}>
      <CircleX size={20} />
    </div>
    <div>
      {Array.isArray(errors) ? (
        <>
          <p className={styles.heading}>
            {errors.length === 1
              ? "There is an error in your submission"
              : `There are ${errors.length} errors in your submission`}
          </p>
          <ul className={styles.errorList}>
            {errors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        </>
      ) : (
        <span className={styles.message}>{errors.message}</span>
      )}
    </div>
  </Alert>
);

export default ErrorAlert;
