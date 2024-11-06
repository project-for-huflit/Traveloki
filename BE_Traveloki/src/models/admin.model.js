const { Schema, model } = require('mongoose')

const adminSchema = new Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:[true,'Email already exists']
    },
    password:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        default:true
    },
    roles: {
      type: Array,
      default: []
  }
},{
    timestamps: true
})

module.exports = {
  Admin: model('admin',adminSchema)
}
