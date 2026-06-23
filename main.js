import express from "express";
import movieRoutes from "./routes/movies.route.js";

const app = express();
const PORT = 6565;

app.use(express.json());

app.use("/movies", movieRoutes);

app.get("/", (req, res) => {
  res.json({ msg: "Hello Karthick" });
});

app.listen(PORT, () => {
  console.log(`The app is running at http://localhost:${PORT}`);
});