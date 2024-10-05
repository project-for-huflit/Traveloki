const { Schema, model, Types } = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const Account = new Schema({

});

//Export the model
module.exports = {
  Account: model('User', Account)
}
