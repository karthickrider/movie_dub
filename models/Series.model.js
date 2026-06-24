import { model, Schema } from "mongoose";

const schema = new Schema({
  title: { type: String, required: [true, "Title is required"], unique: true },
  desc: { type: String, required: [true, "Description is required"] },
  type: {
    type: String,
    enum: ["movie", "series"],
    required: [true, "Type of the drama is required"],
  },
});

const Series = model("Series", schema);

export default Series;
