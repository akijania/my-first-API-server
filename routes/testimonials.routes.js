const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials').get((req, res) => {
  res.send(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  res.send(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
  const element = db.testimonials.filter(
    (element) => element.id == req.params.id
  );
  res.send(element);
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;

  const testimonial = {
    id: uuidv4(),
    author,
    text,
  };

  db.testimonials.push(testimonial);

  return res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
  const element = db.testimonials.filter(
    (element) => element.id == req.params.id
  );
  const index = db.testimonials.indexOf(element);
  const testimonial = {
    id: req.params.id,
    author: req.body.author,
    text: req.body.text,
  };
  db.testimonials.splice(index, 1, testimonial);

  return res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  const element = db.testimonials.filter(
    (element) => element.id == req.params.id
  );
  const index = db.testimonials.indexOf(element);
  db.testimonials.splice(index, 1);

  return res.json({ message: 'OK' });
});

module.exports = router;
