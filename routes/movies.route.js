import express from "express";
import { AddMovie, DeleteMovie, ListMovies, UpdateMovie } from "../controllers/movie.contoller.js";

const router = express.Router();

router.get("/", ListMovies);

router.post('/', AddMovie)

router.put('/:id', UpdateMovie)

router.delete('/:id', DeleteMovie)

export default router;