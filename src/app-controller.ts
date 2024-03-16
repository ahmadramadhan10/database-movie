import express from "express"
import { Film }from "./db/database";
import { Request, Response } from "express";
import { getAllMovie, getMovieById, getMovieByTitle,  createMovie, deleteMovieById, editMovieById} from "./app-service";

export const router = express.Router();
