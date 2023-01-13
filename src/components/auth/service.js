import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../../api/client.js';
import storage from '../../utils/storage.js';

export const login = (credentials) => {
  return client.post('/api/auth/login', credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken);
    return accessToken;
  });
};

export const dataOwner = async () => {
  const data = await client.get('/api/auth/me');
  return data;
};

export const logout = () => {
  removeAuthorizationHeader();
  storage.remove('auth');
};
