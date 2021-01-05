const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {
    collection: 'users',
    timestamps: true
})
User.plugin(mongoosePaginate);
User.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('users', User)