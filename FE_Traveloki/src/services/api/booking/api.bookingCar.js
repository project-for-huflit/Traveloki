import axios from "axios";

const createBookingCar = async (body) => {
  return await axios.post(import.meta.env.VITE_BACKEND_URL+'/BookingCar', body)
}
const GetBookingCarId =async (id)=>{
  return await axios.get(import.meta.env.VITE_BACKEND_URL+'/FindBookingCarID?id='+id)
}

export {
  createBookingCar,
  GetBookingCarId,
 };
