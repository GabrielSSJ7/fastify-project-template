const agenda = require('agenda');
module.exports = {
  init(agenda) {
    console.log('TRY TO CREATE JARVIS ON AGENDA')
    return agenda.create('jarvis').unique({ 'insertOnly': true }).repeatEvery('30 seconds').save()
  }
};
