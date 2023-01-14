import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLogged } from '../../store/selectors';

const RequireAuth = ({ children }) => {
  const  isLogged  = useSelector(getIsLogged);
  if (!isLogged) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default RequireAuth;
