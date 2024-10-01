'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const { countConnect } = require('../helpers/check.connect');
const connectString = process.env.MONGODB_URI;

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log("Connected to MongoDB!");
//   })
//   .catch((e) => {
//     console.error("Did not connect to MongoDB", e);
//   });

// module.exports = mongoose;

class Database {
  constructor() {
    this.connect();
  }

  // connect
  connect(type = 'mongodb') {
    if (1 === 0) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose
      .connect(connectString, { maxPoolSize: 50 })
      .then(() => {
        console.log('Connected to MongoDB!', countConnect());
      })
      .catch((e) => {
        console.error('Did not connect to MongoDB', e);
      });
  }

  // singleton pattern
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  static getConnect() {
    return this.getInstance();
  }
}

const instanceMongoDB = Database.getInstance();
const cloudMongoDB = Database.getConnect()
module.exports = instanceMongoDB;
