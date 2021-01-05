const mUser = require('../database/mongo/models/users')

function userService() {

  function byId(_id){
    return mUser.findById(_id)
  }
  
  function one(query) {
    return mUser.findOne(query)
  }
  function all(query = {}, options = { page: 1, limit: 1}){
    options.limit = process.env.PAGINATION_LIMIT
    return mUser.paginate(query, options, function (err, result) {
      return result
    });
  }

  function save(data) {
      return mUser.create(data)
  }

  function update(_id, data) {
      return mUser.findByIdAndUpdate(_id,data,{ upsert: true, new:true})
  }

  function remove(){
    return false
  }

  return {
     byId,
     one,
     all,
     save,
     update
  }
}

module.exports = userService