'use strict'
const S = require('fluent-schema')

const bodyJsonSchema = S.object()
  .prop('someKey', S.string())
  .prop('someOtherKey', S.number())
  .prop('requiredKey', S.array().maxItems(3).items(S.integer()).required())
  .prop('nullableKey', S.mixed([S.TYPES.NUMBER, S.TYPES.NULL]))
  .prop('multipleTypesKey', S.mixed([S.TYPES.BOOLEAN, S.TYPES.NUMBER]))
  .prop('multipleRestrictedTypesKey', S.oneOf([S.string().maxLength(5), S.number().minimum(10)]))
  .prop('notTypeKey', S.not(S.array()))

const headersJsonSchema = S.object()
  .prop('Authorization', S.string().required())

const schema = {
  body: bodyJsonSchema,
  headers: headersJsonSchema
}
module.exports = schema
