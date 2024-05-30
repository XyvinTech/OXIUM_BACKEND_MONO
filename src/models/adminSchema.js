const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({

    name: String,
    designation: String,
    email: String,
    mobile: String,
    password: String,
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
    },
    status: {
        type: Boolean,
default:false
    }


})

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
