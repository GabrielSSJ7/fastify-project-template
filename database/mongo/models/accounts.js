const mongoose = require('mongoose')
const Accounts = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    logo: {
        type: String,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "users" , required: true },
    guests: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        group: [{ type: mongoose.Schema.Types.ObjectId, ref: "groups" }],
      },
    ],
    status: {
        type: String,
        required: true
    }
}, {
    collection: 'accounts',
    timestamps: true
})

module.exports = mongoose.model('accounts', Accounts)