const express = require('express');
const db = require('./db');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', testimonialsRoutes);
app.use('/', concertsRoutes);
app.use('/', seatsRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

app.listen(7000, () => {
  console.log('Server is running on port: 7000');
});
