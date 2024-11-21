import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// const JWT_SECRET = process.env.JWT_SECRET;

const JWT_SECRET = 'supersecretkey';

export const generateJwt = (userData) => {
  return jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyJwt = async (request, reply) => {
  try {
    const token = request.headers['authorization'].split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    request.user = decoded; 
  } catch (err) {
    reply.status(401).send(new Error('Unauthorized'));
  }
};



