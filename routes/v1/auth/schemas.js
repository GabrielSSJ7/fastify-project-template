'use strict'
const S = require('fluent-schema')

const bodyLoginJsonSchema = S.object()
  .prop('email', S.string())
  .prop('password', S.string())
  
const bodyRegisterJsonSchema = S.object()
  .prop('name', S.string())
  .prop('website', S.string())
  .prop('email', S.string())
  .prop('password', S.string())
  .prop('agree', S.string())

const headersJsonSchema = S.object()
  .prop('Authorization', S.string().required())

const schemaLogin = {
  body: bodyLoginJsonSchema
}

const schemaRegister = {
  body: bodyRegisterJsonSchema
}

const schemaVerify = {
  headers: headersJsonSchema
}

module.exports = {
  verify: schemaVerify,
  login: schemaLogin,
  register: schemaRegister
}
