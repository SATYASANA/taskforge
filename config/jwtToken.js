import jwt from 'jsonwebtoken';

export const generateJWTToken = (userId, role, res) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'DEVELOPMENT', // This is fine
    sameSite: 'None', // ✅ Required for cross-origin cookies (Netlify + Railway)
    maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
  });
};