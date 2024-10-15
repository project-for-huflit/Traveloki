const { Schema, model, Types } = require('mongoose'); // Erase if already required

const COLLECTION_NAME = 'users'

// Declare the Schema of the Mongo model
const Account = new Schema({
  name:{
      type:String,
      required: [true, 'Vui long nhap ten nguoi dung'],
      trim: true,
      maxLength: 150
  },
  email:{
      type:String,
      required: [true, 'Vui long nhap email'],
      unique: true,
      trim: true
  },
  password:{
      type:String,
      required:true,
  },
  phone:{
    type:String,
  },
  status:{
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
  },
  verify: {
      type: Schema.Types.Boolean,
      default: true
  },
  roles: {
      type: Array,
      default: []
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
});

//Export the model
module.exports = {
  Account: model('user', Account)
}
