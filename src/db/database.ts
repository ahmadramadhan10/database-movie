import {PrismaClient } from "@prisma/client";

const prisma:PrismaClient = new PrismaClient();

module.exports = {
    prisma
};