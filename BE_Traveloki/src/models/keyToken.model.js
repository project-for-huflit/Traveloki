const { Schema, model, Types } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';

// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId,ref: 'user' },
    partnerId: { type: Schema.Types.ObjectId, ref: 'partner' },
    adminId: { type: Schema.Types.ObjectId, ref: 'admin' },
    privateKey: { type: String, required: true },
    publicKey: { type: String, required: true },
    refreshTokensUsed: { type: Array, default: [], },
    refreshToken: { type: String, required: true },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
module.exports = model(DOCUMENT_NAME, keyTokenSchema);
// Pre-save hook để đảm bảo mỗi bản ghi chỉ có một trong ba trường userId, partnerId, adminId
// keyTokenSchema.pre('save', function (next) {
//   const token = this;
//   if (token.userId && token.partnerId) {
//     return next(new Error('Cannot have both userId and partnerId in the same record'));
//   }
//   if (token.userId && token.adminId) {
//     return next(new Error('Cannot have both userId and adminId in the same record'));
//   }
//   if (token.partnerId && token.adminId) {
//     return next(new Error('Cannot have both partnerId and adminId in the same record'));
//   }
//   next();
// });


