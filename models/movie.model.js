import { Schema, model } from "mongoose";

const schema = new Schema({
  title: { type: String, required: [true, "Title is required"], unique: true },
  desc: { type: String, required: [true, "Description is required"] },
  type: {type: String, required: [true, "Type of the drama is required"]},
  thumbnail : {type : String, required : [true, "Thumbnail is required"]}
});

const Movie = model("Movie", schema);

export default Movie;
