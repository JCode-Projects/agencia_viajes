import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });

// Init App
const app = express();

// Connect in database
db.authenticate()
    .then(() => console.log('DataBase Conected'))
    .catch(error => console.log(error))

// Activate Template Engine PUG
app.set('view engine', 'pug');

// Get actual year
app.use((req, res, next) => {
    res.locals.actualYear = new Date().getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    next();
});

// Add Body Parser
app.use(express.urlencoded({ extended: true }));

// Define the public folder
app.use(express.static('public'));

// Add Router in App
app.use('/', router);

// Define the port
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`); 
});