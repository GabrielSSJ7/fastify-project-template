const jwt = require('jsonwebtoken');

function jwtService () {
    async function encode(payload) {
      return await jwt.sign(payload,process.env.JWT_SECRET)
    }
    async function decode (hash) {
      return  jwt.verify(hash, process.env.JWT_SECRET)
    }
    
    return {
      encode,
      decode
    }
}
module.exports = jwtService