'use strict'

const { Schema, model } = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const apiKeySchema = new Schema({

});

//Export the model
module.exports = model('apikey', apiKeySchema);
