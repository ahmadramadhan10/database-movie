import { findMovieById, findMovieByTitle, findMovies } from "./app-repository";
import { insertMovie, deleteMovie, editMovie } from "./app-repository";
import { Film, prisma } from "../db/database";

export const getAllMovie = async(id : string, title : string) : Promise<Film[] | null> => {
    const movies = await findMovies(id, title);
    return movies;
}

export const getMovieById = async(id : string) : Promise<Film | null> => {
    const movie = await findMovieById(id);
    return movie;
};

export const getMovieByTitle = async(title : string) : Promise<Film | null> => {
    const movie = await findMovieByTitle(title);
    return movie;
};

export const createMovie = async(movie : Film) : Promise<Film> => {
    const movies = await insertMovie(movie);
    return movies;
};

export const deleteMovieById = async(id : string) : Promise<void> => {
    await getMovieById(id); // buat nyari tau apakah ada atau tidak
    await deleteMovie(id);
};

export const editMovieById = async(id : string, movie : Film) : Promise<Film> => {
    await getMovieById(id);

    const movies = editMovie(id, movie);

    return movies;
};



