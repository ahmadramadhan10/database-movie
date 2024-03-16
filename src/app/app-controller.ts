import express from "express"
import { Film, data }from "../db/database";
import { getAllMovie, getMovieById, getMovieByTitle,  createMovie, deleteMovieById, editMovieById} from "./app-service";

export const router = express.Router();

// melakukan query params dengan id atau title
router.get("/", async(req, res) => {
    try {
        const id : string | null = req.query.id as string;
        const title: string | null = req.query.title as string;
        if(id && title || (!id && !title)) {
            const movies = await getAllMovie(id, title);
            if(!movies) throw "Not Found";
            res.status(200).send(movies);
        } else {
            let movie : Film | null = null;
            if(id) movie = await getMovieById(id);
            if(title) movie = await getMovieByTitle(title);
            
            if(movie == null) {
                throw "Not Found";
            } else {
                res.status(200).send(movie);
            }
        }
    } catch (error) {
        res.status(404).send(error);
    }
});

// request berdasarkan id
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await getMovieById(id);
        if(!movie) throw "Not Found";
        res.status(200).send(movie);
    } catch (error) {
        res.status(404).send(error);
    }
})


router.post("/", async (req, res) => {
    try {
        const dataMovie : Film = req.body;
        const movie : Film = await createMovie(dataMovie);
        res.status(200).send({
            data : movie,
            message : "Film berhasil ditambahkan",
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete("/:id", async(req, res) => {
    try {
        const movieId : string | null = req.params.id;
        await deleteMovieById(movieId);
        res.status(200).send("Berhasil dihapus");
    } catch (error) {
        res.status(400).send(error);
    }
});

router.patch("/:id", async(req, res) => {
    try {
        const movieId : string | null = req.params.id;
        const newData : Film = req.body;
        const newMovie = await editMovieById(movieId, newData);
        res.status(200).send({
            data : newMovie,
            message : "Data film berhasil di update"
        })
    } catch (error) {
        res.status(400).send(error);
    }
});