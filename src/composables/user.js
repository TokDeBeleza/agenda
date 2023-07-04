import AuthService from '../service/AuthService';

export const useIsAuthenticate = async () => {
  const token = localStorage.getItem('Token:');
  const authService = new AuthService();
  const user = await authService.verifyUser();
  return {
    token,
    user
  };
};
