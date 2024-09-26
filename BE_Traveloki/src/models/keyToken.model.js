'use strict'

const { Schema, model } = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema({

});

//Export the model
module.exports = model('key', keyTokenSchema);
