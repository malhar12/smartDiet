'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dbString = require('./../schema/db.connectionString');
const dbModels = require('./../schema/object.schema');

const multer = require('multer');
const path = require('path');

// Setup Storage Engine
const storage = multer.diskStorage({
  destination: './src/assets/images',
  filename: (request, file, cb)=>{
    cb(null, file.fieldname + '_' + Date.now() + '_' + path.extname(file.originalname));
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

router.post('/upload',(request, response)=>{
  uploader(request, response, (error)=>{
    if (error) {
             return response.end("Something went wrong!");
         }
         return response.end("File uploaded sucessfully!.");
  });
});

module.exports = router;
