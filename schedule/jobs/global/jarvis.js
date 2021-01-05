"use strict"
// import sJarvis from '../../../services/jarvis';
const sJarvis = require('../../../services/jarvis');
module.exports = function(agenda) {
  agenda.define('jarvis', (job, done) => {
    sJarvis.getJobs(agenda)
    done()
  });
}