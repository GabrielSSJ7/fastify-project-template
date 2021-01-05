import mongoose from 'mongoose';
var Groups = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    entities: [{
        entity: {
            type: mongoose.ObjectId,
            ref: 'entities'
        },
        events: [{
            type: mongoose.ObjectId,
            ref: 'events'
        }]
    }]
  },{
  collection: 'groups',
  timestamps: true
});
module.exports = mongoose.model('groups', Groups);