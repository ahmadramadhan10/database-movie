// Handle pergerakan data baik itu insert, edit, maupun searching
import { error } from "console";
import { getMovieById } from "./app-service";
import { prisma, Film } from "../db/database";

export async function findMovies(imdbID : string, Title : string) : Promise<Film[] | null>{
    const movies = await prisma.movies.findMany({
        where : {
            imdbID,
            Title,
        },
    });
    return movies;
}

export async function findMovieById(imdbID : string) : Promise<Film | null>{
    const movie : Film | null = await prisma.movies.findUnique({
        where : {
            imdbID,
        },
    });

    return movie;
}

export async function findMovieByTitle(Title : string) : Promise<Film | null> {
    const movies : Film | null = await prisma.movies.findFirst({
        where : {
            Title,
        },
    });

    return movies;
}

export async function insertMovie(dataMovie : Film) : Promise<Film>{ // menambah film ke database
    const movie = await prisma.movies.create({
        data : {
            Title : dataMovie.Title,
            Year : dataMovie.Year,
            imdbID : dataMovie.imdbID,
            Type : dataMovie.Type,
            Poster : dataMovie.Poster
        }
    });
    return movie;
}

export async function deleteMovie(imdbID : string) : Promise<void> {
    await prisma.movies.delete({
        where : {
            imdbID, 
        },
    });
}

export async function editMovie(imdbID : string, dataMovie : Film) : Promise<Film> {
    const movies = await prisma.movies.update({
        where : {
            imdbID,
        },
        data : {
            Title : dataMovie.Title,
            Year : dataMovie.Year,
            imdbID : dataMovie.imdbID,
            Type : dataMovie.Type,
            Poster : dataMovie.Poster
        }
    });

    return movies;
}