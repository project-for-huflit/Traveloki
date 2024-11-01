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

const BookingBus = () => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/`;
  const [searchParams] = useSearchParams();
  const SanBay = searchParams.get(`SanBay`);
  const dateParam = searchParams.get("Date");
  const timeParam = searchParams.get("Time");
  const busId = searchParams.get("PhuongTienID");
  const DiemKetThuc = searchParams.get(`DiemKetThuc`);
  const GiaVe = parseFloat(searchParams.get("GiaVe")) || 0;
  const [count, setCount] = useState(1);
  const [phuongtien, setPhuongTien] = useState(null);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  // const [isLoading, setIsLoading] = useState(true);
  // const [bookingBus, setBookingBus] = useState({
  //   MaPT: busId,
  //   SLVe: "",
  //   DiemDon: SanBay,
  //   DiemTra: DiemKetThuc,
  //   NgayGioKhoiHanh: `${dateParam}T${timeParam}`,
  //   ThanhTien: 0,
  //   TrangThai: false,
  //   currency: "VND"
  // });

  // console.log("busId", bookingBus)

  const increaseCount = () => {
    setCount((prevCount) => (prevCount < 10 ? prevCount + 1 : 10));
  };

  const decreaseCount = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  useEffect(() => {
    setTotalPrice(GiaVe * count);
  }, [count]);

  useEffect(() => {
    const fetchPhuongTien = async () => {
      try {
        const res = await getPhuongTienId(busId);
        if (res && res.data.phuongTien) {
          setPhuongTien(res.data.phuongTien);
        }
      } catch (error) {
        setError("Không thể lấy dữ liệu từ máy chủ phuongtien: " + error.message);
      }
    };
    fetchPhuongTien();
  }, [busId]);

  const handle_Submit = async (e) => {
    e.preventDefault();
    console.log("Dữ liệu gửi đi:", bookingBus);

    // const { MaPT, MaTram, DiemDon, DiemTra, NgayGioKhoiHanh, ThanhTien } =
    //   bookingBus;

    if (
      !MaPT ||
      !DiemDon ||
      !DiemTra ||
      !NgayGioKhoiHanh ||
      !ThanhTien
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const formattedDate = new Date(NgayGioKhoiHanh).toISOString();

    try {
      const res = await buyTicketBus(busId, count, SanBay, DiemKetThuc, formattedDate, totalPrice);
      if (res && res.data) {
        console.log("Đã nhận được ID đơn hàng:", res.data.buyTicketBus._id);
      }
    }catch (error) {
      console.error("Lỗi khi kết nối tới máy chủ:", error);
      alert("Đã xảy ra lỗi khi kết nối tới máy chủ");
    }


    try {
      const res = await fetch(`${url}/BuyTicketBus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          MaPT,
          MaTram,
          SLVe: count,
          DiemDon,
          DiemTra,
          NgayGioKhoiHanh: formattedDate,
          ThanhTien,
          TrangThai: false,
        }),
      });

      const data = await res.json();
      console.log("Phản hồi từ server:", data);

      if (res.ok) {
        const buyTicketBus = data.buyTicketBus;
        console.log("Đã nhận được ID đơn hàng:", buyTicketBus._id);

        if (!buyTicketBus._id) {
          alert("Không tìm thấy ID đơn hàng trong phản hồi");
          return;
        }

        try {
          const resVoucher = await fetch(
            "https://voucher-server-alpha.vercel.app/api/vouchers/createPartNerRequest",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                OrderID: buyTicketBus._id,
                PartnerID: "1000000003",
                ServiceName: "Mua vé xe Buýt",
                TotalMoney: ThanhTien,
                CustomerCode: "1000000024",
                Description: `Dịch vụ mua vé bus từ ${DiemDon} đến ${DiemTra}`,
                LinkHome:
                  `${import.meta.env.VITE_FE_URL}/home`,
                LinkReturnSuccess: `${import.meta.env.VITE_BACKEND_URL}/api/UpdateState/${buyTicketBus._id}`,
              }),
            }
          );

          const voucherData = await resVoucher.json();
          console.log("Phản hồi từ server tạo yêu cầu đối tác:", voucherData);

          if (resVoucher.ok) {
            window.location.href = `https://checkout-page-54281a5e23aa.herokuapp.com/?OrderID=${buyTicketBus._id}`;
          } else {
            alert(voucherData.error || "Đã xảy ra lỗi khi truyền dữ liệu");
          }
        } catch (error) {
          console.error("Lỗi khi truyền dữ liệu:", error);
          alert("Không thể truyền dữ liệu");
        }
      } else {
        alert(data.error || "Đã xảy ra lỗi khi mua vé xe");
      }
    } catch (error) {
      console.error("Lỗi khi kết nối tới máy chủ:", error);
      alert("Đã xảy ra lỗi khi kết nối tới máy chủ");
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault()
    console.log("Dữ liệu gửi đi:", bookingBus);

    const {
      Sdt, MaTram, DiemSanBay, DiemDon_Tra, NgayGioDat, SoKm,
      ThanhTien, Description,
    } = bookingBus;

    // Kiểm tra dữ liệu đầu vào
    if (
      !Sdt || !MaTram || !DiemSanBay || !DiemDon_Tra ||
      !NgayGioDat || !SoKm || !ThanhTien || !Description
    ) { alert("Vui lòng nhập đầy đủ thông tin"); return; }

    try {
      const resBooking = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/BookingCar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", },
          body: JSON.stringify({ MaDetailCar: busId, Sdt, MaTram, DiemSanBay, DiemDon_Tra, NgayGioDat, SoKm, ThanhTien, Description }),
        }
      );

      // Xử lý phản hồi từ server
      const data = await resBooking.json();
      console.log("Phản hồi từ server đặt xe:", data);

      if (resBooking.ok) {
        const datXeBus = data; // Chỉnh sửa nếu cần thiết để phù hợp với cấu trúc dữ liệu trả về
        console.log("Đã nhận được ID đơn hàng:", datXeBus._id);

        // req lên server pointer để chuyển hướng đến payment gateway
        setTimeout(() => {
          window.location.replace("https://pointer.io.vn/payment-gateway?token=671717b9dd003cf4eca7d461")
        }, 2000);
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_PRESSPAY_BASE_URL}/api/v1/payment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer pk_presspay_82fad953e33c472656094ab3b6a3d7d3553d3215ea09fda4e7d363caae555811'
              },
              body: JSON.stringify({
                private_key: import.meta.env.VITE_SECRET_API_KEY_POINTER,
                amount: ThanhTien,
                currency: bookingBus.currency,
                message: bookingBus.Description,
                return_url: `${import.meta.env.VITE_BASE_URL_CLIENT}list/cars/result`,
                orderID: datXeBus._id,
                userID: "userO1",
              }),
            }
          );
          // const body = {
          //   private_key:import.meta.env.VITE_SECRET_API_KEY_POINTER,
          //   amount:bookingCar.ThanhTien,
          //   currency:bookingCar.currency,
          //   message:bookingCar.Description,
          //   return_url: `${import.meta.env.VITE_BASE_URL_CLIENT}list/cars/result`,
          //   orderID:datXeOto._id,
          //   userID:"userO1"
          // }
          // const response = await paymentSend(body)
          const paymentData = await response.json();
          console.log("Phản hồi từ server tạo yêu cầu từ pointer:", paymentData);


          // if(response.status === 200){
          //     window.location.replace(response.data.url)
          // } else {
          //   alert(paymentData.error || "Đã xảy ra lỗi khi truyền dữ liệu - 265");
          // }
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

  // if (isLoading)
  //   return (
  //     <div className="text-center text-4xl translate-y-1/2 h-3/4 font-extrabold">
  //       Loading...
  //     </div>
  //   );
  // if (error)
  //   return (
  //     <div className="text-center text-4xl translate-y-1/2 h-full font-extrabold">
  //       Error: {error}
  //     </div>
  //   );
  //
  // const formatPrice = (price) => {
  //   return new Intl.NumberFormat().format(price);
  // };

  return (
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
              <span className="ml-2">{phuongtien?.TenPhuongTien}</span>
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
            onClick={handle_Submit}
            className="bg-orange-500 ml-4 w-fit text-white font-bold rounded-lg p-2"
          >
            Booking Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingBus;
