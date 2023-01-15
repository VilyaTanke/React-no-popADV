import Button from "../Button.js";
import styles from "./Confirm.module.css";
const Confirm = ({ children, confirm, notConfirm }) => {
  return (
    <div className={styles.confirm__container}>
      <div className={styles.confirm__message}>{children}</div>

      <div className={styles.confirm__button__container}>
        <Button onClick={confirm} variant="primary">
          Si
        </Button>
        <Button onClick={notConfirm} variant="primary">
          No
        </Button>
      </div>
    </div>
  );
};

export default Confirm;
