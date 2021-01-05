const mJarvis = require('../database/mongo/models/jarvis')
module.exports = {
  getJobs(agenda){
    mJarvis.find().then(function(jobs){
      for (let i = 0; i < jobs.length; i++) {
        console.log(`[Agenda][${process.env.AGENDA_COLLECTION}][Javis]: Find Job > ${jobs[i].name}`, jobs[i])
        let job = agenda.create(jobs[i].name, jobs[i].data || {})
        if(jobs[i].repeat) job.repeatEvery(jobs[i].repeat.interval, jobs[i].repeat.configs || {})
        if(jobs[i].repeatAt) job.repeatAt(jobs[i].repeatAt)
        if(jobs[i].unique) job.unique(jobs[i].unique)
        if(jobs[i].priority) job.priority(jobs[i].priority)
        job.save()
      }
    })
  }
}
