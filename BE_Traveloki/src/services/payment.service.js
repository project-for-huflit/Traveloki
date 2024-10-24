'use strict';
require('dotenv').config()
const { Pointer } = require('pointer-wallet');
const { getInfoData } = require('../utils');

class PressPayService {
  static async paymentCar() {

    // Find OrderID
    // const foundOrderCar = await

    const pointer = new Pointer(process.env.POINTER_SECRET_KEY);
    const myDomain = ``
    const response = await pointer.createPayment({
      orderId,
      amount,
      privateKey,
      return_url: `${myDomain}/order?id={}`
    });
    console.log(response);

    return {
      code: 200,
      metadata: {
        bill: getInfoData({ fields: ['_id', '....', '.....'], object: foundOrderCar }),
        response
      },
      response
    }
  }
}

module.exports = {
  PressPayService,
};
