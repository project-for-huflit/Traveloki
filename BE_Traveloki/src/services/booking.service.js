'use strict';
require('dotenv').config()
const { Pointer } = require('pointer-wallet');

const pointer = new Pointer(process.env.POINTER_SECRET_KEY);

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
      console.error('error return url::', error);
    }
  }

  /**
   * @param transactionID: _id
   * @returns { "url":"https://pointer.io.vn/payment-gateway?token={token}", "status":200 }
   */
  static async CancelPaymentPointerWallet({ _id }) {
    console.log('_id::', _id);
    try {
      console.log('_id::', { _id });
      const data = await pointer.cancelOrder(_id);
      console.log(data);
      return data;
    } catch (error) {
      console.error('error::', error);
    }
  }
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
