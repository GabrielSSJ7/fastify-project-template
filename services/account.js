const mAccount = require('../database/mongo/models/accounts')

function AccountService() {

  function byId(_id){
    return mAccount.findById(_id)
  }
  
  function one() {
    return mAccount.findOne({})
  }
  function all(query = {}, options = { page: 1, limit: 1}){
    options.limit = process.env.PAGINATION_LIMIT
    return mAccount.paginate(query, options, function (err, result) {
      return result
    });
  }

  function save(data) {
      return mAccount.create(data)
  }

  function update(_id, data) {
      return mAccount.findByIdAndUpdate(_id,data,{ upsert: true, new:true})
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

module.exports = AccountService