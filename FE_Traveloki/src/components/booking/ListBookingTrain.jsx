import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import imagelist from "../../assets/busimage.png";
import { useSearchParams, useNavigate } from "react-router-dom";
import {getPhuongTienByLichChay} from "../../services/api/phuongTien/api.phuongTien.js";

const ListBookingBus = (props) => {
  const {MaTuyen} = props;
  const navigate = useNavigate();
  const [fetchError, setFetchError] = useState(null);
  const [searchParams] = useSearchParams();
  const [trains, setTrains] = useState([]);
  const SanBay = searchParams.get("SanBay");
  const Date = searchParams.get("Date");
  const Time = searchParams.get("Time");
  const IDTram = searchParams.get("MaTram") || "Default MaTram";
  const GiaVe = searchParams.get("GiaVe");
  const DiemKetThuc = searchParams.get("DiemKetThuc");

  useEffect(() => {
    const fetchTrainByLichChay = async() => {
      try{
        const res = await getPhuongTienByLichChay(MaTuyen)
        console.log("check train",res)
        if (res && res.data.EC === 0){
          const trainData = res.data.data
            .filter((item) => item.MaPT.LoaiPT === "train")
            .map((item) => item.MaPT);
          setTrains(trainData);
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
              No Train Available
            </p>
            <p className="text-center my-4">
              There are no trains operating between your locations. Please check
              again at another time.
            </p>
          </div>
        );
      }
    }
    fetchTrainByLichChay()
  }, [MaTuyen])

  const formatPrice = (price) => {
    return new Intl.NumberFormat().format(price);
  };

  const handleSubmit = (TrainID) => {
    // navigate(
    //   `/airport-transfer/search/list/trains?
    //   SanBay=${encodeURIComponent(
    //     SanBay
    //   )}&Date=${encodeURIComponent(Date)}&Time=${encodeURIComponent(
    //     Time
    //   )}&IDTram=${IDTram}&PhuongTienID=${TrainID}`
    // );

    navigate(
      `/airport-transfer/search/list/bus?
      SanBay=${encodeURIComponent(SanBay)}
      &Date=${encodeURIComponent(Date)}
      &Time=${encodeURIComponent(Time)}
      &DiemKetThuc=${encodeURIComponent(DiemKetThuc)}
      &GiaVe=${encodeURIComponent(GiaVe)}
      &MaTram=${encodeURIComponent(IDTram)}
      &PhuongTienID=${TrainID}`
    );
  };

  // const filteredTrains = trains.filter((train) =>
  //   tuyenSB.some((tuyen) => tuyen.MaTuyen === train.MaTuyen)
  // );

  return (
    <div className="w-full h-full mx-auto container">
      <img src={imagelist} alt="Train List" />
      {fetchError && <div className="">{fetchError}</div>}
      {trains.length === 0 && !fetchError ? (
        <div className="w-full">
          <div className="flex justify-center mt-8 mx-auto">
            <img
              className="w-1/3 h-1/3"
              src="https://ik.imagekit.io/tvlk/image/imageResource/2022/11/29/1669703331120-6c5d2bb47e511f5b9b7e143f55f513d7.png?tr=dpr-2,h-200,q-75"
              alt="Không có tàu khả dụng"
            />
          </div>
          <p className="text-xl mt-4 text-center font-extrabold">
            Không có tàu nào khả dụng
          </p>
          <p className="text-center my-4">
            Không có tàu nào hoạt động giữa các địa điểm của bạn. Vui lòng kiểm
            tra lại vào thời gian khác.
          </p>
        </div>
      ) : (
        trains.map((item) => (
          <div
            className="bg-white my-4 rounded-lg hover:border-green-500 border-2 transition-all duration-300"
            key={item._id}
          >
            <div className="flex">
              <img
                src={item.image}
                className="w-1/3 h-44 rounded-s-lg"
                alt="Train"
              />
              <div className="grid w-full grid-cols-12 gap-4">
                <div className="p-4 col-span-7">
                  <p className="text-4xl">
                    {item.TenPhuongTien}
                    <span className="text-2xl text-gray-500">(Standard)</span>
                  </p>
                  <span className="text-gray-300 mr-4">
                    <FontAwesomeIcon icon={faUser} /> {item.SoGheToiDa}
                  </span>
                  <p className="text-xl">Lịch trình linh hoạt</p>
                </div>
                <div className="col-span-5 p-4 mt-3 flex justify-end">
                  <div>
                    <div className="w-fit">
                      <span className="text-lg text-orange-400">
                        {formatPrice(GiaVe || 0)} VND /1 người
                      </span>
                    </div>
                    <button
                      onClick={() => handleSubmit(item._id)}
                      className="bg-orange-500 w-full text-white font-bold rounded-lg p-2"
                    >
                      Chọn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ListBookingBus;
