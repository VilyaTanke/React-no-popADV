import { Navigate } from 'react-router-dom';
import { useAuthContext } from './Context.js';

const RequireAuth = ({ children }) => {
  const { isLogged } = useAuthContext();
  if (!isLogged) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default RequireAuth;
