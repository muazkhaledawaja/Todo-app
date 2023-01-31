/* eslint-disable prettier/prettier */
import { sign, verify } from 'jsonwebtoken';

const createToken = (id: number) => {
  const token = sign({ id }, process.env.JWT_KEY);

  return token;
};

const verifyToken = (token: string) => {
  const decoded = verify(token, process.env.JWT_KEY);

  return decoded;
};

export { createToken, verifyToken };
