const mongoose = require('mongoose');
const Agenda = require('agenda');
const path = require('path');
const fs = require('fs');
const agendaConfig = {
  name: 'agendaWorker',
  mongo: mongoose.connection,
  db: { collection: `${process.env.AGENDA_COLLECTION}` }
}
const agenda = new Agenda(agendaConfig);
if (process.env['CLUSTER_JOB']) {
  const directoryEnv = path.join(__dirname, `jobs/${process.env.APP_ENV}/`);
  const directoryGlobal = path.join(__dirname, 'jobs/global/');
  loadJobs(directoryGlobal, 'global')
  loadJobs(directoryEnv, process.env.APP_ENV)
}
agenda.start();
module.exports = agenda;

async function loadJobs(directoryPath, type) {
  fs.readdir(directoryPath, (err, files) => {
    if (!files) return false
    files.forEach(async job => {
      console.log(`[Agenda][${process.env.AGENDA_COLLECTION}][Job][${type}]:`, job)
      await require(directoryPath + job)(agenda);
    })
  });
}
