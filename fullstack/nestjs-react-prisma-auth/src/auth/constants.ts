if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error('auth/constants: JWT_SECRET is not defined');
}

export const jwtConstants = {
  secret:
    process.env.NODE_ENV === 'production'
      ? process.env.JWT_SECRET
      : 'secretKey',
};
