// importar los módulo express y mongoose
const express = require("express");
const mongoose = require("mongoose");
// seleccionar el puerto 8000, para evitar conflictos con el front (3000)
const PORT = 8000;

// Importar el contenido del archivo .env
require('dotenv').config();
const mongoString = process.env.DATABASE_URL

// conectar a la base de datos
mongoose.connect(mongoString);
const database = mongoose.connection

// verificar que ha conectado correctamente
database.on('error', (error) => {
  console.log(error)
})
database.once('connected', () => {
  console.log('Successfully Connected!');
})

// La función express() exportada por el módulo express crea una aplicación Express.
const app = express();
// Analiza las solicitudes que contienen archivos json
app.use(express.json());

const members = require('./Controller/memberController');
const login = require('./Controller/loginController');
app.use('/members', members)
app.use('/login', login)

// Verificar que el servidor está escuchando
app.listen(PORT, () => {
  // función callback que se ejecutará cuando el servidor esté listo
  console.log(`Server running at http://localhost:${PORT}`);
});

