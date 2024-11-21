# FastStore
Node.js project built with the Fastify framework, implementing a simple authentication system and data storage solution.

### Usage
```js
npm i                   // fastify bcryptjs jsonwebtoken axios
npm run start          // Node.js v20+ is required by Fastify V5
```

### Testing
Use the following command to test the implemented API endpoint with the Axios HTTP client library.
```js
npm run test1          // Test for successful use cases
npm run test2          // Test for error handling scenarios
```

### Project Structure
```js
FastStore/
├── data/
│   ├── data.json    
│   └── users.json
├── src/
│   ├── controllers/                    
│   │   ├── dataController.js       // handlers for dataRoutes
│   │   └── userController.js       // handlers for userRoutes
│   ├── routes/                     // routes declaration
│   │   ├── dataRoutes.js          
│   │   └── userRoutes.js   
│   ├── utils/
│   │   ├── constants.js
│   │   ├── fileIO.js
│   │   ├── hash.js
│   │   └── jwt.html
│   └── app.js                        
└── test/                            // scripts for endpoint testing
├── README.md
└── package.json

```

---

### Additional Notes

 - A user with the Admin role can read, modify, and delete all saved data.
 - An Admin cannot add data for another user or manage registered users.
 - It is not possible to register as an Admin directly through the registration process.
 - Only one Admin is manually registered in users.json with the following credentials:    

    ```
    "email": "admin@example.com"
    "password": "rootpassword"
    ```

#### Unhandled Case
- Adding multiple data with duplicate keys



