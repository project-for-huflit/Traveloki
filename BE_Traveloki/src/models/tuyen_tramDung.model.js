const {Schema, model } = require('mongoose');
const COLLECTION_NAME = 'Tuyen_TramDungs'

const Tuyen_TramDungSchema = new Schema({
    MaTuyen_TramDung: {
      type: String,
      required: true,
      maxlength: 5
    },
    MaTuyen:{
      type: String,
      required: true,
      maxlength: 5,
      ref: 'Tuyen'
    },
    SoKM:{
      type: Number,
      required: true
    },
    GiaVe:{
      type: Number,
      required: true
    },
  },{
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

const Tuyen_TramDung = model("Tuyen_TramDung", Tuyen_TramDungSchema);

module.exports = Tuyen_TramDung;
