import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { createPhuongTien } from '../../services/api/PhuongTien/createPhuongTien.js';
import { fetchAllSanBay } from '../../services/api/ListSanBay/apiDanhSachSanBay.js';
import Select from 'react-select';
import { notification } from 'antd'; // Import react-select

const CreatePhuongTien = () => {
  const userId = localStorage.getItem('userId');
  console.log(userId);
  const [phuongtien, setPhuongTien] = useState({
    parternId: userId,
    MaSB: '',
    LoaiPT: 'bus',
    TenPhuongTien: '',
    MaSoXe: '',
    SoGheToiDa: '',
    Image: '',
  });

  const parternId = localStorage.getItem('userId');
  console.log(parternId);

  const [sanbays, setSanBays] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSanBay = async () => {
      try {
        const res = await fetchAllSanBay();
        if (res && res.data) {
          setSanBays(res.data);
        } else {
          throw new Error('Không thể lấy dữ liệu từ máy chủ');
        }
      } catch (error) {
        console.log('Lỗi:', error);
      }
    };
    fetchSanBay();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPhuongTien((prevPhuongTien) => ({
      ...prevPhuongTien,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    // Lưu MaSB từ selectedOption (giả sử value chứa ObjectId)
    setPhuongTien((prevPhuongTien) => ({
      ...prevPhuongTien,
      MaSB: selectedOption ? selectedOption.value : '', // Lưu MaSB
    }));
  };

  const handleToggle = (direction) => {
    setPhuongTien((prevPhuongTien) => ({
      ...prevPhuongTien,
      LoaiPT:
        prevPhuongTien.LoaiPT === 'bus'
          ? direction === 'next'
            ? 'train'
            : 'bus'
          : direction === 'next'
            ? 'bus'
            : 'train',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !phuongtien.MaSB ||
      !phuongtien.LoaiPT ||
      !phuongtien.TenPhuongTien ||
      !phuongtien.MaSoXe ||
      !phuongtien.SoGheToiDa ||
      !phuongtien.Image
    ) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    try {
      const res = await createPhuongTien(phuongtien);
      if (res && res.EC === 0) {
        notification.success({
          message: 'Thêm phương tiện',
          description: 'Thêm phương tiện thành công',
        });
        navigate('/vehicle/list');
      } else {
        notification.error({
          message: 'Thêm phương tiện',
          description: `Thêm thất bại: ${res.EM}`,
        });
      }
    } catch (error) {
      console.error('Error caught:', error);
      alert('Đã xảy ra lỗi khi kết nối tới máy chủ');
    }
  };

  const options = sanbays.map((sanbay) => ({
    value: sanbay._id,
    label: `${sanbay.MaSB} - ${sanbay.TenSanBay}`,
  }));

  return (
    <div className="w-full h-full bg-white">
      <h1 className="text-center text-2xl text-black pt-4 font-extrabold">
        Thêm phương tiện
      </h1>
      <div className="pt-4 flex justify-center">
        <div className="w-1/2">
          <label className="text-black pb-4">Mã Sân Bay</label>
          <Select
            options={options}
            onChange={handleSelectChange}
            className="basic-single"
            classNamePrefix="select"
            isClearable={true} // Cho phép xóa lựa chọn
            placeholder="Chọn Mã Sân Bay"
          />

          <label className="text-black pb-4">Loại Phương Tiện</label>
          <div className="flex items-center justify-between bg-slate-100 border-black rounded-lg p-2 mt-2">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="cursor-pointer text-xl"
              onClick={() => handleToggle('prev')}
            />
            <span className="text-black font-bold">
              {phuongtien.LoaiPT === 'bus' ? 'Bus' : 'Train'}
            </span>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="cursor-pointer text-xl"
              onClick={() => handleToggle('next')}
            />
          </div>

          <label className="text-black pb-4">Tên Phương Tiện</label>
          <input
            type="text"
            name="TenPhuongTien"
            value={phuongtien.TenPhuongTien}
            onChange={handleChange}
            className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
          />

          <label className="text-black pb-4">Mã Số Xe</label>
          <input
            type="text"
            name="MaSoXe"
            value={phuongtien.MaSoXe}
            onChange={handleChange}
            className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
          />

          <label className="text-black pb-4">Số Ghế Tối Đa</label>
          <input
            type="text"
            name="SoGheToiDa"
            value={phuongtien.SoGheToiDa}
            onChange={handleChange}
            className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
          />

          <label className="text-black pb-4">Ảnh</label>
          <input
            type="text"
            name="Image"
            value={phuongtien.Image}
            onChange={handleChange}
            className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
          />

          <div className="flex justify-center">
            <button
              disabled={
                !phuongtien.MaSB ||
                !phuongtien.TenPhuongTien ||
                !phuongtien.MaSoXe ||
                !phuongtien.SoGheToiDa ||
                !phuongtien.Image
              }
              onClick={handleSubmit}
              className="bg-blue-500 px-4 py-2 mt-4 w-fit h-fit hover:bg-blue-700 text-white font-bold rounded"
            >
              Thêm phương tiện
            </button>
            <Link className="px-4 py-4" to="/vehicle/list">
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

export default CreatePhuongTien;
