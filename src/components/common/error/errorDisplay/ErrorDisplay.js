import styles from './ErrorDisplay.module.css';

const ErrorDisplay = ({ resetError, error }) => {
  return (
    <div className={styles.loginPage__error} onClick={resetError}>
      {error.message}
    </div>
  );
};

export default ErrorDisplay;
