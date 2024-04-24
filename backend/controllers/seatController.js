const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seatsController = {
  getAllSeats: async (req, res) => {
    try {
      const seats = await prisma.seat.findMany({
        include: {
          hall: {
            include: {
              showtimes: {
                where: {
                  date: {
                    gte: new Date("2024-01-17T00:00:00Z"),
                    lt: new Date("2024-01-19T00:00:00Z"),
                  },
                },
                select: {
                  id: true,
                  tickets: {
                    select: {
                      id: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      // Map seats to include their availability status
      const seatsWithStatus = seats.map((seat) => {
        const isAvailable =
          seat.hall.showtimes.length === 0 ||
          seat.hall.showtimes.every(
            (showtime) => showtime.tickets.length === 0
          );

        return {
          ...seat,
          status: isAvailable ? "AVAILABLE" : "TAKEN",
        };
      });

      res.status(200).json(seatsWithStatus);
    } catch (error) {
      console.error("Error fetching seats:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },

  purchaseTickets: async (req, res) => {
    try {
      const { seats, showtimeId } = req.body;

      // Convert seats to a string
      const seatsString = String(seats);

      // Split the seats string into an array
      const selectedSeats = seatsString.split(",");
      // Create tickets for each selected seat
      const createdTickets = await Promise.all(
        selectedSeats.map(async (seat) => {
          return prisma.ticket.create({
            data: {
              showtimeId: parseInt(showtimeId),
              userId: parseInt("2"),
              seats: seat,
              purchaseDate: new Date(),
            },
          });
        })
      );

      res.status(201).json({
        message: "Tickets purchased successfully",
        tickets: createdTickets,
      });
    } catch (error) {
      console.error("Error purchasing tickets:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },

  // Close the Prisma client when the application shuts down
  closePrisma: async () => {
    await prisma.$disconnect();
  },
};

module.exports = seatsController;
