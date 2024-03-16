import {PrismaClient, movies } from "@prisma/client";
export const data = require("./src/db/movies.json");
export const prisma:PrismaClient = new PrismaClient();
export type Film = movies;