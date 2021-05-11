'use strict'

const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');


const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(cors());

app.get('/', (req, res) =>{
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>Hello world</h1>');
});

app.get('/api/sesions', (req, res) =>{
    const sesions = await fs.readFile(path.join(__dirname, 'sessions.json'), 'utf8');
    res.json(JSON.parse(sesions));
});

app.get('*', (req, res) =>{
    res.send('Page not found 404');

});

server.listen(PORT,() => {
    console.log('El servidor esta escuchando ahorita mismo en este puerto 3000');
});
