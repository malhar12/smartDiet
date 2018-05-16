'use strict';

const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'dist/smartDiet')));

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'dist/smartDiet/index.html'));
});

const port = process.env.PORT || '8150';

app.set('port', port);

const httpServer = http.createServer(app);

httpServer.listen(port, ()=>{
  console.log('server running on port*****', port);
});
