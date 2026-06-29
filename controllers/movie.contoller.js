import { typeMap } from "../lib/localData.js";
import Movie from "../models/movie.model.js";

// List all the movies
export const ListMovies = async (req, res) => {
  try {
    const movie = await Movie.find();
    if (movie.length === 0) {
      res.status(404).json({ message: "No data found." });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

// Getting the particular movie detail
export const MovieDetail = async (req, res) => {
  try {
    const movie = await Movie.findById(req?.params?.id);
    res.status(201).json(movie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Getting the movie based on it's type
export const ListByType = async (req, res) => {
  try {
    const type = typeMap[req?.params?.type.toLowerCase()];

    if (!type) {
      res.status(400).json({
        message:
          "Invalid type. Please use movie, movies, series, film, films, tv, tvshow, tvshows",
      });
    }
    const data = await Movie.find({ type });
    if (data.length === 0) {
      res.json(404).json({ message: `No ${type} found` });
    }
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Adding a new movie
export const AddMovie = async (req, res) => {
  try {
    const type = typeMap[req.body.type];
    if (!type) {
      res.status(400).json({ message: `Invalid type.` });
    }
    const existingMovie = await Movie.findOne({ title: req.body.title });
    if (existingMovie) {
      return res.status(409).json({
        message: `${type === "movie" ? "Movie" : "Seiries"} already exist.`,
      });
    }

    await Movie.create({
      title: req.body.title,
      desc: req.body.desc,
      type,
      thumbnail : req.file.filename
    });
    res.status(200).json({
      message: `${type === "movie" ? "Movie" : "Series"} added successfully.`,
    });
  } catch (error) {
    const validationMessage = Object.values(error.errors)[0].message;
    res.status(400).json({ message: validationMessage });
  }
};

// Updating a existing movie
export const UpdateMovie = async (req, res) => {
  try {
    const type = typeMap[req.body.type.toLowerCase()];
    if (!type) {
      res.status(404).json({ message: "Invalid type." });
    }
    const movie = await Movie.findOneAndUpdate(
      { _id: req?.params?.id },
      {
        title: req.body.title,
        desc: req.body.desc,
        type,
        thumbnail : req.file.filename
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!movie) {
      res.status(404).json({ message: `${type} not found.` });
    }
    res
      .status(200)
      .json({
        message: `${
          type === "movie" ? "Movie" : "Seiries"
        } updated successfully.`,
      });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

// Delete a single movie
export const DeleteMovie = async (req, res) => {
  try {
    await Movie.deleteOne({ _id: req?.params?.id });
    res.status(200).json({ message: "Movie Deleted" });
  } catch (error) {
    res.status(404).json({ message: error?.message });
  }
};

// Delete all the movies and series
export const DeleteAll = async (req, res) => {
  try {
    await Movie.deleteMany({});
    res
      .status(200)
      .json({ message: "All Movies and Series deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};
