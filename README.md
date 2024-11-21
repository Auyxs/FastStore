# FastStore

### Usage
```js
npm i                   // fastify bcryptjs jsonwebtoken axios
node run start          // Node.js v20+ is required by Fastify V5
```

### Testing
Use the following command to test the implemented API endpoint with a script written with the Axios HTTP client library.
```js
node run test1          // Test working cases
node run test2          // Test error handling
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
│   ├── routes/                     
│   │   ├── dataRoutes.js          
│   │   └── userRoutes.js   
│   ├── utils/
│   |   ├── constants.js
│   |   ├── fileIO.js
|   |   ├── hash.js
|   |   └── jwt.html
│   └── app.js                       
└── test/                           // scripts for endpoint testing
├── README.md
└── package.json

```

---

### Additional Notes

 - User with Admin Role can read, modify and delete all saved data. 
 - Admin cannot add a data for another user or manage registered users.
 - It's not possible to register as ADMIN.
 - A single Admin is manually registered in users.json with the following credentials:     

    ```
    "email": "admin@example.com"
    "password": "rootpassword"
    ```

#### Unhandled Cases
Adding multiple data with duplicate keys 

