'use strict';

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dataBaseConfig = require('./database/db');

// Conexión a mongoDB utilizando Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
    console.log('Conectado correctamente a la base de datos ')
  },
  error => {
    console.log('No se pudo conectar a la base de datos: ' + error)
  }
)

const contactRoute = require('./routes/contact.route')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
  }); 

// Configuración del directorio estático
app.use(express.static(path.join(__dirname, 'dist/Angular')));


// Raíz de la API RESTful
app.use('/api', contactRoute)

// Puerto del servidor
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Servidor conectado en el puerto ' + port)
})

// Encontrar 404 y entregarlo al gestor de errores
app.use((req, res, next) => {
  next(createError(404));
});

// Ruta índice
app.get('/', (req, res) => {
  res.send('Endpoint inválido');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/Angular/index.html'));
});

// Gestor de errores
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
