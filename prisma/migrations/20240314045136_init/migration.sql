-- CreateTable
CREATE TABLE "movies" (
    "Title" TEXT NOT NULL,
    "Year" INTEGER NOT NULL,
    "imdbID" TEXT NOT NULL,
    "Type" TEXT NOT NULL,
    "Poster" TEXT NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("imdbID")
);
