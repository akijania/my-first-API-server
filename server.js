const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  {
    id: 2,
    author: 'Amanda Doe',
    text: 'They really know how to make you happy.',
  },
];

app.get('/testimonials', (req, res) => {
  res.send(db);
});

app.get('/testimonials/random', (req, res) => {
  res.send(db[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  const element = db.filter(
    (element) => element.id === parseInt(req.params.id)
  );
  res.send(element);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;

  const testimonial = {
    id: uuidv4(),
    author,
    text,
  };

  db.push(testimonial);

  return res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  const element = db.filter(
    (element) => element.id === parseInt(req.params.id)
  );
  const index = db.indexOf(element);
  const testimonial = {
    id: req.params.id,
    author: req.body.author,
    text: req.body.text,
  };
  db.splice(index, 1, testimonial);

  return res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  const element = db.filter(
    (element) => element.id === parseInt(req.params.id)
  );
  const index = db.indexOf(element);
  db.splice(index, 1);

  return res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

app.listen(7000, () => {
  console.log('Server is running on port: 7000');
});
