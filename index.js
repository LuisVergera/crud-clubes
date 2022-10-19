const fs = require('fs');
const express = require('express');
const multer = require('multer');
const exphbs = require('express-handlebars');
const cors = require('cors');
const PUERTO = 8080;
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/uploads/imagenes`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
//app.use(cors());
app.use(express.static(path.join(__dirname, '/uploads/imagenes')));
app.use(express.static(path.join(__dirname, '/src')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.post('/add', upload.single('crest'), (req, res) => {
  const dataClubes = fs.readFileSync('./data/equipos.json', {
    encoding: 'utf-8',
  });
  const club = req.body;
  let clubes = JSON.parse(dataClubes);
  console.log(req.body);

  const nuevoClub = {
    id: Object.keys(clubes).length,
    name: club.name,
    venue: club.venue,
    crestUrl: club.crest,
    colors: club.colors,
    address: club.address,
    phone: club.phone,
    founded: club.founded,
  };

  clubes[nuevoClub.id] = nuevoClub;
  fs.writeFile(
    './data/equipos.bak.json',
    JSON.stringify(clubes, null, 4),
    { encoding: 'utf-8' },
    () => {
      fs.rename('./data/equipos.bak.json', './data/equipos.json', () => {
        res.status(200);
      });
    }
  );
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
    message: 'The club was edited successfully',
    club,
  });
});

app.delete('/delete/:id', (req, res) => {
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
  res.send(nuevoArrayClubes);
});

app.listen(PUERTO);
console.log(`Escuchando en el Puerto: ${PUERTO}`);
