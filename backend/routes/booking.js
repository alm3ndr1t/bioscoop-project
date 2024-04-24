const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const seatController = require('../controllers/seatController');

// Define your routes for ticket bookings
router.post('/', bookingController.createBooking);
router.get('/:id', bookingController.getBookingById);
router.put('/bookings/:id', bookingController.updateBooking);
// router.delete('/bookings/:id', bookingController.deleteBooking);

// Add a route for fetching seats
router.get('/book/seats', seatController.getAllSeats);

// Add a route for purchasing tickets
router.post('/book/purchase', seatController.purchaseTickets);

module.exports = router;