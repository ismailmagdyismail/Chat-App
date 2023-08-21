const env = require('dotenv');
const PORT = process.env.PORT;
const mongoDB = require('./database/MongoDB');

env.config({path:'./config.env'});


const runServer = async function (){
    await  mongoDB.getInstance().connect();
}

runServer();