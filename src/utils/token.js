import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateResetToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_RESET_SECRET, { expiresIn: '1h' });
};

export const verifyResetToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_RESET_SECRET);
  } catch (error) {
    return null;
  }
};
