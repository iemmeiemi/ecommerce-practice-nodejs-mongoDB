const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default: 'user',
    },
    cart: {
        type: Array,
        default: []
    },
    address: [
        {type: mongoose.Types.ObjectId, ref: 'Address'}], //khoa phu FK
    wishlist: [{type: mongoose.Types.ObjectId, ref: 'Product'}],
    isBlocked: {
        type: Boolean, 
        default: false,
    },
    refreshToken: {
        type: String,
    },
    passwordChangedAt: {
        type: String,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpired: {
        type: String,
    },   
}, {
    timestamps: true,
});

//truoc khi save instance thi se chay ham nay de hash pass
//day duoc coi nhu la mot ham setter
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
})


//Export the model
module.exports = mongoose.model('User', userSchema);
