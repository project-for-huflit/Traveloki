// import axios from '../../axios.customize.js';
import axios from "axios";

const paymentSend =async (body)=>{
  return await axios.post('https://presspay-api.azurewebsites.net/api/v1/payment',
    body, {
      headers:{
          Authorization: 'Bearer '+ import.meta.env.VITE_SECRET_API_KEY_POINTER
      }
  })
}
const PaymentGateway =async (token)=>{
  return await axios.get('https://presspay-api.azurewebsites.net/payment-gateway?token='+token)
}
const paymentWithCard = async(body)=>{
  return await axios.post('https://presspay-api.azurewebsites.net/api/v1/payment-with-card',body)
}

export {
  paymentSend,
  PaymentGateway,
  paymentWithCard
 };
