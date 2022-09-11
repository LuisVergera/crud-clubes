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
  const equipos = fs.readFileSync('./data/equipos.json');
  const clubes = JSON.parse(equipos);
  res.render('body', {
    layout: 'inicio',
    data: {
      clubes,
    },
  });
});

app.listen(PUERTO);
console.log(`Escuchando en http://localhost:${PUERTO}`);
