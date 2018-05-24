'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dbString = require('./../schema/db.connectionString');
const dbModels = require('./../schema/object.schema');

const multer = require('multer');
const path = require('path');

var timeStamp = null;

function updateTimeStamp(){
  if(!timeStamp){
    timeStamp = Date.now();
  }

  return timeStamp;
}

// Setup Storage Engine
const storage = multer.diskStorage({
  destination: './prod/images/',
  filename: (request, file, cb)=>{
    cb(null, file.fieldname + '_' + updateTimeStamp() + path.extname(file.originalname));
  }
});

// Initialize Upload Variable
const uploader = multer({
  storage: storage
}).single('file');

const Dish = dbModels.DishModel;
const User = dbModels.UserModel;

mongoose.connect(dbString, (error)=>{
  if(error){
    console.log('Cannot connect to server', error);
  }
});

router.get('/', (request, response)=>{
  response.send('api works');
});

router.post('/upload', uploader, (request, response)=>{
  let payload = JSON.parse(request.body.data);
  let tempSplit = payload.imgLocation.split('_');
  let dish = new Dish({
    userId: payload.userId,
    name: payload.name,
    price: payload.price,
    description: payload.description,
    imgLocation: tempSplit[0] + '_' + updateTimeStamp() + tempSplit[1],
    type: payload.type,
    created_at: payload.created_at,
    updated_at: payload.updated_at
  });
  timeStamp = null;
  let res;
  dish.save((error, data) => {
    if(error){
      console.log(error, 'ERROR');
      // res = {"error": true, "message": "data couldnot be instered", "data": err};
    } else {
      console.log(data, 'ERROR');
      // res = {"error": false, "message": "data inserted", "data": data};
    }
    // response.json(res);
  });
  uploader(request, response, (error)=>{
    if (error) {
             return response.end("Something went wrong!");
         }
         return response.end("File uploaded sucessfully!.");
  });
});

module.exports = router;
