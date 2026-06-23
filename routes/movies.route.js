import express from "express";
import { AddMovie, DeleteMovie, ListMovies, UpdateMovie, MovieDetail } from "../controllers/movie.contoller.js";

const router = express.Router();

router.get("/", ListMovies);

router.post('/', AddMovie)

router.get('/:id', MovieDetail)

router.put('/:id', UpdateMovie)

router.delete('/:id', DeleteMovie)

export default router;