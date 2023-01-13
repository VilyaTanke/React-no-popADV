import Button from '../../Button.js';
import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className={styles.not__found__container}>
      <h1>Error 404 Not Found</h1>

      <Button as={Link} to='/' variant='primary'>
        Go to Home
      </Button>
    </div>
  );
};

export default NotFound;
