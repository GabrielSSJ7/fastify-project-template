'use strict'
const schemas = require('./schemas')
const controller = require('./controller')

module.exports = async function (fastify, opts) {
  fastify.post('/login', { schema: schemas.login },  await controller(fastify).login)
  fastify.post('/register', { schema: schemas.register }, await controller(fastify).register)
  fastify.register(async function (fastify) {
    fastify.addHook('preHandler', fastify.authPreHandler)
    fastify.post('/verify', { schema: schemas.verify }, await controller(fastify).verify)
    fastify.get('/verify', { schema: schemas.verify }, await controller(fastify).verify)
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
