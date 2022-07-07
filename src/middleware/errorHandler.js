const ERROR_HANDLERS = {

  CastError: (res, err) =>
    res.status(404).send({ error: err.name, cause: err.message, message: 'Ingrese los datos correctamente' }),

  ValidationError: (res, err) =>
    res.status(422).send({ error: err.name, cause: err.message, message: 'Ingrese la data, por favor' }),

  MongoServerError: (res, err) =>
    res
      .status(400)
      .send({
        error: err.name,
        cause: err.message,
        message: 'No podes utilizar el mismo username, email o phone'
      }),
  defaultError: (res, err) =>
    res.status(500).send({ error: err.name, cause: err.message }),
}

const errorHandler = (err, req, res, next) => {
  const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError
  handler(res, err)
}



module.exports = errorHandler

