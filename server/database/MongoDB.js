const IDatabase = require('./IDatabase');
const mongoose = require("mongoose");
const env = require('dotenv');
env.config({path:'./config.env'});


let instance = null;
class MongoDB extends IDatabase{
    #connectionString;
    constructor(connectionString) {
        super();
        this.#connectionString = connectionString;
    }
    async connect() {
        await mongoose.connect(this.#connectionString, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log("Successful DB Connection");
    }
}


module.exports.getInstance = function (){
    if(instance === null){
        instance = new MongoDB(process.env.CONNECTION_STRING);
    }
    return instance;
}