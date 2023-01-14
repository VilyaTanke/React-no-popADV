
import { ReactComponent as Icon } from '../../assets/LOGOReactNoPop.svg';
import BurgerMenu from '../common/burgerMenu/BurgerMenu.js';
import styles from './styles/Header.module.css';
import Confirm from '../common/confirm_element/Confirm.js';
import { useState } from 'react';
import { logout } from '../auth/service.js';
import { useDispatch } from 'react-redux';
import { authLogout } from '../../store/actions.js';

const Header = ({titleApp}) => {
  const  dispatch  = useDispatch()
  const [confirm, setConfirm] = useState(false);

  const handleConfirm = () => setConfirm(true);

  const notConfirm = () => setConfirm(false);

  const message = 'desea cerrar sesión?';

  const handleLogout = () => {
    logout();
    dispatch(authLogout());
  };

  return (
    <header className={styles.header__main}>
      <div className={styles.header__container}>
        <div className={styles.header__title}>
          
          
          <h1><Icon width="100" height="100"/>{titleApp}</h1>
        </div>

        <BurgerMenu confirm={confirm} onLogout={handleConfirm} />
      </div>
      {confirm && (
        <Confirm
          className={styles.header__confirm}
          children={message}
          confirm={handleLogout}
          notConfirm={notConfirm}
        />
      )}
    </header>
  );
};

export default Header;
