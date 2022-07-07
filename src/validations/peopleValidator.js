const Joi = require('joi')

const bodySchema = Joi.object ({
    firstName: Joi.string().alphanum().min(3).max(30).trim().required(),
    lastName: Joi.string().alphanum().min(3).max(30).trim().required(),
    username: Joi.string().min(6).max(16).required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(), 
    address: Joi.string().required(),
    phone: Joi.string().min(9).max(13).required()
})

const paramsSchema = Joi.object().keys({
  id: Joi.string().required(),
});

const querySchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).trim(),
    lastName: Joi.string().alphanum().min(3).max(30).trim(),
})


module.exports = { bodySchema, paramsSchema, querySchema }