'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dbString = require('./../schema/db.connectionString');
const dbModels = require('./../schema/object.schema');

const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');

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

const formSubmit = multer().single();

const Dish = dbModels.DishModel;
const User = dbModels.UserModel;
const Schedule = dbModels.ScheduleModel;
const Events = dbModels.EventsModel;

mongoose.connect(dbString, (error)=>{
  if(error){
    console.log('Cannot connect to server', error);
  }
});

router.get('/', (request, response)=>{
  response.send('api works');
});

// User Signup
router.post('/signup', formSubmit, (request, response)=>{
  let payload = request.body;
  // console.log(payload, '<-User Singup details');
  bcrypt.hash(payload.password, 10, (error, hash)=>{
    if(error){
      // console.log(error);
      response.status(500).json({
        message: error
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        userId: payload.userId,
        password: hash,
        isAdmin: JSON.parse(payload.isAdmin)
      });
      user.save((error, data)=>{
        if(error){
          response.status(500).type('application/json').json({'payload': error});
        } else {
          response.status(200).type('application/json').json({'payload': data});
        }
      });
    }
  });
});

// User SignIn
router.post('/signin', formSubmit, (request, response)=>{
  let payload = request.body;
  User.findOne({userId: payload.userId})
      .exec()
      .then((user)=>{
        if(!user){
          return response.status(404).json({'payload': 'Auth Failed'});
        }

        bcrypt.compare(payload.password, user.password, (error, result)=>{
          if(error){
            return response.status(500).json({'payload': 'Auth Failed'});
          }

          if(result){
            return response.status(200).json({
              'payload': {
                userId: user.userId,
                isAdmin: user.isAdmin
              }
            });
          } else {
            return response.status(404).json({'payload': 'Auth Failed'});
          }
        });
      });
});

// Save Image to DataBase
router.post('/upload', uploader, (request, response)=>{
  let payload = JSON.parse(request.body.data);
  let tempSplit = payload.imgLocation.split('_');
  let dish = new Dish({
    _id: new mongoose.Types.ObjectId(),
    userId: payload.userId,
    dishId: 'Dish_' + Date.now(),
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
      console.log(data, 'DATA');
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

// Get All StarterDishes
router.get('/getAllStarterDishes', (request, response)=>{
  let res = {};
  Dish.find({'type': 'starterDish'}, (error, data)=>{
    if(error){
      response.status(500).type('application/json').json({'payload': error});
    } else {
      response.status(200).type('application/json').json({'payload': data});
    }
  });
});

// get Filtered Starter Dishes
router.get('/getStarterDishes', (request, response)=>{
  let payload = request.query.scheduleId;
  let dishSelections = [];

  Schedule.findOne({'scheduleId': payload}, (error, schedule)=>{
    if(error){
      response.status(500).type('application/json').json({'payload': error});
    } else if(schedule) {
      schedule.selection.forEach((record)=>{
        dishSelections.push(record.dishId1);
      });
      Dish.find({_id: {$nin: dishSelections}, type: 'starterDish'}, (error, data)=>{
        if(error){
          response.status(500).type('application/json').json({'payload': error});
        } else {
          response.status(200).type('application/json').json({'payload': data});
        }
      });
    } else if(!schedule) {
      Dish.find({type: 'starterDish'}, (error, data)=>{
        if(error){
          response.status(500).type('application/json').json({'payload': error});
        } else {
          response.status(200).type('application/json').json({'payload': data});
        }
      });
    }
  });
});

// Get All MainCourseDishes
router.get('/getAllMainCourseDishes', (request, response)=>{
  let res = {};
  Dish.find({'type': 'mainCourse'}, (error, data)=>{
    if(error){
      response.status(500).type('application/json').json({'payload': error});
    } else {
      response.status(200).type('application/json').json({'payload': data});
    }
  });
});

// get Filtered MainCourse Dishes
router.get('/getMainCourseDishes', (request, response)=>{
  let payload = request.query.scheduleId;
  let dishSelections = [];
  Schedule.findOne({'scheduleId': payload}, (error, schedule)=>{
    if(error){
      response.status(500).type('application/json').json({'payload': error});
    } else if(schedule) {
      schedule.selection.forEach((record)=>{
        dishSelections.push(record.dishId2);
      });
      Dish.find({_id: {$nin: dishSelections}, type: 'mainCourse'}, (error, data)=>{
        if(error){
          response.status(500).type('application/json').json({'payload': error});
        } else {
          response.status(200).type('application/json').json({'payload': data});
        }
      });
    } else if(!schedule) {
      Dish.find({type: 'mainCourse'}, (error, data)=>{
        if(error){
          response.status(500).type('application/json').json({'payload': error});
        } else {
          response.status(200).type('application/json').json({'payload': data});
        }
      });
    }
  });
});

// Update a schedule
router.post('/updateSchedule', formSubmit, (request, response)=>{
  // console.log(request);
  let payload = request.body;
  console.log(payload, '<-Submitted Schedule');
  let _schedule = new Schedule({
    scheduleId: payload.scheduleId,
    month: payload.month,
    userId: payload.userId,
    selection: [{
      date: payload.date,
      dishId1: payload.dishId1,
      dishId2: payload.dishId2
    }]
  });

  Schedule.findOne({userId: payload.userId, scheduleId: payload.scheduleId})
          .exec()
          .then((record)=>{
            console.log(record, '<-Extracted Schedule')
            if(!record){
              _schedule.save((error, data)=>{
                if(error){
                  response.status(500).type('application/json').json({'payload': error});
                } else {
                  response.status(200).type('application/json').json({'payload': data});
                }
              });
            } else {
              record.selection.push({
                date: payload.date,
                dishId1: payload.dishId1,
                dishId2: payload.dishId2
              });
              record.save((error, data)=>{
                if(error){
                  response.status(500).type('application/json').json({'payload': error});
                } else {
                  response.status(200).type('application/json').json({'payload': data});
                }
              });
            }
          });
});

router.get('/getAllSchedules', (request, response)=>{
  let payload = request.query.userId;
  Schedule.find({userId: payload})
          .select('scheduleId month selection')
          .populate('selection.dishId1 selection.dishId2', ['name', 'price'])
          .exec()
          .then((data)=>{
            if(data.length === 0){
              response.status(200).type('application/json').json({'payload': []});
            } else {
              response.status(200).type('application/json').json({'payload': data});
            }
          });
});

// Get All Events
router.get('/getAllEvents', (request, response)=>{
  let payload = request.query.userId;
  Events.find({'userId': payload}, (error, data)=>{
    if(error){
      response.status(500).type('application/json').json({'payload': error});
    } else {
      response.status(200).type('application/json').json({'payload': data});
    }
  });
});

// Update an Event
router.post('/updateEvent', formSubmit, (request, response)=>{
  // console.log(request);
  let payload = request.body;
  let event = new Events({
    userId: payload.userId,
    allDay: JSON.parse(payload.allDay),
    start: payload.start,
    end: payload.end,
    editable: JSON.parse(payload.editable),
    title: payload.title,
    textColor: payload.textColor
  });

  event.save((error, data) => {
    if(error){
      console.log(error, 'ERROR');
      response.status(500).send({
        message: 'Event could not be insterted',
        body: error
      });
    } else {
      console.log(data, 'DATA');
      response.status(200).send({
        message: 'Event was insterted',
        body: data
      });
    }
  });
});

module.exports = router;
