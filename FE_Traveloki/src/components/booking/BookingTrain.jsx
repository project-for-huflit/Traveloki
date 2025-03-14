import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  faPlaneArrival,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

const BookingTrain = () => {
  const navigate = useNavigate();
  const url = `${import.meta.env.VITE_BACKEND_URL}/api`;
  const [searchParams] = useSearchParams();
  const SanBay = searchParams.get("SanBay");
  const dateParam = searchParams.get("Date");
  const timeParam = searchParams.get("Time");
  const IDTram = searchParams.get("IDTram"); // ?
  const MaTuyen = searchParams.get("MaTuyen"); // ?
  const id = searchParams.get("DetailTrainID");
  const [count, setCount] = useState(1);
  const [counttreem, setCountTreem] = useState(0);
  const [phuongtien, setPhuongTien] = useState(null);
  const [tram, setTram] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingTrain, setBookingTrain] = useState({
    MaPT: id,
    MaTram: IDTram,
    SLVeNguoiLon: "",
    SLVeTreEm: "",
    DiemDon: SanBay,
    DiemTra: "",
    NgayGioKhoiHanh: `${dateParam}T${timeParam}`,
    ThanhTien: 0,
    TrangThai: false,
  });

  const increaseCount = () => {
    setCount((prevCount) => (prevCount < 10 ? prevCount + 1 : 10));
  };

  const decreaseCount = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  const increaseCountTreEm = () => {
    setCountTreem((prevCount) => (prevCount < 10 ? prevCount + 1 : 10));
  };

  const decreaseCountTreEm = () => {
    setCountTreem((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const fetchPhuongTien = async () => {
    try {
      const res = await fetch(`${url}/GetPhuongTienID/${id}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      setPhuongTien(result.phuongTien);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ phuongtien: " + error.message);
    }
  };

  const fetchTram = async () => {
    try {
      console.log("IDTram:", IDTram);
      console.log("BookingTrain parameters:", {
        SanBay,
        dateParam,
        timeParam,
        IDTram,
      });
      const res = await fetch(`${url}/GetTramDungID/${IDTram}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      setTram(result);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ tram: " + error.message);
    }
  };

  useEffect(() => {
    fetchPhuongTien();
  }, [id]);

  useEffect(() => {
    fetchTram();
  }, [IDTram]);

  useEffect(() => {
    if (phuongtien && tram) {
      setBookingTrain((prevBookingBus) => ({
        ...prevBookingBus,
        MaPT: phuongtien._id,
        DiemDon: SanBay,
        DiemTra: tram.DiaChi,
        ThanhTien: count * tram.GiaTienVe + counttreem * tram.GiaTienVe * 0.5,
      }));
      setIsLoading(false);
    }
  }, [phuongtien, tram, count, counttreem]);

  const handle_Submit = async (e) => {
    e.preventDefault();
    console.log("Dữ liệu gửi đi:", bookingTrain);

    const { MaPT, MaTram, DiemDon, DiemTra, NgayGioKhoiHanh, ThanhTien } =
      bookingTrain;

    if (
      !MaPT ||
      !MaTram ||
      !DiemDon ||
      !DiemTra ||
      !NgayGioKhoiHanh ||
      !ThanhTien
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const formattedDate = new Date(NgayGioKhoiHanh).toISOString();
    const requestData = {
      MaPT,
      MaTram,
      SLVeNguoiLon: count,
      SLVeTreEm: counttreem,
      DiemDon,
      DiemTra,
      NgayGioKhoiHanh: formattedDate,
      ThanhTien,
      TrangThai: false,
    };

    console.log("Request data:", requestData);

    try {
      const res = await fetch(`${url}/BuyTicketTrain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();
      console.log("Phản hồi từ server:", data);

      if (res.ok) {
        const buyTicketTrain = data.phieuDatTau;
        console.log("Đã nhận được ID đơn hàng:", buyTicketTrain._id);

        try {
          const resVoucher = await fetch(
            "https://voucher-server-alpha.vercel.app/api/vouchers/createPartNerRequest",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                OrderID: buyTicketTrain._id,
                PartnerID: "1000000003",
                ServiceName: "Mua vé tàu",
                TotalMoney: ThanhTien,
                CustomerCode: "1000000024",
                Description: `Dịch vụ đặt vé tàu từ ${DiemDon} đến ${DiemTra}`,
                LinkHome:
                  "https://cnpm-fe-thanh-b1c064a3f59c.herokuapp.com/HomePage",
                LinkReturnSuccess: `https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/UpdateState/${buyTicketTrain._id}`,
              }),
            }
          );

          const voucherData = await resVoucher.json();
          console.log("Phản hồi từ server tạo yêu cầu đối tác:", voucherData);

          if (resVoucher.ok) {
            window.location.href = `https://checkout-page-54281a5e23aa.herokuapp.com/?OrderID=${buyTicketTrain._id}`;
          } else {
            alert(voucherData.error || "Đã xảy ra lỗi khi truyền dữ liệu");
          }
        } catch (error) {
          console.error("Lỗi khi truyền dữ liệu:", error);
          alert("Không thể truyền dữ liệu");
        }
      } else {
        alert(data.error || "Đã xảy ra lỗi khi mua vé tàu");
      }
    } catch (error) {
      console.error("Lỗi khi kết nối tới máy chủ:", error);
      alert("Đã xảy ra lỗi khi kết nối tới máy chủ");
    }
  };

  if (isLoading)
    return (
      <div className="text-center text-4xl translate-y-1/2 h-3/4 font-extrabold">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-4xl translate-y-1/2 h-full font-extrabold">
        Error: {error}
      </div>
    );

  const formatPrice = (price) => {
    return new Intl.NumberFormat().format(price);
  };

  return (
    <div className="p-4 w-full h-fit overflow-y-auto">
      <span className="bg-white h-fit w-[96%] p-2 -top-0 font-bold text-xl">
        <span className="font-extrabold text-green-500 px-4">{SanBay}</span> -
        <span className="font-extrabold text-green-500 px-4">
          {tram?.DiaChi}
        </span>
      </span>
      <p className="pl-6 text-xl">Công ty: {phuongtien?.TenCty}</p>
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
            <div className=" mt-4 grid grid-cols-2">
              <div className="px-2">
                <label className="font-bold">Số lượng vé người lớn</label>
                <div className="grid border border-slate-300 bg-white rounded-md mt-2 grid-cols-3 ">
                  <button
                    className="bg-slate-300 p-2 rounded-s-md"
                    onClick={decreaseCount}
                  >
                    -
                  </button>
                  <span className="text-center h-full translate-y-1/4">
                    {count} vé
                  </span>
                  <button
                    className="bg-slate-300 rounded-e-md"
                    onClick={increaseCount}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="px-2">
                <label className="font-bold">Số lượng vé trẻ em</label>
                <div className="grid border border-slate-300 bg-white rounded-md mt-2 grid-cols-3 ">
                  <button
                    className="bg-slate-300 p-2 rounded-s-md"
                    onClick={decreaseCountTreEm}
                  >
                    -
                  </button>
                  <span className="text-center h-full translate-y-1/4">
                    {counttreem}/vé
                  </span>
                  <button
                    className="bg-slate-300 rounded-e-md"
                    onClick={increaseCountTreEm}
                  >
                    +
                  </button>
                </div>
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
            <span className="ml-2">{tram?.DiaChi}</span>
          </p>
        </div>
      </div>
      <div className=" mt-10 bg-white ">
        <div className="flex float-right">
          <div className="w-fit">
            <p className="text-gray-500 text-sm text-right">Tổng tiền xe</p>
            <span className="text-lg text-orange-400">
              {formatPrice(bookingTrain.ThanhTien)} VND
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

export default BookingTrain;
