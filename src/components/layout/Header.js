import { ReactComponent as Icon } from "../../assets/LOGOReactNoPop.svg";
import MainMenu from "../common/mainMenu/MainMenu";
import styles from "./styles/Header.module.css";
import Confirm from "../common/confirm_element/Confirm.js";
import { messageLogout } from '../../store/notifications.js';
import { useDispatch, useSelector } from "react-redux";
import { uiConfirm, uiConfirmed, uiNotConfirm } from '../../store/actions.js';
import { getUiConfirm } from "../../store/selectors.js";

const Header = ({ titleApp }) => {
  const dispatch = useDispatch();
  const confirm = useSelector(getUiConfirm);

  const handleConfirm = () => dispatch(uiConfirm({
    message: messageLogout
  }));

  const handleNotConfirm = () => dispatch(uiNotConfirm());

  const handleConfirmed = () => {
    dispatch(uiConfirmed());
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

        <MainMenu onLogout={handleConfirm} />
      </div>
      {confirm && (
        <Confirm
          className={styles.header__confirm}
          children={confirm.message}
          confirm={handleConfirmed}
          notConfirm={handleNotConfirm}
        />
      )}
    </header>
  );
};

export default Header;
