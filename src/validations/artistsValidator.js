const Joi = require('joi')

const bodySchema = Joi.object ({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
   nationality: Joi.string().min(3).max(30).required(),
       age: Joi.string().min(1).max(30).required(),
    movies: Joi.string().min(1).max(30).required()
// el joi me maneja el error, verifica que ingrese todos los datos
})

const paramsSchema = Joi.object().keys({
  id: Joi.string().required(),
});

const querySchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).trim(),
    lastName: Joi.string().alphanum().min(3).max(30).trim(),
})


module.exports = { bodySchema, paramsSchema, querySchema}