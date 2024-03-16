import {PrismaClient, movies } from "@prisma/client";
export const data = require("../../movies.json");
export const prisma:PrismaClient = new PrismaClient();
export type Film = movies;