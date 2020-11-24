const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
  res.send(db.seats);
});

router.route('/seats/random').get((req, res) => {
  res.send(db.seats[Math.floor(Math.random() * db.seats.length)]);
});

router.route('/seats/:id').get((req, res) => {
  const element = db.seats.filter((element) => element.id == req.params.id);
  res.send(element);
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;

  const newSeat = {
    id: uuidv4(),
    day,
    seat,
    client,
    email,
  };

  if (
    db.seats.some((x) => x.day === day && x.seat == seat)
  ) {
    return res.status(409).send({ message: 'The slot is already taken...' });
  } else {
    db.seats.push(newSeat);

    return res.json({ message: 'OK' });
  }
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const element = db.seats.filter((element) => element.id == req.params.id);
  const index = db.seats.indexOf(element);
  const newSeat = {
    day: day,
    seat: seat,
    client: client,
    email: email,
  };
  db.seats.splice(index, 1, newSeat);

  return res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
  const element = db.seats.filter((element) => element.id == req.params.id);
  const index = db.seats.indexOf(element);
  db.seats.splice(index, 1);

  return res.json({ message: 'OK' });
});

module.exports = router;
