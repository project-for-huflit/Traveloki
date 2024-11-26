const { Schema, model, Types } = require('mongoose'); // Erase if already required

const COLLECTION_NAME = 'ConnectedWallets'

// Declare the Schema of the Mongo model
const ConnectedWallet = new Schema({
  userId:{
      type: Types.ObjectId,
  },
  signature: {
      type: String,
      default: ""
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
});

//Export the model
module.exports = {
  ConnectedWalletUser: model('ConnectedWallet', ConnectedWallet)
}
