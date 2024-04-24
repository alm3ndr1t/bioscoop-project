const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function cleanDatabase() {
  try {
    // Delete all records from the Ticket model
    await prisma.ticket.deleteMany({});

    // Delete all records from the Showtime model
    await prisma.showtime.deleteMany({});

    // Delete all records from the Movie model
    await prisma.movie.deleteMany({});

    // Delete all records from the Hall model
    await prisma.hall.deleteMany({});

    // Delete all records from the Genre model
    await prisma.genre.deleteMany({});

    // Delete all records from the CastMember model
    await prisma.castMember.deleteMany({});

    // Delete all records from the User model
    await prisma.user.deleteMany({});
  } catch (error) {
    console.error("Error cleaning the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
cleanDatabase();
