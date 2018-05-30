'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SelectionSchema = new Schema({
  date: Date,
  dishId1: {type: mongoose.Schema.Types.ObjectId, ref: 'Dish'},
  dishId2: {type: mongoose.Schema.Types.ObjectId, ref: 'Dish'}
});

// Schema Object
var schemaObj = {
  DishSchema: new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: String,
    dishId: String,
    name: {type: String, required: false},
    price: Number,
    description: String,
    imgLocation: String,
    type: String,
    created_at: Date,
    updated_at: Date
  }),
  UserSchema: new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: Boolean
  }),
  ScheduleSchema: new Schema({
    scheduleId:String,
    month: Number,
    userId: String,
    selection: [{
      date: Date,
      dishId1: {type: mongoose.Schema.Types.ObjectId, ref: 'Dish'},
      dishId2: {type: mongoose.Schema.Types.ObjectId, ref: 'Dish'}
    }]
  }),
  EventsSchema: new Schema({
    userId: String,
    allDay: Boolean,
    start: Date,
    end: Date,
    editable: Boolean,
    title: String,
    textColor: String
  })
};

schemaObj.DishSchema.methods.createdAt = () => {
  this.created_at = new Date();
  return this.created_at;
};

schemaObj.DishSchema.methods.updatedAt = () => {
  this.updated_at = new Date();
  return this.updated_at;
};

schemaObj.UserSchema.methods.createdAt = () => {
  this.created_at = new Date();
  return this.created_at;
};

module.exports = {
  DishModel: mongoose.model('Dish', schemaObj.DishSchema),
  UserModel: mongoose.model('User', schemaObj.UserSchema),
  ScheduleModel: mongoose.model('Schedule', schemaObj.ScheduleSchema),
  EventsModel: mongoose.model('Event', schemaObj.EventsSchema)
};
