import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { fetchAllSanBay } from "../../services/api/ListSanBay/apiDanhSachSanBay.js";
import { createTuyenXe } from "../../services/api/TuyenXe/apiCreateTuyenXe.js";
import {fetchAllTramDung} from "../../services/api/TramDung/apiDanhSachTramDung.js";
import {notification} from "antd";
import Select from "react-select";

const CreateTuyenXe = () => {
  const [tuyenxe, setTuyenXe] = useState({
    DiemKhoiHanh: "",
    DiemKetThuc: "",
    ThoiGianKhoiHanh: "",
    ThoiGianKetThuc: "",
  });
  const [sanBays, setSanBays] = useState([]);
  const [tramDung, setTramDung] = useState([]);
  const [tramList, setTramList] = useState([{ MaTramDung: "", SoKM: "", GiaVe: "" }]);

  const navigate = useNavigate();

  useEffect(() => {
    const danhSachSanBay = async () => {
      try {
        const res = await fetchAllSanBay();
        if (res && res.data) {
          setSanBays(res.data);
        } else {
          throw new Error("Không thể lấy dữ liệu từ máy chủ");
        }
      } catch (error) {
        console.log("Lỗi:", error);
      }
    };
    danhSachSanBay();

    const danhSachTramDung = async () => {
      try {
        const res = await fetchAllTramDung();
        if (res && res.data) {
          setTramDung(res.data);
        } else {
          throw new Error("Không thể lấy dữ liệu từ máy chủ");
        }
      } catch (error) {
        console.log("Lỗi:", error);
      }
    }
    danhSachTramDung();
  }, []);

  const optionsDiemKetThuc = tramDung.map((tramdung) => ({
    value: tramdung.TenTramDung,
    label: `${tramdung.MaTramDung} - ${tramdung.ThanhPho} - ${tramdung.TenTramDung}`,
  }));

  const handleSelectChangeDiemKetThuc = (selectedOption) => {
    // Lưu MaSB từ selectedOption (giả sử value chứa ObjectId)
    setTuyenXe((prevTuyenXe) => ({
      ...prevTuyenXe,
      DiemKetThuc: selectedOption ? selectedOption.value : "",
    }));
  };

  const optionsDiemKhoiHanh = sanBays.map((sanbay) => ({
    value: sanbay.TenSanBay,
    label: `${sanbay.MaSB} - ${sanbay.ThanhPho} - ${sanbay.TenSanBay}`,
  }));

  const handleSelectChangeDiemKhoiHanh = (selectedOption) => {
    // Lưu MaSB từ selectedOption (giả sử value chứa ObjectId)
    setTuyenXe((prevTuyenXe) => ({
      ...prevTuyenXe,
      DiemKhoiHanh: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTuyenXe((prevTuyenXe) => ({
      ...prevTuyenXe,
      [name]: value,
    }));
  };

  const handleTramChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTramList = [...tramList];
    updatedTramList[index][name] = value;
    setTramList(updatedTramList);
  };

  const addTram = () => {
    setTramList([...tramList, { MaTramDung: "", SoKM: "", GiaVe: "" }]);
  };

  const removeTramAtIndex = (index) => {
    const updatedTramList = [...tramList];
    if (updatedTramList.length > 1) {
      updatedTramList.splice(index, 1);
      setTramList(updatedTramList);
    } else {
      alert("Cần ít nhất một trạm dừng.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tuyenxe.DiemKhoiHanh || !tuyenxe.DiemKetThuc || !tuyenxe.ThoiGianKhoiHanh || !tuyenxe.ThoiGianKetThuc) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    // const thoiGianKhoiHanh = new Date(`1970-01-01T${tuyenxe.ThoiGianKhoiHanh}:00Z`);
    // const thoiGianKetThuc = new Date(`1970-01-01T${tuyenxe.ThoiGianKetThuc}:00Z`);

    if (tuyenxe.ThoiGianKetThuc <= tuyenxe.ThoiGianKhoiHanh) {
      alert("Thời gian kết thúc phải sau thời gian khởi hành");
      return;
    }


    try {
      const res = await createTuyenXe(
        tuyenxe.DiemKhoiHanh,
        tuyenxe.DiemKetThuc,
        tuyenxe.ThoiGianKhoiHanh,
        tuyenxe.ThoiGianKetThuc,
        tramList
      );
      if (res && res.EC === 0) {
        notification.success({
          message: "Thêm tuyến xe",
          description: "Thêm tuyến xe thành công",
        });
        navigate("/road/list");
      } else {
       notification.error({
          message: "Thêm tuyến xe",
          description: `Thêm thất bại: ${res.EM}`,
       })
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi kết nối tới máy chủ");
    }
  };

  return (
    <div className="w-full h-full bg-white">
      <h1 className="text-center text-2xl text-black pt-4 font-extrabold">
        Thêm danh sách tuyến xe
      </h1>
      <div className="pt-4 flex justify-center">
        <div className="w-1/2">
          <label className="text-black">Điểm khởi hành</label>
          <Select
            options={optionsDiemKhoiHanh}
            onChange={handleSelectChangeDiemKhoiHanh}
            className="basic-single"
            classNamePrefix="select"
            isClearable={true}
            placeholder="Chọn Điểm Kết Thúc"
          />
          {/*<select*/}
          {/*  name="DiemKhoiHanh"*/}
          {/*  value={tuyenxe.DiemKhoiHanh}*/}
          {/*  onChange={handleChange}*/}
          {/*  className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"*/}
          {/*>*/}
          {/*  <option value="">Chọn điểm khởi hành</option>*/}
          {/*  {sanBays.map((sanBay) => (*/}
          {/*    <option key={sanBay._id} value={sanBay.TenSanBay}>*/}
          {/*      {sanBay.TenSanBay} ({sanBay.MaSB})*/}
          {/*    </option>*/}
          {/*  ))}*/}
          {/*</select>*/}
          <label className="text-black pb-4 ">Điểm kết thúc</label>
          <Select
            options={optionsDiemKetThuc}
            onChange={handleSelectChangeDiemKetThuc}
            className="basic-single"
            classNamePrefix="select"
            isClearable={true}
            placeholder="Chọn Điểm Kết Thúc"
          />
          <label className="text-black pb-4">Thời gian khởi hành</label>
          <input
            type="time"
            name="ThoiGianKhoiHanh"
            value={tuyenxe.ThoiGianKhoiHanh}
            onChange={handleChange}
            className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
          />

          <label className="text-black pb-4">Thời gian kết thúc</label>
          <input
            type="time"
            name="ThoiGianKetThuc"
            value={tuyenxe.ThoiGianKetThuc}
            onChange={handleChange}
            className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
          />

          {tramList.map((tram, index) => (
            <div key={index} className="flex space-x-4 mt-4 items-center">
              <div>
                <label className="text-black pb-4">Mã trạm</label>
                <select
                  name="MaTramDung"
                  value={tram.MaTramDung}
                  onChange={(e) => handleTramChange(e, index)}
                  className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
                >
                  <option value="">Chọn trạm</option>
                  {tramDung.map((tramOption) => (
                    <option key={tramOption._id} value={tramOption._id}>
                      {tramOption.TenTramDung} ({tramOption.MaTramDung})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-black pb-4">Số km</label>
                <input
                  name="SoKM"
                  value={tram.SoKM}
                  onChange={(e) => handleTramChange(e, index)}
                  className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
                />
              </div>
              <div>
                <label className="text-black pb-4">Giá vé</label>
                <input
                  name="GiaVe"
                  value={tram.GiaVe}
                  onChange={(e) => handleTramChange(e, index)}
                  className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
                />
              </div>
              <button
                type="button"
                onClick={() => removeTramAtIndex(index)}
                className="bg-red-500 p-2 hover:bg-red-700 text-white font-bold rounded mt-8"
              >
                <FontAwesomeIcon icon={faTrash}/>
              </button>
            </div>
          ))}

          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={addTram}
              className="bg-green-500 px-4 py-2 hover:bg-green-700 text-white font-bold rounded"
            >
              Thêm trạm
            </button>
          </div>
          <div className="flex justify-center">
            <button
              disabled={
                !tuyenxe.DiemKhoiHanh ||
                !tuyenxe.DiemKetThuc ||
                !tuyenxe.ThoiGianKhoiHanh ||
                !tuyenxe.ThoiGianKetThuc
              }
              onClick={handleSubmit}
              className="bg-blue-500 px-4 py-2 mt-4 w-fit h-fit hover:bg-blue-700 text-white font-bold rounded"
            >
              Thêm tuyến xe
            </button>
            <Link className="p-4" to="/road/list">
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

export default CreateTuyenXe;
