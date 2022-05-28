const express = require('express');
const PORT = 3000;
const app = express();

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(
    '/Users/eneskoc/Desktop/school/Ironhack/github/module-2/week1/day3/views/home.html'
  );
});

app.get('/Hello', (req, res) => {
  res.send('This is the route /Hello');
});

app.get('/cat', (req, res) => {
  res.sendFile(__dirname + '/views/cat.html');
});

app.listen(PORT, () => {
  console.log('server running on port 3000');
});
