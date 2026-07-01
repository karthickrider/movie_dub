import express from "express";
import { AddMovie, DeleteMovie, ListMovies, UpdateMovie, MovieDetail, ListByType, DeleteAll, SearchMovie } from "../controllers/movie.contoller.js";
import { upload } from "../lib/multerComp.js";

const router = express.Router();

router.get("/", ListMovies);

router.post('/', upload.single("thumbnail"), AddMovie)

router.get("/type/:type",ListByType)

router.get('/details/:id', MovieDetail)

router.get('/search', SearchMovie)

router.put('/:id', UpdateMovie)

router.delete('/:id', DeleteMovie)

router.delete('/',DeleteAll)

export default router;