import express from 'express';
import Booking from './Booking';

const router = express.Router();

// CREATE NEW BOOKING
router.post('/', (req, res) => {
  Booking.create({
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
  })
    .then(booking => res.status(200).send(booking))
    .catch(() => res.status(500).send('Varausta ei voitu lisätä.'));
});

// GET ALL BOOKINGS
router.get('/', (req, res) => {
  Booking.find({})
    .then(bookings => res.status(200).send(bookings))
    .catch(() => res.status(500).send('Varauksia ei voitu hakea.'));
});

// TODO: GET ALL USERS bookings

// TODO: GET ONE BOOKING?

// DELETE ONE BOOKING
router.delete('/:id', (req, res) => {
  Booking.findByIdAndRemove(req.params.id)
    .then(booking => res.status(200).send(booking))
    .catch(() => res.status(500).send('Varausta ei voitu poistaa.'));
});

// TODO: UPDATE ONE BOOKING?

export default router;
