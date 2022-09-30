import * as crypto from 'crypto';

type SecurePassword = {
  salt: string;
  passwordHash: string;
};

const hashAndSaltPassword = (password: string): SecurePassword => {
  const salt = crypto.randomBytes(16);
  const hashedPasswordBuffer = crypto.pbkdf2Sync(
    password,
    salt,
    310000,
    32,
    'sha256',
  );

  return {
    salt: salt.toString('hex'),
    passwordHash: hashedPasswordBuffer.toString('hex'),
  };
};

const validatePassword = (
  passwordToTest: string,
  passwordHash: string,
  storedSalt: string,
): boolean => {
  const decodedSalt = Buffer.from(storedSalt, 'hex');
  const passwordBufferToTest = crypto.pbkdf2Sync(
    passwordToTest,
    decodedSalt,
    310000,
    32,
    'sha256',
  );
  const actualPasswordBuffer = Buffer.from(passwordHash, 'hex');

  return crypto.timingSafeEqual(actualPasswordBuffer, passwordBufferToTest);
};

export { hashAndSaltPassword, validatePassword };
