const bcrypt = require('bcrypt');
const saltRounds = 10;

function CryptService () {
    async function make(password) {
      return await bcrypt.hash(password, saltRounds).then((hash) => {
        return hash
      })
    }
    async function compare (password, hash){
      return await bcrypt.compare(password, hash).then((result) => {
        return result
      });
    }

    return {
      make,
      compare
    }
}
module.exports = CryptService