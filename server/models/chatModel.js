const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    }],

});

/**
 *
 *      chatSchema.methods.pre('save',async function (next){
 *          /// check if participants are the same
 *      });
 */


const Chat = new mongoose.model('Chat',chatSchema);
module.exports = Chat;