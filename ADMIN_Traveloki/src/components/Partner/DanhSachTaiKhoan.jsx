import { useState, useEffect } from "react";
import {getUser} from "../../services/api/Account/apiGetUser";

const DanhSachTaiKhoan = () => {
  const [detailCar, setDetailCar] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDetailCar = async () => {
    try {
      const res = await getUser()
      console.log("API Response:", res); 
      setDetailCar(res.data.users); 
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailCar();
  }, []);

  if (isLoading)
    return (
      <div className="text-center text-4xl translate-y-1/2 h-full font-extrabold">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-4xl translate-y-1/2 h-full font-extrabold">
        Error: {error}
      </div>
    );

  return (
    <div className="w-auto mt-[24px] h-full bg-white">
      <div className="flex w-auto">
        <h1 className="text-black w-1/2 p-4 text-4xl">Danh sách khách hàng</h1>
        <div className="flex w-1/2 mr-2 justify-end">
        </div>
      </div>
      <div className="p-2">
        <table className="w-full">
          <thead>
            <tr className="bg-green-400">
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Tên Khách hàng</th>
              <th className="border px-4 py-2">Roles</th>
              <th className="border px-4 py-2">Trang thái</th>
            </tr>
          </thead>
          <tbody>
            {detailCar.length > 0
              ? detailCar.map((detail) => (
                  <tr key={detail._id} className="text-black">
                    <td className="border px-4 py-2">{detail.email}</td>
                    <td className="border px-4 py-2">
                      {detail.name}
                    </td>
                    <td className="border px-4 py-2">{detail.roles}</td>
                    <td className="border px-4 py-2">{detail.status}</td>
                  </tr>
                ))
              : !isLoading && (
                  <tr>
                    <td colSpan="6" className="text-center p-4">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DanhSachTaiKhoan;

