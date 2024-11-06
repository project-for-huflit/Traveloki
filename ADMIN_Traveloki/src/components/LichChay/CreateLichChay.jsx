import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { notification } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchAllTuyenXe } from "../../services/api/TuyenXe/apiDanhSachTuyenXe.js";
import { fetchAllPhuongTien } from "../../services/api/PhuongTien/apiDanhSachPhuongTien.js";
import { createLichChay } from "../../services/api/LichChay/apiCreateLichChay.js";
import { format } from "date-fns";

const CreateLichChay = () => {
  const [lichChay, setLichChay] = useState({
    MaPT: "",
    MaTuyen: "",
    ngayKhoiHanh: new Date(),
    gioKhoiHanh: "",
    gioKetThuc: "",
    SLVe: "",
  });
  const [tuyen, setTuyen] = useState([]);
  const [phuongTien, setPhuongTien] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const danhSachTuyen = async () => {
      try {
        const res = await fetchAllTuyenXe();
        if (res && res.data) {
          setTuyen(res.data);
        } else {
          throw new Error("Không thể lấy dữ liệu từ máy chủ");
        }
      } catch (error) {
        console.log("Lỗi:", error);
      }
    };
    danhSachTuyen();

    const danhSachPhuongTien = async () => {
      try {
        const res = await fetchAllPhuongTien();
        if (res && res.data) {
          setPhuongTien(res.data);
        } else {
          throw new Error("Không thể lấy dữ liệu từ máy chủ");
        }
      } catch (error) {
        console.log("Lỗi:", error);
      }
    };
    danhSachPhuongTien();
  }, []);

  // Xử lý khi thay đổi giá trị trong input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLichChay((prevlichChay) => ({
      ...prevlichChay,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setLichChay((prevlichChay) => ({
      ...prevlichChay,
      ngayKhoiHanh: date,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lichChay.MaPT || !lichChay.MaTuyen || !lichChay.ngayKhoiHanh || !lichChay.gioKhoiHanh ||
      !lichChay.gioKetThuc || !lichChay.SLVe) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (lichChay.SLVe < 0 ){
      alert("SlVe phải lớn hon 0")
      return
    }

    if (lichChay.gioKhoiHanh >= lichChay.gioKetThuc) {
      alert("Thời gian kết thúc phải sau thời gian khởi hành");
      return;
    }

    const formattedDate = format(lichChay.ngayKhoiHanh, 'dd/MM/yyyy');

    try {
      const res = await createLichChay(
        lichChay.MaPT,
        lichChay.MaTuyen,
        formattedDate,
        lichChay.gioKhoiHanh,
        lichChay.gioKetThuc,
        lichChay.SLVe
      );
      if (res && res.EC === 0) {
        notification.success({
          message: "Thêm lịch chạy",
          description: "Thêm lịch chạy thành công",
        });
        navigate("/schedule/list");
      } else {
        notification.error({
          message: "Thêm lịch chạy",
          description: `Thêm thất bại: ${res.EM}`,
        });
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi kết nối tới máy chủ");
    }
  };

  return (
    <div className="w-full h-full bg-white">
      <h1 className="text-center text-2xl text-black pt-4 font-extrabold">
        Thêm danh sách lịch chạy
      </h1>
      <div className="pt-4 flex justify-center">
        <div className="w-1/2">
          <div className="mb-4">
            <label className="text-black">Tuyến</label>
            <select
              name="MaTuyen"
              value={lichChay.MaTuyen}
              onChange={handleChange}
              className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
            >
              <option value="">Chọn tuyến</option>
              {tuyen.map((tuyen) => (
                <option key={tuyen._id} value={tuyen._id}>
                  {tuyen.MaTuyen}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-black">Phương tiện</label>
            <select
              name="MaPT"
              value={lichChay.MaPT}
              onChange={handleChange}
              className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
            >
              <option value="">Chọn phương tiện (Loại PT - MaPT - Mã số xe)</option>
              {phuongTien.map((phuongTien) => (
                <option key={phuongTien._id} value={phuongTien._id}>
                  {phuongTien.LoaiPT} - {phuongTien.MaPT} - {phuongTien.MaSoXe}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-black">Ngày khởi hành</label>
            <DatePicker
              selected={lichChay.ngayKhoiHanh}
              onChange={handleDateChange}
              className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}/>
          </div>

          <div className="mb-4">
            <label className="text-black">Giờ khởi hành</label>
            <input
              type="time"
              name="gioKhoiHanh"
              value={lichChay.gioKhoiHanh}
              onChange={handleChange}
              className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
            />
          </div>

          <div className="mb-4">
            <label className="text-black">Giờ kết thúc</label>
            <input
              type="time"
              name="gioKetThuc"
              value={lichChay.gioKetThuc}
              onChange={handleChange}
              className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
            />
          </div>

          <div className="mb-4">
            <label className="text-black">Số lượng vé</label>
            <input
              type="number"
              name="SLVe"
              value={lichChay.SLVe}
              onChange={handleChange}
              className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              disabled={
                !lichChay.MaPT || !lichChay.MaTuyen || !lichChay.ngayKhoiHanh || !lichChay.gioKhoiHanh ||
                !lichChay.gioKetThuc || !lichChay.SLVe
              }
              onClick={handleSubmit}
              className="bg-blue-500 px-4 py-2 hover:bg-blue-700 text-white font-bold rounded"
            >
              Thêm tuyến xe
            </button>
            <Link className="ml-4" to="/road/list">
              <button className="bg-red-500 px-4 py-2 hover:bg-red-700 text-white font-bold rounded">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLichChay;
