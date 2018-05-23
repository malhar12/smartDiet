'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema Object
var schemaObj = {
  DishSchema: new Schema({
    usserID: String,
    name: {type: String, required: false},
    price: Number,
    imgLocation: String,
    type: String,
    created_at: Date,
    updated_at: Date
  }),
  UserSchema: new Schema({
    name: String,
    userId: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: Boolean,
    created_at: Date
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
  UserModel: mongoose.model('User', schemaObj.UserSchema)
};
