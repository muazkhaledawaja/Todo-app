/* eslint-disable prettier/prettier */
import { sign, verify } from 'jsonwebtoken';

const createToken = (id: number) => {
  const token = sign({ id }, process.env.JWT_KEY);

  return token;
};

const verifyToken = (authorization: string) => {
  const decoded = verify(authorization, process.env.JWT_KEY);

  return decoded;
};

export { createToken, verifyToken };
