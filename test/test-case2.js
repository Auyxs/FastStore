import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const logError = (operation, error) => {
  console.log(`\n=== ${operation} ===`);
  if (error.response) {
    console.log(`Status: ${error.response.status}`);
    console.log('Error Response:', error.response.data);
  } else {
    console.error('Error Message:', error.message);
  }
};

const runErrorTests = async () => {
    const loginUserResponse = await axios.post(`${BASE_URL}/login`, {
        email: 'admin@example.com',
        password: 'rootpassword',
      });
    const token = loginUserResponse.data.token;


  try {
    // 1. Access data without a token
    try {
      await axios.get(`${BASE_URL}/data/nonExistentKey`);
    } catch (error) {
      logError('Access Data Without Token', error);
    }

    // 2. Access a non-existent key with a valid token
    try {
      await axios.get(`${BASE_URL}/data/nonExistentKey`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      logError('Access Non-Existent Key', error);
    }

    // 3. Attempt to delete data without a token
    try {
      await axios.delete(`${BASE_URL}/data/someKey`);
    } catch (error) {
      logError('Delete Data Without Token', error);
    }

    // 4. Attempt to login with invalid credentials
    try {
      await axios.post(`${BASE_URL}/login`, {
        email: 'wronguser@example.com',
        password: 'wrongpassword',
      });
    } catch (error) {
      logError('Login With Invalid Credentials', error);
    }

    // 5. Attempt to register with an invalid email
    try {
      await axios.post(`${BASE_URL}/register`, {
        email: 'notanemail',
        password: 'validpassword123',
      });
    } catch (error) {
      logError('Register With Invalid Email', error);
    }

    // 6. Attempt to register with a short password
    try {
      await axios.post(`${BASE_URL}/register`, {
        email: 'valid@example.com',
        password: 'short',
      });
    } catch (error) {
      logError('Register With Short Password', error);
    }

    // 7. Attempt to create data with missing fields
    try {
      const loginUserResponse = await axios.post(`${BASE_URL}/login`, {
        email: 'admin@example.com',
        password: 'rootpassword',
      });
      const token = loginUserResponse.data.token;

      await axios.post(
        `${BASE_URL}/data`,
        {
          key: 'missingDataField.txt',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      logError('Create Data With Missing Fields', error);
    }

    // 8. Attempt to patch data with an invalid token
    try {
      await axios.patch(`${BASE_URL}/data/someKey`, {
        data: 'Invalid token test',
      }, {
        headers: {
          Authorization: 'Bearer invalidToken123',
        },
      });
    } catch (error) {
      logError('Patch Data With Invalid Token', error);
    }

    // 9. Attempt to delete a non-existent key
    try {
      await axios.delete(`${BASE_URL}/data/nonExistentKey`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      logError('Delete Non-Existent Key', error);
    }

  } catch (error) {
    console.error('Unexpected Error During Tests:', error.response?.data || error.message);
  }
};

runErrorTests();
