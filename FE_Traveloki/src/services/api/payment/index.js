// import axios from '../../axios.customize.js';
import axios from "axios";

const paymentSend =async (body)=>{
  return await axios.post(import.meta.env.VITE_API_PRESSPAY_BASE_URL+'/api/v1/payment',
    body, {
      headers:{
          Authorization: 'Bearer '+ import.meta.env.VITE_SECRET_API_KEY_POINTER
      }
  })
}
const PaymentGateway =async (token)=>{
  return await axios.get(import.meta.env.VITE_API_PRESSPAY_BASE_URL+'/payment-gateway?token='+token)
}
const paymentWithCard = async(body)=>{
  return await axios.post(import.meta.env.VITE_API_PRESSPAY_BASE_URL+'/api/v1/payment-with-card',body)
}

export {
  paymentSend,
  PaymentGateway,
  paymentWithCard
 };
