import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { faUser, faSuitcase } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams, useNavigate } from "react-router-dom";
import {getAllCar} from "../../services/api/phuongTien/api.phuongTien.js";

const ListBookingCar = () => {
  const navigate = useNavigate();
  const [detailCar, setDetailCar] = useState([]);
  // const [detailCarUrl, setDetailCarUrl] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [searchParams] = useSearchParams();
  const SanBay = searchParams.get("SanBay") || "Default San Bay";
  const DiemKetThuc = searchParams.get("DiemKetThuc") || "Default Diem Ket Thuc";
  const Date = searchParams.get("Date") || "Default Date";
  const Time = searchParams.get("Time") || "Default Time";
  const IDTram = searchParams.get("MaTram") || "Default MaTram";


  console.log("ID IDTram:", IDTram);

  const formatPrice = (price) => {
    return new Intl.NumberFormat().format(price);
  };

  useEffect(() => {
    const fetchAllCar = async () => {
      try{
        const res = await getAllCar()
        if (res && res.status === 200){
          setDetailCar(res.data.chiTietXeOto);
          console.log("resAllCar::", res.data.chiTietXeOto);
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
    console.log("url image::", detailCar)
    // setDetailCarUrl(detailCar)
    navigate(
      `/airport-transfer/search/list/cars?
      &SanBay=${encodeURIComponent(SanBay)}
      &DiemKetThuc=${encodeURIComponent(DiemKetThuc)}
      &Date=${encodeURIComponent(Date)}
      &Time=${encodeURIComponent(Time)}
      &MaTram=${encodeURIComponent(IDTram)}
      &DetailCarID=${detailCarID}`
    );
  };

  const loiIchList = [
    {
      icon: 'ICON',
      desc: 'Available 24 hours'
    },
    {
      icon: 'ICON',
      desc: 'Convenient pick-up point'
    },
    {
      icon: 'ICON',
      desc: 'All-inclusive price'
    },
  ]
  const listOK = loiIchList.map((index) => (
    <div
      key={index}
      className="flex justify-center items-center p-4 text-white"
    >
      <div className="">{index.icon}</div>
      <div className="mr-2">{index.desc}</div>
    </div>
  ));
// &ImageCar=${encodeURIComponent(detailCar.Image)}
  return (
    <div className="w-full h-full mx-auto container">
      {/* <img src={imagelist} alt="List Booking" /> */}

      <div className="w-full bg-[#1D4886] flex items-center my-12">
        <div className=""></div>
        <div className="ml-16 px-8 flex flex-row">{listOK}</div>
      </div>

      {fetchError && <div className="text-red-500">{fetchError}</div>}
      {detailCar.map((item) => (
        <div
          className="bg-white my-4  hover:drop-shadow-md border-2 transition-all duration-300"
          key={item._id}
        >
          <div className="flex">
            <div className="border-2">
              <img
                src={item.Image}
                className="w-[276px] max-w-[276px] h-44 "
                alt={item.TenHangXe}
              />
            </div>

            <div className="grid w-full grid-cols-12 gap-4">
              <div className="p-4 col-span-7">
                <p className="text-2xl mr-1">
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
                    <span className="text-lg text-[#1D4886]">
                      {formatPrice(item.SoTien_1km)} VND/Km
                    </span>
                  </div>
                  <button
                    onClick={() => handleSubmit(item._id)}
                    className="bg-[#1D4886] w-full text-white rounded-lg p-2 text-xs font-semibold font-['Inter']"
                  >
                    Choose
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-12 flex justify-center items-center">
        <Stack spacing={2}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
      </div>
    </div>
  );
};

export default ListBookingCar;
