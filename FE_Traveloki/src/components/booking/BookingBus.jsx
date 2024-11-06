import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";
import {faCalendarDays, faPlaneArrival} from "@fortawesome/free-solid-svg-icons";
import {getPhuongTienId} from "../../services/api/phuongTien/api.phuongTien.js";
import {buyTicketBus} from "../../services/api/booking/api.bookingBus.js";
// import {
//   faPlaneArrival,
//   faCalendarDays,
// } from "@fontawesome/free-solid-svg-icons";
import Loading from '../../pages/loading/index'

const BookingBus = () => {
  // const url = `${import.meta.env.VITE_BACKEND_URL}/api/`;
  const [searchParams] = useSearchParams();
  const SanBay = decodeURIComponent(searchParams.get("SanBay")).trim();
  const dateParam = decodeURIComponent(searchParams.get("Date")).trim();
  const timeParam = decodeURIComponent(searchParams.get("Time")).trim();
  const busId = searchParams.get("PhuongTienID");
  const IDTram = decodeURIComponent(searchParams.get("MaTram")).trim();
  const DiemKetThuc = decodeURIComponent(searchParams.get("DiemKetThuc")).trim();
  const GiaVe = parseFloat(searchParams.get("GiaVe")) || 1;
  // const GiaVe = searchParams.get("GiaVe");
  const [count, setCount] = useState(1);
  const [phuongtien, setPhuongTien] = useState(null);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(GiaVe);
  const [isLoading, setIsLoading] = useState(true);

  // const [isLoading, setIsLoading] = useState(true);
  // const { MaPT, SLVe, DiemDon, DiemTra, NgayGioKhoiHanh, ThanhTien } = req.body;
  const [bookingBus, setBookingBus] = useState({
    MaPT: busId,
    Sdt: "0374444252",
    MaTram: IDTram,
    DiemDon: SanBay,
    DiemTra: DiemKetThuc,
    DiemDon_Tra: SanBay + "-" + DiemKetThuc,
    NgayGioKhoiHanh: dateParam + "T" + timeParam,
    ThanhTien: GiaVe || 1,
    TrangThai: false,
    Description: "Thanh toán vé xe buýt",
    currency: "VND",
    name: "Thanh toán vé xe buýt tuyến " + SanBay + "-" + DiemKetThuc,
    image: "https://www.youtube.com/watch?v=TD7sBUigDIU",
    SLVe: count,
    price: "" || 1,
    return_url: "http://localhost:5173/list/cars/result"
  });

  console.log("busId", bookingBus)

  const increaseCount = () => {
    setCount((prevCount) => {
      const newCount = prevCount < 10 ? prevCount + 1 : 10;
      setTotalPrice(GiaVe * newCount);
      return newCount;
    });
    // setTotalPrice(GiaVe * count);
    // console.log("Gia ve::", GiaVe)
    // console.log("Tong ve::", count)
    // console.log("Tong::", totalPrice)
  };

  const decreaseCount = () => {
    setCount((prevCount) => {
      const newCount = prevCount > 1 ? prevCount - 1 : 1;
      setTotalPrice(GiaVe * newCount);
      return newCount;
    });
    // setTotalPrice(GiaVe * count);
    // console.log("Gia ve::", GiaVe)
    // console.log("Tong ve::", count)
    // console.log("Tong::", totalPrice)
  };

  useEffect(() => {
    const fetchPhuongTien = async () => {
      try {
        const res = await getPhuongTienId(busId);
        console.log("fetch phuong tien::", res.data)
        if (res && res.data.phuongTien) {

          // setPhuongTien(res.data.phuongTien);
          setPhuongTien((prevBookingCar) => ({
            ...prevBookingCar,
            phuongtien: res.data.phuongTien.TenPhuongTien,
          }))
          setBookingBus((prevBookingCar) => ({
            ...prevBookingCar,
            name: res.data.phuongTien.TenPhuongTien,
            ThanhTien: totalPrice,
            price: GiaVe,
            return_url: `${import.meta.env.VITE_FE_URL}/list/cars/result`
          }))
          console.log("phuongtien::", phuongtien)
        }
      } catch (error) {
        setError("Không thể lấy dữ liệu từ máy chủ phuongtien: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhuongTien();
  }, [count, GiaVe, busId]);

  const handlePayment = async (e) => {
    e.preventDefault()
    console.log("Dữ liệu gửi đi:", bookingBus);

    const {
      Sdt, MaTram, DiemDon, DiemDon_Tra, DiemTra, NgayGioKhoiHanh, SLVe,
      ThanhTien, Description,
    } = bookingBus;

    console.log("Dữ liệu nhận vào:", {
      Sdt, MaTram, DiemDon, DiemTra, DiemDon_Tra, NgayGioKhoiHanh, SLVe,
      ThanhTien, Description,
    });
    // Kiểm tra dữ liệu đầu vào
    if (
      !Sdt || !MaTram || !DiemDon || !DiemTra || !DiemDon_Tra || !SLVe ||
      !NgayGioKhoiHanh || !ThanhTien || !Description
    ) { alert("Vui lòng nhập đầy đủ thông tin"); return; }

    try {
      const resBooking = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/BuyTicketBus`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", },
          body: JSON.stringify({
            MaPT: busId,
            SLVe,
            DiemDon,
            DiemTra,
            NgayGioKhoiHanh,
            ThanhTien,
          }),
        }
      );

      // Xử lý phản hồi từ server
      const data = await resBooking.json();
      console.log("Phản hồi từ server đặt xe bus:", data);

      if (resBooking.ok) {
        const datXeBusId = data; // Chỉnh sửa nếu cần thiết để phù hợp với cấu trúc dữ liệu trả về
        console.log("Đã nhận được ID đơn hàng:", datXeBusId._id);

        try {
          // console.log({
          //   amount: ThanhTien,
          //   currency: bookingCar.currency,
          //   message: bookingCar.Description,
          //   return_url: `${import.meta.env.VITE_FE_URL}/list/cars/result`,
          //   orderID: datXeBus._id,
          //   userID: "userO1",
          // })

          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/payment/pointer-wallet/bus`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + import.meta.env.VITE_SECRET_API_KEY_POINTER
              },
              body: JSON.stringify({
                amount: ThanhTien,
                currency: bookingBus.currency,
                message: bookingBus.Description,
                userID: "userO1",
                orderID: datXeBusId._id,
                returnUrl: bookingBus.return_url,
                name: bookingBus.name,
                image: bookingBus.image,
                description: bookingBus.Description,
                quantity: bookingBus.SLVe,
                price: bookingBus.ThanhTien,
              }),
            }
          );

          if(response.ok){
              const data = await response.json();
              console.log("Phản hồi từ server tạo yêu cầu từ pointer:", data);
              window.location.replace(data.metadata)
          } else {
            alert(response.error || "Đã xảy ra lỗi khi truyền dữ liệu - 200");
          }
        } catch (error) {
          console.error("Lỗi khi truyền dữ liệu:", error);
          alert("Không thể truyền dữ liệu");
        }
      } else {
        alert(data.error || "Đã xảy ra lỗi khi đặt xe");
      }
    } catch (error) {
      console.error("Lỗi khi kết nối tới máy chủ:", error);
      alert("Đã xảy ra lỗi khi kết nối tới máy chủ");
    }
  }

  if (isLoading)
    return (
      <Loading />
    );
  if (error)
    return (
      <div className="text-center text-4xl translate-y-1/2 h-full font-extrabold">
        Error: {error}
      </div>
    );
  //
  // const formatPrice = (price) => {
  //   return new Intl.NumberFormat().format(price);
  // };

  return (
    <div className="">
      <div className="p-4 w-full h-fit overflow-y-auto">
      <span className="bg-white h-fit w-[96%] p-2 -top-0 font-bold text-xl">
        <span className="font-extrabold text-green-500 px-4">{SanBay}</span> -
        <span className="font-extrabold text-green-500 px-4">
          {DiemKetThuc}
        </span>
      </span>
      <div className="mt-4 bg-slate-100 h-fit p-4">
        <label className="font-bold">
          <span className="text-blue-500">○</span> Điểm sân bay
        </label>
        <div className="grid grid-cols-2 pl-4 ml-[5.3px] border-l-4">
          <div className="p-2">
            <label className="font-bold">Sân bay</label>
            <p className="border mt-2 mb-4 text-slate-500 border-gray-500 bg-slate-50 rounded-md p-2">
              <FontAwesomeIcon icon={faPlaneArrival} />
              <span className="ml-2">{SanBay}</span>
            </p>
            <label className="font-bold">Lịch đi</label>
            <p className="border mt-2 text-slate-500 border-gray-500 bg-slate-50 rounded-md p-2">
              <FontAwesomeIcon icon={faCalendarDays} />
              <span className="ml-2">{`${dateParam} - ${timeParam}`}</span>
            </p>
          </div>
          <div className="p-2">
            <label className="font-bold">Tên xe </label>
            <p className="border mt-2 text-slate-500 border-gray-500 bg-slate-50 rounded-md p-2">
              <FontAwesomeIcon icon={faCalendarDays} />
              <span className="ml-2">{phuongtien?.phuongtien}</span>
            </p>
            <div className=" mt-4 ">
              <label className="font-bold">Số lượng vé</label>
              <div className="grid border border-slate-300 bg-white rounded-md mt-2 grid-cols-3 ">
                <button
                  className="bg-slate-300 p-2 rounded-s-md"
                  onClick={decreaseCount}
                >
                  -
                </button>
                <span className="text-center h-full translate-y-1/4">
                  {count} vé
                </span>{" "}
                <button
                  className="bg-slate-300 rounded-e-md"
                  onClick={increaseCount}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <label className="font-bold">
          <span className="text-blue-500">●</span> Điểm đón-trả
        </label>
        <div className="p-2 pl-8">
          <p className="border mt-2 text-slate-500 border-gray-500 bg-slate-50 rounded-md p-2">
            <FontAwesomeIcon icon={faPlaneArrival} />
            <span className="ml-2">{DiemKetThuc}</span>
          </p>
        </div>
      </div>
      <div className=" mt-10 bg-white ">
        <div className="flex float-right">
          <div className="w-fit">
            <p className="text-gray-500 text-sm text-right">Tổng tiền xe</p>
            <span className="text-lg text-orange-400">
              {/*{formatPrice(bookingBus.ThanhTien)} VND*/}
              {totalPrice} VND
            </span>
          </div>
          <button
            onClick={handlePayment}
            className="bg-orange-500 ml-4 w-fit text-white font-bold rounded-lg p-2"
          >
            Booking Now
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default BookingBus;
