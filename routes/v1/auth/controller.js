const sUser = require("../../../services/user")
const sAccount = require("../../../services/account")
const sCrypt = require("../../../services/crypt")
const sJwt = require("../../../services/jwt")

function authController(fastify) {

  async function login (request,reply) {
    let user = await sUser().one({'email': request.body.email}).lean()
    if(!user) return  new Error('NO_USER_FOUND')
    let compare = await sCrypt().compare(request.body.password, user.password)
    if(!compare) return  new Error('WRONG_PASSWORD')
    delete user.password
    let token = await sJwt().encode(user)
    reply
    .setCookie('token', token, {
      domain: 'localhost',
      path: '/',
      secure: true, // send cookie over HTTPS only
      httpOnly: true,
      sameSite: true // alternative CSRF protection
    })
    .send({ ...user,token })
  }
  
  async function register (request, reply) {
    let hash = await sCrypt().make(request.body.password)
    let account = {
      name: request.body.website,
      website: request.body.website,
      status: 'active'
    }
    let user = {
      ...request.body,
      password: hash,
      status: 'active'
    }
    delete user.website 
    let userDB = await sUser().save(user)
    account.owner = userDB._id
    let accountDB = await sAccount().save(account)
    console.log({ userDB, accountDB })
    delete userDB._doc.password
    console.log(userDB)
    let token = await sJwt().encode(userDB._doc)
    reply
    .setCookie('token', token, {
      domain: 'localhost',
      path: '/',
      secure: true, // send cookie over HTTPS only
      httpOnly: true,
      sameSite: true // alternative CSRF protection
    })
    .send({ ...userDB._doc ,token })
    
  }
  async function verify (request, reply) {
    const auth = request.headers.authorization;
    const token = auth.split(' ')[1]
    fastify.jwt.verify(token, async (err, decoded) => {
      if (err) fastify.log.error(err)
      let user = await sUser().byId(decoded._id).lean()
      delete user.password
      reply.send({...decoded,  token: fastify.jwt.sign(user)})
    })
  }

  
  return {
     login,
     register,
     verify
  }
}

module.exports = authController