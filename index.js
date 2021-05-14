'use strict'

const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const express = require('express');
const cors = require('cors');
const {Pool} = require('pg');

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const app = express();
const PORT = process.env.PORT || 3003;
const server = http.createServer(app);


app.use(cors());

app.get('/', (req, res) =>{
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>Hello world</h1>');
});

app.get('/api/sesions', async (req, res) =>{

    const {rows} = await db.query(`SELECT json_build_object(
        'Id', t.Id,
        'Name', t.Name,
        'Description', t.Description,
        'Room', t.Room,
        'DateTime', t.DateTime,
        'speakers', json_agg(json_build_object(
            'Id', s.Id,
            'Name', s.Name,
            'Bio', s.Bio,
            'Email', s.Email,
            'PictureURL', s.PictureURL
        ))
    )   AS session
    FROM sessions t 
    INNER JOIN sesions_speaker ts ON ts.Session_Id = t.Id
    INNER JOIN speakers s ON ts.Speaker_Id = s.Id
    GROUP BY t.Id`);

    res.json(rows);
});

app.get('*', (req, res) =>{
    res.send('Page not found 404');

});

server.listen(PORT,() => {
    console.log('El servidor esta escuchando ahorita mismo en este puerto' + process.env.PORT);
});
