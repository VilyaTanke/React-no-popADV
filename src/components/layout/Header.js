import { ReactComponent as Icon } from "../../assets/LOGOReactNoPop.svg";
import BurgerMenu from "../common/burgerMenu/BurgerMenu.js";
import styles from "./styles/Header.module.css";
import Confirm from "../common/confirm_element/Confirm.js";
import { useDispatch, useSelector } from "react-redux";
import { authLogout, uiConfirm, uiNotConfirm } from "../../store/actions.js";
import { getUiConfirm } from "../../store/selectors.js";

const Header = ({ titleApp }) => {
  const dispatch = useDispatch();
  const confirm = useSelector(getUiConfirm);

  const handleConfirm = () => dispatch(uiConfirm());

  const handleNotConfirm = () => dispatch(uiNotConfirm());

  const message = "Are you sure for Logout?";

  const handleLogout = () => {
    dispatch(authLogout());
    dispatch(uiNotConfirm());
  };

  return (
    <header className={styles.header__main}>
      <div className={styles.header__container}>
        <div className={styles.header__title}>
          <h1>
            <Icon width="100" height="100" />
            {titleApp}
          </h1>
        </div>

        <BurgerMenu confirm={confirm} onLogout={handleConfirm} />
      </div>
      {confirm && (
        <Confirm
          className={styles.header__confirm}
          children={message}
          confirm={handleLogout}
          notConfirm={handleNotConfirm}
        />
      )}
    </header>
  );
};

export default Header;
