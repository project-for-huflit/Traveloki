const { Schema, model, Types } = require('mongoose'); // Erase if already required
const COLLECTION_NAME = 'detail-partners'

// Declare the Schema of the Mongo model
const partnerDetailSchema = new Schema({
  description: String,
  slug: String,
  image: {
    type: String,
    default: null,
  },
  phone: Number,
  email: {
    type: String,
    trim: true,
    required: true,
    unique: [true, "Email already exists!"],
  },
  partner: {
    type: Schema.Types.ObjectId,
    ref: 'partner', // Ref tới schema partner
    required: true,
  },
}, {
  timestamps: true,
  collection: COLLECTION_NAME
});
//Export the model
module.exports = {
  ChiTietDoiTac: model('detail-partner', partnerDetailSchema)
}
