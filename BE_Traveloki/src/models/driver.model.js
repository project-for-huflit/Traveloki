const { Schema, model, default: mongoose } = require('mongoose');

const DriverSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 100 },
    phone: {
      type: String,
      required: true,
      maxlength: 11,
      match: /^[0-9]{10,11}$/,
      unique: true,
    },
    address: { type: String, required: true, maxlength: 100 },
    sharedData: {
      carType: { type: String, required: true },
      status: {
        type: String,
        required: true,
        enum: ['available', 'busy', 'offline', 'waiting'],
        default: 'available',
      },
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model('Driver', DriverSchema);