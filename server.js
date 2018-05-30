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
  // console.log(req.url, 'URL Requested');
  let url = req.url;
  if(req.url.includes('?')){
    let tempStr = req.url.split('?');
    url = tempStr[0];
  }
  // console.log(path.join(__dirname, `./prod/dist/smartDiet/${url}`), 'Path1');
  // console.log(path.resolve(`./prod/dist/smartDiet/${url}`), 'Path2');
  if(allowedExt.filter(ext=> url.indexOf(ext) > 0).length > 0){
    res.sendFile(path.join(__dirname, `./prod/dist/smartDiet/${url}`))
  } else if(allowedExtUpload.filter(ext=> url.indexOf(ext) > 0).length > 0){
    res.sendFile(path.join(__dirname, `./prod/images/${url}`))
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
