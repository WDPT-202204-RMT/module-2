const express = require('express');
const PORT = 3000;
const app = express();
const hbs = require('hbs');

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (request, response) => {
  let data = {
    name: 'Enes',
    age: 24,
    err: 'oopsi',
    address: '',
  };
  response.render('index', data);
});

app.get('/each', (req, res) => {
  let data = {
    name: 'Ironhacker',
    lastName: 'Rocking it!',
    address: 'Your heart',
    cities: [
      'Amsterdam',
      'Barcelona',
      'Berlin',
      'Lisbon',
      'Madrid',
      'Mexico City',
      'Miami',
      'Paris',
      'Sao Paulo',
    ],
    test: {
      key1: 'hello',
      blabla: 'blabla',
    },
    obj1: {
      street: 'Your heart',
      number: 87,
    },
    layout: false,
  };
  res.render('eachPage', data); // This will send data to the VIEW
});

app.get('/Hello', (req, res) => {
  res.send('This is the route /Hello');
});

app.get('/cat', (req, res) => {
  res.sendFile(__dirname + '/views/cat.html');
});

app.get('/players', (req, res) => {
  const players = [
    {
      name: 'Rusell',
      lastName: 'Westbrook',
      team: 'OKC',
      photo:
        'https://thunderousintentions.com/wp-content/uploads/getty-images/2017/12/891998404-oklahoma-city-thunder-v-indiana-pacers.jpg.jpg',
      average: [
        { year: 2013, points: 82 },
        { year: 2014, points: 82 },
        { year: 2015, points: 60 },
        { year: 2016, points: 46 },
        { year: 2017, points: 67 },
        { year: 2018, points: 80 },
      ],
    },
    {
      name: 'Kevin',
      lastName: 'Durant',
      team: 'GSW',
      photo:
        'https://img.bleacherreport.net/img/images/photos/003/670/482/hi-res-3c2473cd8600df96c4b94c93808562c8_crop_north.jpg?h=533&w=800&q=70&crop_x=center&crop_y=top',
      average: [
        { year: 2013, points: 76 },
        { year: 2014, points: 80 },
        { year: 2015, points: 65 },
        { year: 2016, points: 50 },
        { year: 2017, points: 67 },
        { year: 2018, points: 78 },
      ],
    },
    {
      name: 'Lebron',
      lastName: 'James',
      team: 'CLE',
      photo:
        'https://trashtalk.co/wp-content/uploads/2022/03/LeBron-James-Lakers-2-mars-2022.jpg',
      average: [
        { year: 2013, points: 78 },
        { year: 2014, points: 82 },
        { year: 2015, points: 76 },
        { year: 2016, points: 84 },
        { year: 2017, points: 67 },
        { year: 2018, points: 60 },
      ],
    },
    {
      name: 'Emanuel',
      lastName: 'Ginóbilli',
      team: 'SAS',
      photo:
        'https://cdn.vox-cdn.com/thumbor/Z9kR0HDJrzOzxOdwGe7Jwyxxvjk=/0x0:2802x4203/1200x800/filters:focal(1329x1158:1777x1606)/cdn.vox-cdn.com/uploads/chorus_image/image/57733525/usa_today_10429631.0.jpg',
      average: [
        { year: 2013, points: 82 },
        { year: 2014, points: 76 },
        { year: 2015, points: 74 },
        { year: 2016, points: 80 },
        { year: 2017, points: 66 },
        { year: 2018, points: 63 },
      ],
    },
    {
      name: 'Kyrie',
      lastName: 'Irving',
      team: 'BOS',
      photo:
        'https://cdn-s3.si.com/s3fs-public/styles/marquee_large_2x/public/2017/11/11/kyrie-irving-mvp-case.jpg?itok=PWYqUSGf',
      average: [
        { year: 2013, points: 74 },
        { year: 2014, points: 72 },
        { year: 2015, points: 66 },
        { year: 2016, points: 82 },
        { year: 2017, points: 64 },
        { year: 2018, points: 61 },
      ],
    },
  ];
  res.render('players', { players }); //This will send information to a partial
});

app.get('/teams', (req, res) => {
  res.render('teams');
});

app.listen(PORT, () => {
  console.log('server running on port 3000');
});
