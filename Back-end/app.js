// importar los módulo express y mongoose
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
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
app.use(cors());
// Analiza las solicitudes que contienen archivos json
app.use(express.json());

const members = require('./Controller/memberController');
const login = require('./Controller/loginController');
const ad = require('./Controller/adController');
app.use('/members', members)
app.use('/login', login)
app.use('/ad', ad)

// Verificar que el servidor está escuchando
app.listen(PORT, () => {
  // función callback que se ejecutará cuando el servidor esté listo
  console.log(`Server running at http://localhost:${PORT}`);
});
app.post('/upload', (req, res) => {
  if (req.files === null) {
  return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});
