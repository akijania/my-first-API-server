const Seat = require('../models/seat.model');
const sanitize = require('mongo-sanitize');
const Joi = require('joi');

exports.getAll = async (req, res) => {
  try {
    res.send(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const seat = await Seat.findOne().skip(rand);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.send(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.send(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  const schema = Joi.object({
    day: Joi.number().integer().min(1).max(3),
    seat: Joi.number().integer().min(1).max(50),
    client: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'pl'] },
    }),
  });
  try {
    const { day, seat, client, email } = req.body;
    if (!day || !seat || !client || !email) throw new Error('Invalid data');
    else {
      const value = await schema.validateAsync({ day: day, seat: seat, client: client, email: email });
      const clientClean = sanitize(client);
      const emailClean = sanitize(email);
      const newSeat = new Seat({
        day: day,
        seat: seat,
        client: clientClean,
        email: emailClean,
      });
      await newSeat.save();
      res.json({ message: 'OK' });
    }
  } catch (err) {
    res.status(500).json({ message: "Couldn't connect to DB... Try again" });
  }
};

exports.put = async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const se = await Seat.findById(req.params.id);
    if (se) {
      se.day = day;
      (se.seat = seat), (se.client = client);
      (se.email = email), await se.save();
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (seat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
