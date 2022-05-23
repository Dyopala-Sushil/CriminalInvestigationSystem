const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String    
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    post: {
        type: String,
        required: true,
        enum: ['admin', 'officer']
    },
    profile: {
        public_id: {
            type: String
        },
        url: {
            type: String,
        }
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    }
}, {
    timestamps: true
});


const User = mongoose.model("User", UserSchema);

module.exports = User;