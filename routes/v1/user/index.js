'use strict'
const schemas = require('./schemas')
const controller = require('./controller')

module.exports = async function (fastify, opts) {
  fastify.post('/all', { schema: schemas.all }, controller().all)
  fastify.get('/:id', { schema: schemas.one }, controller().one)
  fastify.register(async function (fastify) {
    fastify.addHook('preHandler', fastify.authPreHandler)
    fastify.post('/', { schema: schemas.save }, controller().save)
    fastify.put('/:id', { schema: schemas.update }, controller().update)
    fastify.delete('/:id', { schema: schemas.remove }, controller().remove)
  })
  fastify.setErrorHandler(function (error, request, reply) {
    reply.send(error)
  })
}

module.exports[Symbol.for('plugin-meta')] = {
  decorators: {
    fastify: [
      'authPreHandler',
      'jwt'
    ]
  }
}
