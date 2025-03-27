'use strict';
require('dotenv').config()
const { Pointer } = require('pointer-wallet');

const pointer = new Pointer(process.env.POINTER_SECRET_KEY);

const { ForbidenError } = require('../middlewares/error.response')

const { PaymentService, PayOSService, PressPayService } = require('../services/payment.service')

class BookingCarService {
  static async PaymentPointerWallet({
    amount,
    currency,
    message,
    userID,
    orderID,
    returnUrl,
    name,
    image,
    description,
    quantity,
    price,
  }) {
    // get userId
    // get bookingId

    /// ===================================================
    // console.log('Nhan thong tin payment::', {
    //   amount,
    //   currency,
    //   message,
    //   userID,
    //   orderID,
    //   returnUrl,
    //   name,
    //   image,
    //   description,
    //   quantity,
    //   price,
    // });
    try {
      const { url } = await pointer.createPayment({
        amount: amount,
        currency: currency,
        message: message,
        userID: userID,
        orderID: orderID,
        returnUrl: returnUrl,
        providerID: "",
        orders: [
          {
            name: name,
            image: image,
            description: description,
            quantity: quantity,
            price: price,
          },
        ],
      });
      // console.log(url);
      return url;
    } catch (error) {
      console.error('error return url::', error);
    }
  }

  /**
   * @param transactionID: _id
   * @returns { "url":"https://pointer.io.vn/payment-gateway?token={token}", "status":200 }
   */
  static async CancelPaymentPointerWallet({ orderID }) {
    // console.log('orderID::', orderID);
    try {
      // console.log('orderID::', orderID);
      const data = await pointer.cancelOrder(orderID);
      // console.log(data);
      return data;
    } catch (error) {
      console.error('error the Transaction has expired::', error);
      throw new ForbidenError('The Transaction has expired')
    }
  }

  static async RefundPaymentPointerWallet({ orderID }) {
    // console.log('_id::', orderID);
    try {
      // console.log('_id::', { orderID });
      const data = await pointer.refundMoney(orderID);
      // console.log(data);
      return data;
    } catch (error) {
      console.error('error:: RefundPaymentPointerWallet', error);
      throw new ForbidenError('The Transaction has expired')
    }
  }

  static async OneClickPaymentPointerWallet({
    signature,
    amount,
    currency,
    message,
    userID,
    orderID,
    returnUrl
  }) {
    // console.log('Nhan thong tin payment::', {
    //   signature,
    //   amount,
    //   currency,
    //   message,
    //   userID,
    //   orderID,
    //   returnUrl
    // });
    try {
      const response = await pointer.connectedPayment({
        signature: signature,
        amount: amount,
        currency: currency,
        message: message,
        userID: userID,
        orderID: orderID,
        providerID: "provider_id",
        returnUrl: returnUrl
      });
      console.log("response::", response);
      return response;
    } catch (error) {
      console.error('error return url::', error);
    }
  }

  // #region Bridge Pattern - Quan
  static async PaymentPointerWalletBridge({
    amount,
    currency,
    message,
    userID,
    orderID,
    returnUrl,
    name,
    image,
    description,
    quantity,
    price,
  }) {
    const paymentProcessor = new PressPayService(
      amount,
      currency,
      message,
      userID,
      orderID,
      returnUrl,
      name,
      image,
      description,
      quantity,
      price
    );
    const userChoice = new PaymentService(paymentProcessor);
    const result =  userChoice.chooseTypeofPayment();
    return result;
  }

  static async CancelPaymentPointerWalletBridge({ orderID }) {
    const cancelPaymentProcessor = new PressPayService(orderID);
    const userChoice = new PaymentService(cancelPaymentProcessor);
    const result =  userChoice.chooseTypeofCancelPayment();
    return result;
  }
  // #endregion Bridge Pattern
}

class BookingBusService {
  static async PaymentPointerWallet({
    amount,
    currency,
    message,
    userID,
    orderID,
    returnUrl,
    name,
    image,
    description,
    quantity,
    price,
  }) {
    // get userId
    // get bookingId
    /// ===================================================
    // console.log('Nhan thong tin payment::', {
    //   amount,
    //   currency,
    //   message,
    //   userID,
    //   orderID,
    //   returnUrl,
    //   name,
    //   image,
    //   description,
    //   quantity,
    //   price,
    // });
    try {
      const { url } = await pointer.createPayment({
        amount: amount,
        currency: currency,
        message: message,
        userID: userID,
        orderID: orderID,
        returnUrl: returnUrl,
        orders: [
          {
            name: name,
            image: image,
            description: description,
            quantity: quantity,
            price: price,
          },
        ],
      });
      console.log(url);
      return url;
    } catch (error) {
      console.error("error return url::", error)
    }
  }

  /**
    * @param transactionID: _id
    * @returns { "url":"https://pointer.io.vn/payment-gateway?token={token}", "status":200 }
    */
  static async CancelPaymentPointerWallet({ _id }) {
    const data = await pointer.cancelOrder(_id);
    console.log(data);
    return data
  }
}

class BookingTrainService {
  static async PaymentPointerWallet({
    amount,
    currency,
    message,
    userID,
    orderID,
    returnUrl,
    name,
    image,
    description,
    quantity,
    price,
  }) {
    // get userId
    // get bookingId
    /// ===================================================
    console.log('Nhan thong tin payment::', {
      amount,
      currency,
      message,
      userID,
      orderID,
      returnUrl,
      name,
      image,
      description,
      quantity,
      price,
    });
    try {
      const { url } = await pointer.createPayment({
        amount: amount,
        currency: currency,
        message: message,
        userID: userID,
        orderID: orderID,
        returnUrl: returnUrl,
        orders: [
          {
            name: name,
            image: image,
            description: description,
            quantity: quantity,
            price: price,
          },
        ],
      });
      console.log(url);
      return url;
    } catch (error) {
      console.error("error return url::", error)
    }
  }

  /**
    * @param transactionID: _id
    * @returns { "url":"https://pointer.io.vn/payment-gateway?token={token}", "status":200 }
    */
  static async CancelPaymentPointerWallet({ _id }) {
    const data = await pointer.cancelOrder(_id);
    console.log(data);
    return data
  }
}

module.exports = {
  BookingCarService,
  BookingBusService,
  BookingTrainService,
};
