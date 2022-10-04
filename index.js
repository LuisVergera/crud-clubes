const fs = require('fs');
const express = require('express');
const multer = require('multer');
const exphbs = require('express-handlebars');
const cors = require('cors');

const PUERTO = 8080;
const app = express();
const hbs = exphbs.create();
const path = require('path');
app.use(express.static(path.join(__dirname, '/uploads/imagenes')));
app.use(express.static(path.join(__dirname, '/src')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/uploads/imagenes`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  const dataClubes = fs.readFileSync('./data/equipos.json');
  res.setHeader('Content-Type', 'application/json');
  try {
    res.send(dataClubes);
  } catch {
    res.status(404).end(error);
  }
});

app.get('/club/:id', (req, res) => {
  try {
    const dataClubes = fs.readFileSync('./data/equipos.json');
    const clubes = JSON.parse(dataClubes);
    const club = clubes.find((club) => club.id === Number(req.params.id));

    res.send(JSON.stringify(club));
  } catch {
    res.status(404).end('Equipo no encontrado');
  }
});

app.get('/add', (req, res) => {
  res.render('add', {
    layout: 'boiler',
  });
});

app.post('/add', upload.single('crest'), (req, res) => {
  try {
    const dataClubes = fs.readFileSync('./data/equipos.json');
    const clubes = JSON.parse(dataClubes);
    const nuevoClub = {
      id: parseInt(req.body.id),
      area: {
        id: '',
        name: req.body.country,
      },
      name: req.body.name,
      crestUrl: req.file.filename,
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
  } catch {
    res.status(404).end(error);
  }
});

app.get('/edit/:id', (req, res) => {
  const dataClubes = fs.readFileSync('./data/equipos.json');
  const clubes = JSON.parse(dataClubes);
  const club = clubes.find((club) => club.id === Number(req.params.id));

  res.render('edit', {
    layout: 'boiler',
    club,
  });
});

app.post('/edit/:id', upload.single('crest'), (req, res) => {
  const dataClubes = fs.readFileSync('./data/equipos.json');
  const clubes = JSON.parse(dataClubes);
  const club = clubes.find((club) => club.id === Number(req.params.id));
  const indexClub = clubes.findIndex(
    (club) => club.id === Number(req.params.id)
  );

  const clubActualizado = {
    id: parseInt(req.body.id),
    area: {
      id: '',
      name: req.body.country,
    },
    name: req.body.name,
    crestUrl: req.file.filename,
    address: req.body.address,
    phone: req.body.phone,
    founded: req.body.founded,
    clubColors: req.body.clubColors,
    venue: req.body.venue,
    lastUpdated: new Date().toISOString(),
  };

  clubes.splice(indexClub, 1, clubActualizado);

  fs.writeFileSync(`./data/equipos.json`, JSON.stringify(clubes));
  console.log('The file was edited successfully!');
  res.render('edit', {
    layout: 'boiler',
    message: 'The team was edited successfully',
    club,
  });
});

app.get('/delete/:id', (req, res) => {
  const dataClubes = fs.readFileSync('./data/equipos.json');
  const clubes = JSON.parse(dataClubes);
  const club = clubes.find((club) => club.id === Number(req.params.id));

  const indexClubABorrar = clubes.findIndex(
    (club) => club.id === Number(req.params.id)
  );

  const borrarClub = (clubes, indexClubABorrar) => {
    clubes.splice(indexClubABorrar, 1);
    return clubes;
  };
  const nuevoArrayClubes = borrarClub(clubes, indexClubABorrar);

  fs.writeFileSync(`./data/equipos.json`, JSON.stringify(nuevoArrayClubes));
  console.log('Club deleted successfully!');
  res.redirect('/');
});

app.listen(PUERTO);
console.log(`Escuchando en http://localhost:${PUERTO}`);
