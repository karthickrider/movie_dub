import Movie from "../models/movie.model.js";

  export const ListMovies = async(req, res) => {
    try {
        const movie = await Movie.find();
        res.status(200).json(movie)
        
    } catch (error) {
        res.status(400).json({message : error?.message})
    }
  }

  export const MovieDetail = async(req,res) => {
    try {
        const movie = await Movie.findById(req?.params?.id)
        res.status(201).json(movie)
        
    } catch (error) {
        res.status(404).json({message : error.message})
    }
  }

  export const AddMovie = async(req,res) => {

    const newMovie = new Movie({
        title : req.body.title,
        desc : req.body.desc
    })

    try {        
        const movie = await newMovie.save();
        res.status(200).json(movie)

    } catch (error) {
        res.status(400).json({message : error?.message})
    }
    
  }
  
  export const UpdateMovie = async(req,res) => {

    try {
        const movie = await Movie.findOneAndUpdate({_id : req?.params?.id}, {
            title : req.body.title,
            desc : req.body.desc
        },
        {
            new : true
        }
    )
        res.status(200).json(movie)
        
    } catch (error) {
        res.status(400).json({message : error?.message})
    }

      
  }
  
  export const DeleteMovie = async(req,res) => {
    try {
        await Movie.deleteOne({_id:req?.params?.id});
        res.status(200).json({message : "Movie Deleted"})
        
    } catch (error) {
        res.status(404).json({message : error?.message})
    }
  }