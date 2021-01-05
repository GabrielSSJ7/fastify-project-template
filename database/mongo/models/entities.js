import mongoose from 'mongoose'
var Entities = new mongoose.Schema({
      name: {
        type: String,
        required: true
      }
  },{
  collection: 'entities',
  timestamps: true
});
module.exports = mongoose.model('entities', Entities);