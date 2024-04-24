const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bookingController = {
  createBooking: async (req, res) => {
    try {
      const { showtimeId, userId, seats } = req.body;

      // Check if the showtime exists
      const showtime = await prisma.showtime.findUnique({
        where: { id: showtimeId },
      });

      if (!showtime) {
        return res.status(404).json({ error: "Showtime not found" });
      }

      // Check if the user exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create the booking
      const newBooking = await prisma.ticket.create({
        data: {
          showtimeId,
          userId: parseInt("2"),
          seats,
          purchaseDate: new Date(),
        },
      });

      res.status(201).json(newBooking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getBookingById: async (req, res) => {
    try {
      const booking = await prisma.ticket.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { showtime: true, user: true },
      });

      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      res.status(200).json(booking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateBooking: async (req, res) => {
    try {
      const { showtimeId, userId, seats } = req.body;

      const updatedBooking = await prisma.ticket.update({
        where: { id: parseInt(req.params.id) },
        data: {
          showtimeId,
          userId,
          seats,
        },
      });

      res.status(200).json(updatedBooking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getBookingById: async (req, res) => {
    try {
      const bookingId = parseInt(req.params.id);

      if (isNaN(bookingId)) {
        return res.status(400).json({ error: "Invalid booking ID" });
      }

      const booking = await prisma.ticket.findUnique({
        where: { id: bookingId },
        include: { showtime: true, user: true },
      });

      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      res.status(200).json(booking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

// Close the Prisma client when the application shuts down
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

module.exports = bookingController;
