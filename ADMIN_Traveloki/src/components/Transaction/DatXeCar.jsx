import { useEffect, useState } from 'react';
import axios from 'axios';
function RightContent() {
  const url = `${import.meta.env.VITE_BACKEND_URL}/api`;
  const [lichSuCar, setLichSuCar] = useState([]);
  useEffect(() => {
    const getLichSuDatXe = async () => {
      try {
        const res = await axios.get(`${url}/GetLichSuDatXeOto`);
        console.log('res::', res.data);
        setLichSuCar(res.data.lichSuDatXeOto);
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
    <div className="w-full mt-10 h-[600px] ">
      {lichSuCar && lichSuCar.length > 0 ? (
        lichSuCar.map((item) => (
          <div key={item._id} className="w-full shadow bg-[#EDEDED] rounded-lg">
            <div className="items-center p-4 mt-4">
              <div className="flex my-1">
                <p>Mã đặt chỗ Xe của traveloki</p>
                <p className="ml-1 font-bold ">{item.MaDX}</p>
              </div>
              <hr className="my-4 border-t-2 border-slate-300 w-full" />
              <div className="flex my-1">
                <p>Ngày đặt:</p>
                <p className="ml-1 font-bold ">{item.createdAt}</p>
              </div>
              <div className="flex">
                <div className="bg-blue-900 text-white rounded-full my-1 py-1 px-4">
                  Thanh toán
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
