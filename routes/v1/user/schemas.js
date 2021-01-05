'use strict'
const S = require('fluent-schema')

const bodyJsonSchema = S.object()
  .prop('name', S.string())
  .prop('email', S.string())
  .prop('password', S.string())
  .prop('site', S.string())

const headersJsonSchema = S.object()
  .prop('Authorization', S.string().required())

const schemaSaveOrUpdate = {
  body: bodyJsonSchema,
  headers: headersJsonSchema
}

const schemaOneOrDelete = {
  headers: headersJsonSchema
}

module.exports = {
  all: {},
  save: schemaSaveOrUpdate,
  one: schemaOneOrDelete,
  update: schemaSaveOrUpdate,
  remove: schemaOneOrDelete
}
