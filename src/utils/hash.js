import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10); 
    return await bcrypt.hash(password, salt);  
  } catch (err) {
    console.error('Error hashing password:', err);
    throw err;  
  }
};

export const verifyPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};