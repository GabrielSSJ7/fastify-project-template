const sUser = require("../../../services/user")
function userController() {
  async function all(request,reply){
    let users = await sUser().all(request.body,request.query)
    reply.send(users)
  }

  function one(request,reply){
    reply.send(user[request.params.id])
  }

  function save(request,reply) {
    user.push(request.body)
    console.log('BODY', request.body)
    reply.send(request.body)
  }

  function update(request, reply){
    user[request.params.id] = request.body
    reply.send(user[request.params.id])
  }

  function remove(request,reply){
    delete user[request.params.id]
    reply.send({"status": !user[request.params.id]})
  }

  return {
     all,
     save,
     one,
     update,
     remove
  }
}

module.exports = userController