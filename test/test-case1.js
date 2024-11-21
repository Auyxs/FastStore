import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
let userToken = '';
let adminToken = '';

const logResult = (operation, response) => {
  console.log(`\n=== ${operation} ===`);
  console.log(`Status: ${response.status}`);
  console.log('Response:', response.data);
};

const runTests = async () => {
  try {
    // 1. Register a regular user
    const registerUserResponse = await axios.post(`${BASE_URL}/register`, {
      email: 'user@example.com',
      password: 'mypassword123',
    });
    logResult('Register User', registerUserResponse);

    // 2. Login as regular user
    const loginUserResponse = await axios.post(`${BASE_URL}/login`, {
      email: 'user@example.com',
      password: 'mypassword123',
    });
    userToken = loginUserResponse.data.token;
    logResult('Login User', loginUserResponse);

    // 3. Login as admin
    const loginAdminResponse = await axios.post(`${BASE_URL}/login`, {
      email: 'admin@example.com',
      password: 'rootpassword',
    });
    adminToken = loginAdminResponse.data.token;
    logResult('Login Admin', loginAdminResponse);

    // 4. Create data as a regular user
    const createUserDataResponse = await axios.post(
      `${BASE_URL}/data`,
      {
        key: 'userData.txt',
        data: 'U29tZSB1c2VyIGRhdGE=', // Base64 encoded data
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    logResult('Create User Data', createUserDataResponse);
 
    // 5. Create second data as a regular user
    const createUserData2Response = await axios.post(
      `${BASE_URL}/data`,
      {
        key: 'userData2.txt',
        data: 'U29tZSB1c2VyIGRhdGE=', // Base64 encoded data
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    logResult('Create User Data', createUserData2Response);

    // 6. Create data as admin for another user
    const createAdminDataResponse = await axios.post(
      `${BASE_URL}/data`,
      {
        key: 'adminData.txt',
        data: 'U29tZSBhZG1pbiBkYXRh'
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );
    logResult('Create Admin Data', createAdminDataResponse);

    // 7. Get user data
    const getUserDataResponse = await axios.get(`${BASE_URL}/data/userData.txt`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    logResult('Get User Data', getUserDataResponse);

    // 8. User Update own data
    const updateUserDataResponse = await axios.patch(
      `${BASE_URL}/data/userData.txt`,
      {
        data: 'U29tZSB1cGRhdGVkIGRhdGE=', 
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    logResult('Update User Data', updateUserDataResponse);

    // 9. User deletes own data
    const deleteUserDataResponse = await axios.delete(`${BASE_URL}/data/userData.txt`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    logResult('Delete User Data', deleteUserDataResponse);

    // 10. Admin deletes another user's data
    const adminDeleteUserDataResponse = await axios.delete(`${BASE_URL}/data/userData2.txt`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
    logResult('Admin Deletes Another User\'s Data', adminDeleteUserDataResponse);
    
    // 11. Admin deletes own data
    const deleteAdminDataResponse = await axios.delete(`${BASE_URL}/data/adminData.txt`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
    logResult('Admin Deletes Another User\'s Data', deleteAdminDataResponse);

    // 11. Delete regular user
    const deleteUserResponse = await axios.delete(`${BASE_URL}/delete`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    logResult('Delete Regular User', deleteUserResponse);



  } catch (error) {
    console.error('Error during tests:', error.response?.data || error.message);
  }
};


runTests();
