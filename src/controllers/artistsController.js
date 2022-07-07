const httpStatus = require('../helpers/httpStatus');

// despues de armar los modelos, hacemos los controllers, donde esta la logica a cada uno de los endpoints(entradas q le ofrecemos a los usuarios para que puedan comunicarse)

const artistsController = (Artists) => {
    // Trae a los usuarios que cree en el post
    const getAllArtists = async (req, res, next) => {
        try {
            const { query } = req
            
            const response = await Artists.find(query)
            
            return res.status(httpStatus.OK).json(response)
        }catch (err) {
            next(err)
        }
    }
    
    // POST: se encarga de subir datos
    const postArtists = async (req, res, next) => {
        try {
            const { body } = req

            const artists = await new Artists(body)
            
            await artists.save()
             
            return res.status(httpStatus.CREATED).json(artists) 

        }   catch (err) {
            next(err)
        }
        
    }

    // PUT
    const putArtistsById = async (req, res, next) => {
        try {
            const { body, params } = req

            const checkData = await Artists.find({
                _id: params.id
            })

            if (checkData === null) {
                return res
                .status(httpStatus.FORBIDDEN)
                .send('No data found with the provided ID')
            }
  
            await Artists.updateOne(
            {
                _id: params.id
            }, 
            {
                $set: { 
                    firstName: body.firstName,
                    lastName: body.lastName,
                    nationality: body.nationality,
                    age: body.age,
                    movies: body.movies
                }
            })
            return res.status(httpStatus.CREATED).send('Data successful updated')
        } catch (err) {
            next(err)
        }

    }

    // GET
    const getArtistsById = async (req, res, next) => {
        try {
            const { params } = req
            
            const response = await Artists.findById(params.id)
         
            return res.status(httpStatus.OK).json(response)
        } catch (err) {
            next(err)
        }
    } 

    // DELETE
    const deleteArtistsById = async (req, res, next) => {
        try {
            const { params } = req
                
            await Artists.findByIdAndDelete(params.id)
                
            return res.status(httpStatus.OK).send('Data successful deleted')
        } catch (err){
        next(err)   
        }
        
    }
    
    
    return { 
        getAllArtists, 
        getArtistsById, 
        postArtists, 
        putArtistsById, 
        deleteArtistsById}
}
 

module.exports = artistsController