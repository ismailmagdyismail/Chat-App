const env = require('dotenv');
const app = require('./app');
const mongoDB = require('./database/MongoDB');

const PORT = process.env.PORT;
env.config({path:'./config.env'});


const runServer = async function (){
    await  mongoDB.getInstance().connect();
    app.listen(()=>{
        console.log(`Server Listening at PORT ${PORT}....`);
    })
}

runServer();