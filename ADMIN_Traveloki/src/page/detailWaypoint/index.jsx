import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import {useEffect, useState} from "react";
import {getThanhPho} from "../../services/api/ThanhPho/apiThanhPho.js";
import {updateTramDung} from "../../services/api/TramDung/apiUpdateTramDung.js";
import {notification} from "antd";

function ChiTietTramDung() {
  const [thanhPhoOptions, setThanhPhoOptions] = useState([]);
  const [selectedThanhPho, setSelectedThanhPho] = useState(null);
  const [TenTramDung, setTenTramDung] = useState("");
  const [DiaChi, setDiaChi] = useState("");
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

  const selectedRow = useSelector((store) => store.vehicle.selectedRow);

  if (!selectedRow) {
    return (
      <div className="mt-20 font-semibold text-2xl">
        Không tìm thấy dữ liệu phương tiện.
      </div>
    );
  }

  const handleUpdateVehicle = async () => {
    try {
      const res = await updateTramDung(selectedRow._id, selectedThanhPho.label, TenTramDung, DiaChi);
      if (res && res.EC === 0) {
        notification.success({
          message: "Cập nhật trạm dừng",
          description: "Cập nhật trạm dừng thành công",
        });
        navigate("/waypoint/list");
      } else {
        notification.error({
          message: "Cập nhật trạm dừng",
          description: `Cập nhật trạm dừng thất bại: ${res.EM}`,
        });
      }
    }catch (e) {
      console.error("Error updating vehicle:", e);
      alert("Đã xảy ra lỗi khi kết nối tới máy chủ");
    }
  };
  return (
    <div className="w-full flex justify-center items-start mt-6">
      {/* Center */}
      <div className="w-[1222px]">
        <div className="w-full px-[42px] py-[41px] border-[#dee0e2] border-[1px] rounded-2xl justify-center items-center flex mt-12">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full">
              <div className="text-[#212121] text-[32px] font-semibold font-['Roboto'] leading-normal mb-4">
                Thông tin chi tiết trạm dừng
              </div>
              <div className="">
                <form>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="mb-2 text-gray-700">
                        Tên trạm dừng
                      </label>
                      <input
                        placeholder={`${selectedRow.TenTramDung}`}
                        type="text"
                        className="p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setTenTramDung(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-2 text-gray-700">
                        Địa chỉ
                      </label>
                      <input
                        placeholder={`${selectedRow.DiaChi}`}
                        type="text"
                        className="p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setDiaChi(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-2 text-gray-700">
                        Thành phố
                      </label>
                      <Select
                        options={thanhPhoOptions}
                        placeholder={`${selectedRow.ThanhPho}`}
                        onChange={setSelectedThanhPho}
                        value={selectedThanhPho}
                        type="text"
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleUpdateVehicle}
                  className="rounded-2xl py-2 bg-[#1976D2] hover:bg-[#3381cf] w-full text-white text-2xl font-bold font-['Roboto'] leading-normal"
                >
                  Cập nhật thông tin
                </button>
              </div>
            </div>
            {/* <AdminPanel /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChiTietTramDung;
