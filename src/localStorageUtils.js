export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token');
export const setRefreshTokenToLS = (refreshToken) => localStorage.setItem('refresh_token', refreshToken);
