import styles from './BurgerMenu.module.css';
import burguerPic from '../../../assets/menu.svg';
import Button from '../Button.js';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const BurgerMenu = ({ onLogout }) => {
  const checkBoxElement = useRef();
  const offCheck = () => {
    checkBoxElement.current.checked = false;
  }; //cambiar funcion a estado

  return (
    <nav className={styles.burger__menu__wrapper}>
      <label htmlFor='menu' className={styles.burger__menu__label}>
        <img src={burguerPic} className={styles.burger__menu__img} alt='Menu' />
      </label>
      <input
        ref={checkBoxElement}
        type='checkbox'
        id='menu'
        className={styles.burger__menu__input}
      />
      <div className={styles.burger__menu__list} onClick={offCheck}>
        <Button
          as={Link}
          to='/'
          type='button'
          variant='primary'
          className='loginForm-submit'
        >
          Inicio
        </Button>
        <Button
          as={Link}
          to='/ads/new'
          type='submit'
          variant='primary'
          className='loginForm-submit'
        >
          Crear
        </Button>

        <Button
          type='submit'
          variant='primary'
          className='loginForm-submit'
          onClick={onLogout}
        >
          Salir
        </Button>
      </div>
    </nav>
  );
};

export default BurgerMenu;
