const express = require ('express')
const authController = require('../controllers/authController')

const router = (People) => {
  const authRouter = express.Router()

  const { login, register } = authController(People)
  
  authRouter.route('/auth/login').post(login)
  
  authRouter.route('/auth/register').post(register)

  return authRouter
 }
    
  module.exports = router
  