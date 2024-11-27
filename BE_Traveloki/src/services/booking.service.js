'use strict';
require('dotenv').config()
const { Pointer } = require('pointer-wallet');

const pointer = new Pointer(process.env.POINTER_SECRET_KEY);

const { ForbidenError } = require('../middlewares/error.response')
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
        providerID: "provider_id", // Tùy chọn thêm id nhà cung cấp
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
  static async CancelPaymentPointerWallet({ orderID }) {
    console.log('orderID::', orderID);
    try {
      console.log('orderID::', orderID);
      const data = await pointer.cancelOrder(orderID);
      console.log(data);
      return data;
    } catch (error) {
      console.error('error the Transaction has expired::', error);
      throw new ForbidenError('The Transaction has expired')
    }
  }

  static async RefundPaymentPointerWallet({ orderID }) {
    console.log('_id::', orderID);
    try {
      console.log('_id::', { orderID });
      const data = await pointer.refundMoney(orderID);
      console.log(data);
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

    console.log('Nhan thong tin payment::', {
      signature,
      amount,
      currency,
      message,
      userID,
      orderID,
      returnUrl
    });
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
