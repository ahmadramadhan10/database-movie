// Layered yang berhubungan langsung dengan Database
import { prisma, Film, data } from "../db/database";
import fs from "fs"

export async function loadData() : Promise<void> {
    await prisma.movies.deleteMany(); // Hapus database sebelum dimasukin yang baru
    for(let i = 0; i < data.length; ++i) {
        const movie : Film | null = await findMovieById(data[i].imdbID);
        if(!movie) {
            await insertMovie(data[i]);
        }
    }
}

export async function overWrite() : Promise<void> {
    const movies : Film[] | null = await prisma.movies.findMany(); // buat handle query params
    const path = "./movies.json";
    //console.log(movies); 
    fs.writeFile(path, JSON.stringify(movies, null, 2), err => {
        if(err) throw "Error";
    });
}

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