const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"A user Must Provide An Email"],
        minlength:12,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:[true,"A user must have a Password"],
        minlength:8,
    },
    passwordChangeTime:{
        type:Date
    }
});
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
        if(!this.isNew){
            this.passwordChangeTime = Date.now() - 1000 ;
        }
    }
    next();
});
userSchema.methods.comparePassword = async function (candidatePassword,storedPassword){
    return await bcrypt.compare(candidatePassword,storedPassword);
}
userSchema.methods.isChangedPassword = function(issuedTime){
    if(this.passwordChangeTime){
        const changeTime = this.passwordChangeTime.getTime() / 1000;
        return issuedTime < changeTime;
    }
    return false
}
User = new mongoose.model('User',userSchema);

module.exports = User