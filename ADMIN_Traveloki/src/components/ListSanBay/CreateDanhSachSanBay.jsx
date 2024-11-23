import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {createDanhSachSanBay} from "../../services/api/ListSanBay/apiCreateDanhSachSanBay.js";
import { notification } from "antd";
import {getThanhPho} from "../../services/api/ThanhPho/apiThanhPho.js";
import Select from "react-select";

const CreateDanhSachSanBay = () => {
  const [thanhPhoOptions, setThanhPhoOptions] = useState([]);
  const [selectedThanhPho, setSelectedThanhPho] = useState(null);
  const [danhSachSanBay, setDanhSachSanBay] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThanhPho = async () => {
      try {
        const res = await getThanhPho();
        const options = res.map((item) => ({
          value: item.code,
          label: item.name,
        }));
        setThanhPhoOptions(options);
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };
    fetchThanhPho();
  }, []);

  const handleThanhPhoChange = (selectedOption) => {
    setSelectedThanhPho(selectedOption);
    setDanhSachSanBay({
      ...danhSachSanBay,
      ThanhPho: selectedOption ? selectedOption.label : null, // Lưu giá trị thành phố vào danhSachSanBay
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!danhSachSanBay.TenSanBay || !danhSachSanBay.ThanhPho) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const res = await createDanhSachSanBay(danhSachSanBay)
      if (res && res.EC === 0) {
        notification.success({
          message: "Thêm sân bay",
          description: "Thêm sân bay thành công"
        });
        navigate("/airport/list");
      }else {
        notification.error({
          message: "Thêm sân bay",
          description: `Thêm thất bại: ${res.EM}`
        });
      }
    } catch (error) {
      console.log(error);
      alert("Đã xảy ra lỗi khi kết nối tới máy chủ");
    }
  };

  return (
    <div className="w-full h-full bg-white">
      <h1 className=" text-center text-2xl text-black pt-4 font-extrabold">
        Thêm danh sách sân bay
      </h1>
      <div className="pt-4 flex justify-center">
        <div className="w-1/2">
          <label className="text-black pb-4">Tên Sân Bay</label>
          <input
            type="text"
            value={danhSachSanBay.TenSanBay || ""}
            onChange={(e) =>
              setDanhSachSanBay({
                ...danhSachSanBay,
                TenSanBay: e.target.value,
              })
            }
            className="w-full mt-2 bg-slate-100 border-black rounded-lg  p-2"
          />
          <label className="text-black pb-4">Thành phố</label>
          <Select
            options={thanhPhoOptions}
            value={selectedThanhPho}
            onChange={handleThanhPhoChange}
            placeholder="Chọn thành phố"
            isClearable
          />
          <div className="flex justify-center">
            <button
              disabled={!danhSachSanBay.TenSanBay || !danhSachSanBay.ThanhPho}
              onClick={handleSubmit}
              className="bg-blue-500 px-4 py-2 mt-4 w-fit h-fit hover:bg-blue-700 text-white font-bold rounded"
            >
              Thêm sân bay
            </button>
            <Link className="px-4 py-4" to={`/airport/list`}>
              <button className="bg-red-500 px-4 py-2 hover:bg-red-700 text-white font-bold rounded">
                <FontAwesomeIcon icon={faXmark} /> Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDanhSachSanBay;
