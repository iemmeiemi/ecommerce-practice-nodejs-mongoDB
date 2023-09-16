const express = require('express');
require('dotenv').config();
const dbConnect = require('./config/dbconnect');
const initRoutes = require('./routes');

const app = express();
const port =  process.env.PORT || 8888;


app.use(express.json());
app.use(express.urlencoded({extended: true}));

//ket noi mOngoDB
dbConnect();
initRoutes(app);


app.listen(port, () => {
    console.log('Server running on port: http://localhost:' +port+ '/')
});
