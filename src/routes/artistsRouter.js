const express = require ('express')
const artistsController = require('../controllers/artistsController')
const validator = require ('express-joi-validation').createValidator({})
const {bodySchema, paramsSchema, querySchema } = require('../validations/artistsValidator')

// definimos las rutas de los distintos endpoints
const router = (Artists) => {
  const artistsRouter = express.Router()

  const { getAllArtists, getArtistsById, postArtists, putArtistsById, deleteArtistsById} = artistsController(Artists)
  
  artistsRouter
  .route('/artists')
  .get(validator.query(querySchema),getAllArtists)
  .post(validator.body(bodySchema), postArtists)
  // query verifica por lo que filtre
  
  artistsRouter
  .route('/artists/:id')
  .get(validator.params(paramsSchema),getArtistsById)
  .put(validator.params(paramsSchema), putArtistsById)
  .delete(validator.params(paramsSchema), deleteArtistsById)
  // params lo verifica por el id

   
  return artistsRouter
 }
    
  module.exports = router
  