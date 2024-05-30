const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    role_name: String,
    description: String,
    permissions: [String],
    location_access: [String],
    isActive: Boolean

}, { timestamps: true })

const Role = mongoose.model('Role', userSchema)

module.exports = Role
