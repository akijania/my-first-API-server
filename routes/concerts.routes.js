const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
  res.send(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
  res.send(db.concerts[Math.floor(Math.random() * db.concerts.length)]);
});

router.route('/concerts/:id').get((req, res) => {
  const element = db.concerts.filter(
    (element) => element.id == req.params.id
  );
  res.send(element);
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;

  const concert = {
    id: uuidv4(),
    performer,
    genre,
    price,
    day,
    image,
  };

  db.concerts.push(concert);

  return res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  const element = db.concerts.filter(
    (element) => element.id == req.params.id
  );
  const index = db.concerts.indexOf(element);
  const concert = {
    id: req.params.id,
    author: req.body.author,
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  };
  db.concerts.splice(index, 1, concert);

  return res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  const element = db.concerts.filter(
    (element) => element.id == req.params.id
  );
  const index = db.concerts.indexOf(element);
  db.concerts.splice(index, 1);

  return res.json({ message: 'OK' });
});

module.exports = router;
