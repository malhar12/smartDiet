'use strict';

const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

const api = require('./server/routes/api');

const app = express();

const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.woff',
  '.woff2',
  '.ttf'
];

const allowedExtUpload = [
  '.png',
  '.jpg',
  '.svg'
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', api);

app.use(express.static(path.join(__dirname, './prod')));

app.get('*', (req, res)=>{
  if(allowedExt.filter(ext=> req.url.indexOf(ext) > 0).length > 0){
    res.sendFile(path.join(__dirname, `./prod/dist/smartDiet/${req.url}`))
  } else if(allowedExtUpload.filter(ext=> req.url.indexOf(ext) > 0).length > 0){
    res.sendFile(path.join(__dirname, `./prod/images/${req.url}`))
  } else {
    res.sendFile(path.join(__dirname, './prod/dist/smartDiet/index.html'));
  }
});

const port = process.env.PORT || '8150';

app.set('port', port);

const httpServer = http.createServer(app);

httpServer.listen(port, ()=>{
  console.log('server running on port*****', port);
});
