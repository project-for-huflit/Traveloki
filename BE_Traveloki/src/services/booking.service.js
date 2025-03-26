'use strict';
require('dotenv').config()
const { Pointer } = require('pointer-wallet');
const paymentObserver = require('./observers/paymentObserver.service');

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

      // Thông báo thanh toán thành công
      paymentObserver.notify({
        type: 'PAYMENT_SUCCESS',
        data: {
          userID,
          orderID,
          amount,
          currency,
          paymentUrl: url,
          timestamp: new Date()
        }
      });

      return url;
    } catch (error) {
      // Thông báo thanh toán thất bại
      paymentObserver.notify({
        type: 'PAYMENT_FAILED',
        data: {
          userID,
          orderID,
          amount,
          currency,
          error: error.message,
          timestamp: new Date()
        }
      });
      throw error;
    }
  }

  /**
   * @param transactionID: _id
   * @returns { "url":"https://pointer.io.vn/payment-gateway?token={token}", "status":200 }
   */
  static async CancelPaymentPointerWallet({
    orderID,
    userID,
    amount,
    currency
  }) {
    console.log('orderID::', orderID);
    try {
      console.log('orderID::', orderID);
      const result = await pointer.cancelPayment(orderID);
      console.log(result);

      // Thông báo hủy thanh toán thành công
      paymentObserver.notify({
        type: 'PAYMENT_CANCELLED',
        data: {
          userID,
          orderID,
          amount,
          currency,
          timestamp: new Date()
        }
      });

      return result;
    } catch (error) {
      // Thông báo hủy thanh toán thất bại
      paymentObserver.notify({
        type: 'PAYMENT_CANCEL_FAILED',
        data: {
          userID,
          orderID,
          amount,
          currency,
          error: error.message,
          timestamp: new Date()
        }
      });
      throw error;
    }
  }

  static async RefundPaymentPointerWallet({
    orderID,
    userID,
    amount,
    currency,
    reason
  }) {
    console.log('_id::', orderID);
    try {
      console.log('_id::', { orderID });
      const result = await pointer.refundPayment(orderID, {
        amount: amount,
        currency: currency,
        reason: reason
      });
      console.log(result);

      // Thông báo hoàn tiền thành công
      paymentObserver.notify({
        type: 'PAYMENT_REFUNDED',
        data: {
          userID,
          orderID,
          amount,
          currency,
          reason,
          timestamp: new Date()
        }
      });

      return result;
    } catch (error) {
      // Thông báo hoàn tiền thất bại
      paymentObserver.notify({
        type: 'PAYMENT_REFUND_FAILED',
        data: {
          userID,
          orderID,
          amount,
          currency,
          reason,
          error: error.message,
          timestamp: new Date()
        }
      });
      throw error;
    }
  }

  static async OneClickPaymentPointerWallet({
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

    console.log('Nhan thong tin payment::', {
      amount,
      currency,
      message,
      userID,
      orderID,
      returnUrl
    });
    try {
      const { url } = await pointer.createPayment({
        amount: amount,
        currency: currency,
        message: message,
        userID: userID,
        orderID: orderID,
        returnUrl: returnUrl,
        providerID: "provider_id",
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
      console.log("response::", url);

      // Thông báo thanh toán nhanh thành công
      paymentObserver.notify({
        type: 'ONE_CLICK_PAYMENT_SUCCESS',
        data: {
          userID,
          orderID,
          amount,
          currency,
          paymentUrl: url,
          timestamp: new Date()
        }
      });

      return url;
    } catch (error) {
      // Thông báo thanh toán nhanh thất bại
      paymentObserver.notify({
        type: 'ONE_CLICK_PAYMENT_FAILED',
        data: {
          userID,
          orderID,
          amount,
          currency,
          error: error.message,
          timestamp: new Date()
        }
      });
      throw error;
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
