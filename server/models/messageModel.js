const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content:{
        type:String,
        required:[true,"Message cannot be empty"],
        trim:true,
    },
    sentBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
    },
    conversation:{
        type:mongoose.Schema.ObjectId,
        ref:'Chat',
    },
});


const Message = new mongoose.model('Message',messageSchema);

module.exports = Message;