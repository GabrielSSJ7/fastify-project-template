import mongoose from 'mongoose'
var Events = new mongoose.Schema({
    name: {
      type: String,
      required: true
    }
  },{
  collection: 'events',
  timestamps: true
});
module.exports = mongoose.model('events', Events);