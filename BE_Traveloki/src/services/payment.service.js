'use strict';
require('dotenv').config()
const { Pointer } = require('pointer-wallet');
const PayOS = require('@payos/node');
// const { CheckoutRequestType, WebhookType } = require('@payos/node/lib/type');
// const { getInfoData } = require('../utils');

const pointer = new Pointer(process.env.POINTER_SECRET_KEY);
const payos = new PayOS(
  String(process.env.PAYOS_CLIENT_ID),
  String(process.env.PAYOS_API_KEY),
  String(process.env.PAYOS_CHECKSUM_KEY)
);

class PaymentProcess {
  constructor(amount) {}
}

class PressPayService extends PaymentProcess {
  constructor(
    currency, message,
    userID, orderID, returnUrl, name,
    image, description, quantity, price,
  ) {
    super();
    this.currency = currency;
    this.message = message;
    this.userID = userID;
    this.orderID = orderID;
    this.returnUrl = returnUrl;
    this.name = name;
    this.image = image;
    this.description = description;
    this.quantity = quantity;
    this.price = price;
  }

  async payment(amount) {
    // get bookingId
    const pushOrderItems = [
      {
        name: this.name,
        image: this.image,
        description: this.description,
        quantity: this.quantity,
        price: this.price,
      },
    ];
    /// ===================================================
    try {
      const { url } = await pointer.createPayment({
        amount: amount,
        currency: this.currency,
        message:  this.message,
        userID:  this.userID,
        orderID:  this.orderID,
        returnUrl:  this.returnUrl,
        providerID: "",
        orders: pushOrderItems,
      });
      // console.log(url);
      return url;
    } catch (error) {
      console.error('error return url::', error);
    }
  }

  async cancelPaymentLink() {
    // console.log('orderID::', orderID);
    try {
      // console.log('orderID::', orderID);
      const data = await pointer.cancelOrder(this.orderID);
      // console.log(data);
      return data;
    } catch (error) {
      console.error('error the Transaction has expired::', error);
      throw new ForbidenError('The Transaction has expired')
    }
  }
}

class PayOSService extends PaymentProcess {
  constructor(
    orderCode, description,
    items = [], cancelUrl, returnUrl,
    cancellationReason
  ) {
    super();
    this.orderCode = orderCode;
    this.description = description;
    this.items = items;
    this.cancelUrl = cancelUrl;
    this.returnUrl = returnUrl;
    this.cancellationReason = cancellationReason;
  }

  async payment(amount) {
    // push item to items
    const pushItem = this.items;
      // ==================
    const requestData = {
      // orderCode: Number(String(Date.now()).slice(-6)),
      orderCode: this.orderCode,
      amount: amount,
      description: this.description,
      items: pushItem,
      cancelUrl: this.cancelUrl,
      returnUrl: this.returnUrl,
    };

    try {
      const paymentLinkData = await payos.createPaymentLink(requestData);
      console.log('paymentLinkData::', paymentLinkData);
      return paymentLinkData;
    } catch (error) {
      console.error('createPaymentLinkPayOS::', error);
    }
  }

  async cancelPaymentLink() {
    if (!this.orderCode) throw new NotFoundError(`NOT FOUND orderCode!`);

    try {
      if (this.cancellationReason !== '') {
        const cancelledPaymentLinkInfo = await payos.cancelPaymentLink(
          this.orderCode,
          this.cancellationReason
        );
        return cancelledPaymentLinkInfo;
      }

      const cancelledPaymentLinkInfoWithoutReason =
        await payos.cancelPaymentLink(this.orderCode);
      return cancelledPaymentLinkInfoWithoutReason;
    } catch (error) {
      console.error('cancelPaymentLinkPayOS::', error);
    }
  }
}

class PaymentService {
  constructor(paymentProcessor) {
    this.paymentProcessor = paymentProcessor;
  }

  chooseTypeofPayment() {
    this.paymentProcessor.payment();
  }

  chooseTypeofCancelPayment() {
    this.paymentProcessor.cancelPaymentLink();
  }
}

// class PressPayService {
//   static async paymentCar() {

//     // Find OrderID
//     // const foundOrderCar = await

//     const pointer = new Pointer(process.env.POINTER_SECRET_KEY);
//     const myDomain = ``
//     const response = await pointer.createPayment({
//       orderId,
//       amount,
//       privateKey,
//       return_url: `${myDomain}/order?id={}`
//     });
//     console.log(response);

//     return {
//       code: 200,
//       metadata: {
//         bill: getInfoData({ fields: ['_id', '....', '.....'], object: foundOrderCar }),
//         response
//       },
//       response
//     }
//   }
// }

module.exports = {
  PaymentService,
  PressPayService,
  PayOSService
};
