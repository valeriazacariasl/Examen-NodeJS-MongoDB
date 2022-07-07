const mongoose = require('mongoose')

const { Schema } = mongoose

const artistsModel = new Schema(
    {
        firstName: { type: String, required: true, minLength: 3, maxLength: 30},
        lastName: { type: String, required: true, minLength: 3, maxLength: 30},
        nationality: { type: String, required: true, maxLength: 30 },
        age: { type: Number, required: true },
        movies: { type: String, required: true, minLength: 3, maxLength: 30 },
    }
)
// definimos los modelos de los doc que vamos a guardar en nuestra base de datos

module.exports = mongoose.model('Artists', artistsModel)