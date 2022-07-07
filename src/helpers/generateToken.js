const jwt = require('jsonwebtoken')

// genero token
const generateToken =  () => {
const token = jwt.sign(
    {
      data: 'Acá van los datos'
    }, 
    process.env.SECRET, 
    { expiresIn: '1d'}
    )

    return token
}

module.exports = generateToken