import { hashPassword, verifyPassword } from '../utils/hash.js';
import { generateJwt } from '../utils/jwt.js';
import { readData, writeData } from '../utils/fileIO.js';
import { PATHS, ROLES } from '../utils/constants.js';


export const registerUser = async (request, reply) => {
  const { email, password, role = ROLES.USER } = request.body; 
  let users = await readData(PATHS.USERS);

  if (users.find(user => user.email === email)) {
    return reply.status(400).send({ error: 'User already exists' });
  }

  const hashedPassword = hashPassword(password);
  
  const newUser = { email, password: hashedPassword, role };
  users.push(newUser);
  await writeData(PATHS.USERS, users);

  reply.status(201).send({ message: 'User registered' });
};


export const loginUser = async (request, reply) => {
  const { email, password } = request.body;
  const users = await readData(PATHS.USERS);
  
  const user = users.find(user => user.email === email);
  
  if (!user || !verifyPassword(password, user.password)) {
    return reply.status(401).send({ error: 'Invalid credentials' });
  }

  const token = generateJwt({ email: user.email, role: user.role });

  reply.send({ token });
};


export const deleteUser = async (request, reply) => {
  const { email, role } = request.user;  
  let users = await readData(PATHS.USERS);

  if (role !== 'admin' && email !== request.user.email) {
    return reply.status(403).send({ error: 'Forbidden: You can only delete your own account' });
  }

  users = users.filter(user => user.email !== email);

  await writeData(PATHS.USERS, users);

  reply.send({ message: 'User deleted' });
};
