import express from "express";
import movieRoutes from "./routes/movies.route.js";
import connectDB from "./lib/db.js";

const app = express();
const PORT = 6565;

app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.use("/movies", movieRoutes);
connectDB();

app.get("/", (req, res) => {
  res.json({ msg: "Hello Karthick" });
});

app.listen(PORT, () => {
  console.log(`The app is running at http://localhost:${PORT}`);
});