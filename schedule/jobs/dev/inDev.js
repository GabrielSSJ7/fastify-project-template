module.exports = function(agenda) {
  agenda.define('inDev', (job, done) => {
    console.log('[inDev]', JSON.stringify(job.attrs.data))
    done()
  })
  agenda.define('job x', (job, done) => {
    console.log('JOB [x]', JSON.stringify(job.attrs.data))
    done()
  })
}
