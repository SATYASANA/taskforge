import jwt from 'jsonwebtoken';

// export const generateJWTToken = (userId, role, res) => {
//   const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
//     expiresIn: '1d',
//   });

//   res.cookie('token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV !== 'DEVELOPMENT',
//     sameSite: process.env.NODE_ENV === 'DEVELOPMENT' ? 'Lax' : 'None',
//     maxAge: 24 * 60 * 60 * 1000,
//   });
// };


export const generateJWTToken = (userId, role, res) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
   
  });

};
