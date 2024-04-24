// movie2db.js

const { PrismaClient } = require("@prisma/client");
const fs = require("fs/promises");

const moviesData = require("/Users/alm3ndr1t/Desktop/project-web3/bioscoop-project-alm3ndr1t/project/movies.json");

const prisma = new PrismaClient();

async function importMovies() {
  try {
    for (const movieData of moviesData) {
      const { title, year, extract, thumbnail, genres, href, cast } = movieData;

      // Insert movie
      const movie = await prisma.movie.create({
        data: {
          title,
          year,
          extract: movieData.extract || "Not available at the moment",
          thumbnail: movieData.thumbnail || "Not available at the moment",
          href: movieData.href || "Not available at the moment",
        },
      });

      // Insert genres
      const genreRecords = await Promise.all(
        genres.map(async (genre) => {
          // Check if the genre already exists
          const existingGenre = await prisma.genre.findMany({
            where: { name: genre },
          });

          // If it exists, use the existing genre; otherwise, create a new one
          if (existingGenre.length > 0) {
            return existingGenre[0];
          } else {
            return prisma.genre.create({
              data: { name: genre },
            });
          }
        })
      );

      // Associate genres with the movie
      await prisma.movie.update({
        where: { id: movie.id },
        data: {
          genres: {
            connect: genreRecords.map((existingGenre) => ({
              id: existingGenre.id,
            })),
          },
        },
      });

      // Insert cast members
      const castMemberRecords = await Promise.all(
        cast.map(async (castMember) => {
          // Check if the cast member already exists
          const existingCastMember = await prisma.castMember.findMany({
            where: { name: castMember },
          });

          // If it exists, use the existing cast member; otherwise, create a new one
          if (existingCastMember.length > 0) {
            return existingCastMember[0];
          } else {
            return prisma.castMember.create({
              data: { name: castMember },
            });
          }
        })
      );

      // Associate cast members with the movie
      await prisma.movie.update({
        where: { id: movie.id },
        data: {
          cast: {
            connect: castMemberRecords.map((existingCastMember) => ({
              id: existingCastMember.id,
            })),
          },
        },
      });
    }

    console.log("Movies imported successfully.");
  } catch (error) {
    console.error("Error importing movies:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
importMovies();
