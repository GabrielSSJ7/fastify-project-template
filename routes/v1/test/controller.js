// const userService from '@/services/user'  // ADD MODULE ALIAS

function userController() {

  function getName(){
    return 'Rafael'
  }

  function getFullName(){
    return 'Rafael Rodrigues'
  }

  return {
     getName,
     getFullName
  }
}

module.exports = userController