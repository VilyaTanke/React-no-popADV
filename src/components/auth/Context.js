import { createContext, useContext, useState } from 'react';
import { logout } from './service.js';

const AuthContext = createContext();

export const AuthContextConsumer = AuthContext.Consumer;

AuthContext.displayName = 'App';

export const AuthContextProvider = ({ haveToken, children }) => {
  const titleApp = 'React-no-pop-2';

  const [isLogged, setIsLogged] = useState(haveToken);

  const handleLogin = () => setIsLogged(true);

  const handleLogout = () => {
    logout();
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLogged, handleLogin, handleLogout, titleApp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const value = useContext(AuthContext);
  return value;
};

export default AuthContext;
