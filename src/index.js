const express = require('express')
const People = require('./models/peopleModel')
const Artists = require('./models/artistsModel')
const peopleRouter = require('./routes/peopleRouter')(People)
const artistsRouter = require('./routes/artistsRouter')(Artists)
const authRouter = require('./routes/authRouter')(People)
const errorHandler = require('./middleware/errorHandler')
const httpStatus = require('./helpers/httpStatus')
require ('dotenv').config()
const { expressjwt } = require('express-jwt')
// const PORT = process.env.PORT || 5000

const app = express()

// llama a la base de datos
require('./database/db')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.all(
    '/*', //para todos
     expressjwt({ secret: process.env.SECRET, algorithms: ['HS256']}).unless({ 
      path: ['/auth/login', '/auth/register']
      })
)

// me muestra si no estoy autorizado por el token
app.use((err, _, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(httpStatus.UNAUTHORIZED).json({
        error: err.name,
        cause: 'Unauthorized. Missing or invalid token provided.'
      })
    } else {
      next(err)
    }
  })

app.use('/api', peopleRouter, artistsRouter)

app.use('/', authRouter)

// llama a la función para decirme cual es el error
app.use(errorHandler)

app.listen(5000, () => {
    console.log('Server is running! :D')
})
 