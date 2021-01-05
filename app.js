'use strict'
const path = require('path')
const AutoLoad = require('fastify-autoload')
const fp = require('fastify-plugin')
require('./database/mongo')
const userModel = require('./database/mongo/models/users')
const agenda = require('./schedule/agenda')
if (process.env.CLUSTER_JOB) {
  const starter = require('./schedule/starter')
  starter.init(agenda)
}

// console.log('AGENDA', agenda)
// userModel.create({
//   "name": "Rodrigo",
//   "email": "Rodrigo@consensu.io",
//   "password": "1234",
//   "status": "getImageUrl"
// }).then(docs => {
//   console.log('DOCS' ,docs)
// })

// userModel.find({}).then(docs => {
//   console.log('DOCS' ,docs)
// })

module.exports = async function (fastify, opts) {
  const swaggerOption = {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Consensu.io API',
        description: 'The fastify swagger api',
        version: process.env.npm_package_version
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    hiddenTag: 'X-HIDDEN',
    exposeRoute: true
  }

  const schema = {
    type: 'object',
    required: [ 'MONGODB_URL', 'AGENDA_MONGO_URL','REDIS_HOST', 'JWT_SECRET', 'COOKIE_SECRET' ],
    properties: {
      MONGODB_URL: { type: 'string' },
      AGENDA_MONGO_URL: { type: 'string' },
      REDIS_URL: { type: 'string' },
      JWT_SECRET: { type: 'string' },
      COOKIE_SECRET: { type: 'string' }  
    },
    additionalProperties: false
  }

async function authenticator (fastify) {
  fastify
    // JWT is used to identify the user
    // See https://github.com/fastify/fastify-jwt
    .register(require('fastify-jwt'), {
      secret: fastify.config.JWT_SECRET,
      algorithms: ['RS256'],
    })
}


async function decorateFastifyInstance (fastify) {
  
  fastify.decorate('authPreHandler', async function auth (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
}


  fastify
    .register(require('fastify-cors'), {})
    .register(require('fastify-swagger'), swaggerOption)
    .register(require('fastify-env'), { schema, data: [ opts ] })

    .register(fp(authenticator))
    .register(fp(decorateFastifyInstance))
    .register(require('fastify-cookie'), {
      secret: process.env.COOKIE_SECRET, // for cookies signature
      parseOptions: {}     // options for parsing cookies
    })

  
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  fastify.ready(err => {
    if (err) throw err
    fastify.swagger()
  })
}
