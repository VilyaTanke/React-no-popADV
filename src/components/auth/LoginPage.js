import { useState } from 'react';
import styles from './LoginPage.module.css';
import Button from '../common/Button.js';
import CheckBox from '../common/CheckBox.js';
import FormField from '../common/formField/FormField.js';
import { login } from './service.js';
import storage from '../../utils/storage';
import ErrorDisplay from '../common/error/errorDisplay/ErrorDisplay.js';
import { ReactComponent as Icon } from '../../assets/LOGOReactNoPop.svg';
import { useDispatch } from 'react-redux';
import { authLogin } from '../../store/actions';


const LoginPage = ({titleApp}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(false);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleChangeEMail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);

  const handleChangeChecked = (event) => setCheck(event.target.checked);

  const resetError = () => setError(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      resetError();
      setIsFetching(true);
      const accesToken = await login({ email, password });

      dispatch(authLogin());

      check && storage.set('auth', accesToken);
    } catch (err) {
      setError(err);
    }
    setIsFetching(false);
  };
  const isEnabledButton = () => email && password && !isFetching;

  return (
    <div className="loginPage">
    <h1 className="loginPage-title">
        <Icon width="100" height="100"/>
        {'Bienvenido a'} <br />
        {`${titleApp}`}
      </h1>
      <h4 className={styles.loginPage__title}>
        Has login para empezar a navegar
      </h4>
      <form className={styles.loginPage__form} onSubmit={handleSubmit}>
        <FormField
          type='text'
          name='username'
          label='eMail'
          className="loginForm-field"
          onChange={handleChangeEMail}
          value={email}
        />

        <FormField
          type='password'
          name='password'
          label='password'
          className="loginForm-field"
          onChange={handleChangePassword}
          value={password}
        />

        <Button
          type='submit'
          className={styles.loginForm__submit}
          disabled={!isEnabledButton()}
        >
          Log in
        </Button>
        <CheckBox
          name='checklog'
          type='checkbox'
          label='Click para recordar usuario'
          onChange={handleChangeChecked}
          checked={check}
        />
      </form>
      {error && <ErrorDisplay error={error} resetError={resetError} />}
      <footer className={styles.footer}>@VilyaSoft</footer>
    </div>
  );
};

export default LoginPage;
