import styles from "./MainMenu.module.css";
import Button from "../Button.js";
import { Link } from "react-router-dom";
import { useRef } from "react";

const MainMenu = ({ onLogout }) => {
  const checkBoxElement = useRef();
  const offCheck = () => {
    checkBoxElement.current.checked = false;
  };

  return (
    <nav className={styles.main__menu__wrapper}>
      <div className={styles.main__menu__list} onClick={offCheck}>
        <Button
          as={Link}
          to="/"
          type="button"
          variant="primary"
          className="loginForm-submit">
          Inicio
        </Button>
        <Button
          as={Link}
          to="/ads/new"
          type="submit"
          variant="primary"
          className="loginForm-submit">
          Crear
        </Button>

        <Button
          type="submit"
          variant="primary"
          className="loginForm-submit"
          onClick={onLogout}>
          Salir
        </Button>
      </div>
    </nav>
  );
};

export default MainMenu;
