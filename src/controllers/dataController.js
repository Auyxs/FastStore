
import { readData, writeData } from '../utils/fileIO.js';
import { PATHS, ROLES } from '../utils/constants.js';


export const createData = async (request, reply) => {
  const { key, data} = request.body; 
  const user = request.user;
  let storedData = await readData(PATHS.DATA);
  
  storedData.push({ key, data, userEmail: user.email });
  
  await writeData(PATHS.DATA, storedData);
  
  reply.status(201).send({ message: 'Data saved' });
};


export const getData = async (request, reply) => {
  const { key } = request.params;
  const user = request.user; 
  const storedData = await readData(PATHS.DATA);
  
  const data = storedData.find(item => 
    item.key === key && (item.userEmail === user.email || user.role === ROLES.ADMIN)
  );

  if (!data) {
    return reply.status(404).send({ error: 'Data not found' });
  }
  
  reply.send(data);
};


export const updateData = async (request, reply) => {
  const { key } = request.params;
  const { data } = request.body;
  const user = request.user; 
  const storedData = await readData(PATHS.DATA);
  
  const item = storedData.find(item => 
    item.key === key && (item.userEmail === user.email || user.role === ROLES.ADMIN)
  );

  if (!item) {
    return reply.status(404).send({ error: 'Data not found' });
  }

  item.data = data;
  await writeData(PATHS.DATA, storedData);
  
  reply.send({ message: 'Data updated' });
};


export const deleteData = async (request, reply) => {
  const { key } = request.params;
  const user = request.user; 
  let storedData = await readData(PATHS.DATA);

  const itemToDelete = storedData.find(
    (item) => item.key === key && (item.userEmail === user.email || user.role === ROLES.ADMIN)
  );

  if (!itemToDelete) {
    return reply.status(404).send({ error: 'Data not found' });
  }

  storedData = storedData.filter((item) => item !== itemToDelete);

  await writeData(PATHS.DATA, storedData);

  reply.send({ message: 'Data deleted' });
};
