import { useEffect, useState } from 'react';
import axios from 'axios';

// Hàm định dạng ngày giờ
const formatDate = (dateString) => {
  const dateObject = new Date(dateString);

  // Lấy các phần của ngày
  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = dateObject.getFullYear();
  const hours = String(dateObject.getHours()).padStart(2, '0');
  const minutes = String(dateObject.getMinutes()).padStart(2, '0');
  const seconds = String(dateObject.getSeconds()).padStart(2, '0');

  // Định dạng ngày theo "dd/MM/yyyy HH:mm:ss"
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

function RightContent() {
  const url = `${import.meta.env.VITE_BACKEND_URL}/api`;
  const [lichSuTrain, setLichSuTrain] = useState([]);

  //get ls xe
  useEffect(() => {
    const getLichSuDatXe = async () => {
      try {
        const res = await axios.get(`${url}/GetLichSuDatTau`);
        console.log(res.data);
        setLichSuTrain(res.data.lichSuDatTau);
      } catch (error) {
        console.error(
          'Request failed with status code',
          error.response?.status,
        );
      }
    };
    getLichSuDatXe();
  }, []);

  return (
    <div className="w-full mt-10 h-[600px]">
      {lichSuTrain && lichSuTrain.length > 0 ? (
        lichSuTrain.map((item) => (
          <div key={item._id} className="w-full shadow bg-[#EDEDED] rounded-lg">
            <div className="items-center p-4 mt-4">
              <div className="flex my-1">
                <p>Mã đặt chỗ Xe của traveloki</p>
                <p className="ml-1 font-bold ">{item.MaDX}</p>
              </div>
              <hr className="my-4 border-t-2 border-slate-300 w-full" />
              <div className="flex my-1">
                <p>Ngày đặt:</p>
                <p className="ml-1 font-bold ">{formatDate(item.Date)}</p>
              </div>
              <div className="flex">
                <div className="bg-blue-900 text-white rounded-full my-1 py-1 px-4">
                  Trạng thái thanh toán
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="mt-20 font-semibold text-2xl">
          Không tìm thấy dữ liệu phương tiện.
        </div>
      )}
    </div>
  );
}

export default RightContent;
