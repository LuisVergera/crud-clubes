const fs = require('fs');
const express = require('express');
const multer = require('multer');

const upload = multer({ dest: './uploads/imagenes' });
const exphbs = require('express-handlebars');

const PUERTO = 8080;
const app = express();
const hbs = exphbs.create();
const path = require('path');

app.use(express.static(path.join(__dirname, './src')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/uploads`));

app.get('/', (req, res) => {
  const dataClubes = fs.readFileSync('./data/equipos.json');
  const clubes = JSON.parse(dataClubes);
  res.render('body', {
    layout: 'boiler',
    data: {
      clubes,
    },
  });
});

app.get('/club/:id', (req, res) => {
  const dataClubes = fs.readFileSync('./data/equipos.json');
  const clubes = JSON.parse(dataClubes);
  const club = clubes.find((club) => club.id === Number(req.params.id));
  res.render('club', {
    layout: 'boiler',
    data: {
      club,
    },
  });
});

app.get('/add', (req, res) => {
  res.render('add', {
    layout: 'boiler',
  });
});

app.post('/add', upload.single('crest'), (req, res) => {
  const dataClubes = fs.readFileSync('./data/equipos.json');
  const clubes = JSON.parse(dataClubes);
  //const idArray = [];
  //const unusedId = Object.keys(clubes).filter((id))

  const nuevoClub = {
    id: '',
    area: {
      id: '',
      name: req.body.country,
    },
    name: req.body.name,
    crestUrl: req.file,
    address: req.body.address,
    phone: req.body.phone,
    founded: req.body.founded,
    clubColors: req.body.clubColors,
    venue: req.body.venue,
    lastUpdated: new Date().toISOString(),
  };
  clubes.push(nuevoClub);
  fs.writeFileSync('./data/equipos.json', JSON.stringify(clubes));
  res.render('add', {
    layout: 'boiler',
  });
});

app.listen(PUERTO);
console.log(`Escuchando en http://localhost:${PUERTO}`);
