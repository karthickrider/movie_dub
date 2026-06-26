import Movie from "../models/movie.model.js";

export const ListMovies = async (req, res) => {
  try {
    const movie = await Movie.find();
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

export const MovieDetail = async (req, res) => {
  try {
    const movie = await Movie.findById(req?.params?.id);
    res.status(201).json(movie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const ListByType = async (req, res) => {
  try {
    const typeMap = {
      movie: "movie",
      movies: "movie",
      film: "movie",
      films: "movie",
      series: "series",
      tv: "series",
      tvshow: "series",
      tvshows: "series",
    };
    const type = typeMap[req?.params?.type.toLowerCase()];

    if (!type) {
      res
        .status(400)
        .json({
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

export const AddMovie = async (req, res) => {
  try {
    const existingMovie = await Movie.findOne({ title: req.body.title });
    if (existingMovie) {
      return res.status(409).json({ message: "Movie Already Exist" });
    }

    const movie = await Movie.create({
      title: req.body.title,
      desc: req.body.desc,
      type: req.body.type,
    });
    res.status(200).json({
      message:
        req.body.type === "movie"
          ? "Movie added successfully"
          : "Series added successfully",
    });
  } catch (error) {
    const validationMessage = Object.values(error.errors)[0].message;
    res.status(400).json({ message: validationMessage });
  }
};

export const UpdateMovie = async (req, res) => {
  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: req?.params?.id },
      {
        title: req.body.title,
        desc: req.body.desc,
        type: req.body.type,
      },
      {
        new: true,
      }
    );
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

export const DeleteMovie = async (req, res) => {
  try {
    await Movie.deleteOne({ _id: req?.params?.id });
    res.status(200).json({ message: "Movie Deleted" });
  } catch (error) {
    res.status(404).json({ message: error?.message });
  }
};
