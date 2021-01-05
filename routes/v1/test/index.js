'use strict'
const schemas = require('./schemas')
const controller = require('./controller')
module.exports = async function (fastify, opts) {
  fastify.get('/', { schema: schemas }, async function (request, reply) {
    console.log(request.cookies);
    const foo =  request.cookies.foo
    let bar = {}
    if(request.cookies.bar){
      bar =  reply.unsignCookie(request.cookies.bar)
      console.log('BAR UNSIGN', bar)
    }
    reply
    .setCookie('foo', 'foo', {
      path: '/',
      signed: true
    })
    .setCookie('bar', 'bar', {
      path: '/',
      signed: true
    })
    .send({'message': controller().getName(), 'cookies': {'bar': JSON.stringify(bar)} })
  })

  fastify.register(async function (fastify) {
    // console.log('Fastify in index',typeof fastify.addHook('preHandler', () => {
    //   console.log('FUNCIONOU O HOOK')
    // }))
    fastify.addHook('preHandler', fastify.authPreHandler)
    fastify.get('/name', { schema: schemas }, async function (request, reply) {
      reply
      .setCookie('token', 'aushduhaudhausda', {
        domain: '0.0.0.0',
        path: '/',
        secure: true, // send cookie over HTTPS only
        httpOnly: true,
        sameSite: true // alternative CSRF protection
      })
      .code(200)
      .send({'message': controller().getName()}) 
      
    })
    fastify.get('/fullname', { schema: schemas }, async function (request, reply) {
      return {'message': controller().getFullName()}
    })
  })

  fastify.setErrorHandler(function (error, request, reply) {
    reply.send(error)
  })
}

// Fastify checks the existance of those decorations before registring `user.js`
module.exports[Symbol.for('plugin-meta')] = {
  decorators: {
    fastify: [
      'authPreHandler',
      'jwt'
    ]
  }
}
