import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSuitcase } from "@fortawesome/free-solid-svg-icons";
import imagelist from "../../assets/listbooking.png";
import { useSearchParams, useNavigate } from "react-router-dom";
import {getAllCar} from "../../services/api/phuongTien/api.phuongTien.js";

const ListBookingCar = () => {
  const navigate = useNavigate();
  const [detailCar, setDetailCar] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [searchParams] = useSearchParams();
  const SanBay = searchParams.get("SanBay") || "Default San Bay";
  const DiemKetThuc = searchParams.get("DiemKetThuc") || "Default Diem Ket Thuc";
  const Date = searchParams.get("Date") || "Default Date";
  const Time = searchParams.get("Time") || "Default Time";

  const formatPrice = (price) => {
    return new Intl.NumberFormat().format(price);
  };

  useEffect(() => {
    const fetchAllCar = async () => {
      try{
        const res = await getAllCar()
        if (res && res.status === 200){
          setDetailCar(res.data.chiTietXeOto);
        }
      }catch (error){
        console.error("Error fetching bus:", error);
        setFetchError(
          <div className="w-full">
            <div className="flex justify-center mt-8 mx-auto">
              <img
                className="w-1/3 h-1/3"
                src="https://ik.imagekit.io/tvlk/image/imageResource/2022/11/29/1669703331120-6c5d2bb47e511f5b9b7e143f55f513d7.png?tr=dpr-2,h-200,q-75"
                alt="No buses available"
              />
            </div>
            <p className="text-xl mt-4 text-center font-extrabold">
              No Cars Available
            </p>
            <p className="text-center my-4">
              There are no Cars operating between your locations. Please check
              again at another time.
            </p>
          </div>
        );
      }
    }
    fetchAllCar()
  }, [])

  const handleSubmit = (detailCarID) => {
    navigate(
      `/airport-transfer/search/list/cars?
      SanBay=${encodeURIComponent(SanBay)}
      &DiemKetThuc=${encodeURIComponent(DiemKetThuc)}
      &Date=${encodeURIComponent(Date)}
      &Time=${encodeURIComponent(Time)}
      &DetailCarID=${detailCarID}`
    );
  };

  return (
    <div className="w-full h-full mx-auto container">
      <img src={imagelist} alt="List Booking" />
      {fetchError && <div className="text-red-500">{fetchError}</div>}
      {detailCar.map((item) => (
        <div
          className="bg-white my-4 rounded-lg hover:border-green-500 border-2 transition-all duration-300"
          key={item._id}
        >
          <div className="flex">
            <img
              src={item.Image}
              className="w-1/3 h-44 rounded-s-lg"
              alt={item.TenHangXe}
            />

            <div className="grid w-full grid-cols-12 gap-4">
              <div className="p-4 col-span-7">
                <p className="text-4xl">
                  {item.TenHangXe}
                  <span className="text-2xl text-gray-500">(Standard)</span>
                </p>
                <p className="text-gray-500">{item.CongTy}</p>
                <span className="text-gray-300 mr-4">
                  <FontAwesomeIcon icon={faUser} /> {item.SoGheToiDa}
                </span>
                <span className="text-gray-300 mr-4">
                  <FontAwesomeIcon icon={faSuitcase} /> {item.SoHanhLyToiDa}
                </span>
              </div>
              <div className="col-span-5 p-4 mt-3 flex justify-end">
                <div>
                  <div className="w-fit">
                    <span className="text-lg text-orange-400">
                      {formatPrice(item.SoTien_1km)} VND/Km
                    </span>
                  </div>
                  <button
                    onClick={() => handleSubmit(item._id)}
                    className="bg-orange-500 w-full text-white font-bold rounded-lg p-2"
                  >
                    Choose
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListBookingCar;
