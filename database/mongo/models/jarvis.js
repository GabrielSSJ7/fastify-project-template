const mongoose = require('mongoose')

var model = new mongoose.Schema({
    name: {type: String, required: true},
    data: {type: Object, required: false},
    unique: {type: Object, required: false},
    repeat: {type: Object, required: false},
    repeatAt: {type: String, required: false},
    schedule: {type: String, required: false},
    priority: {type: String, required: false, default: 'normal'}
  }, {
      collection: 'jarvis',
      timestamps: true
});
module.exports = mongoose.model('jarvis', model);
