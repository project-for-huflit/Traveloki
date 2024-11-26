import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { createTramDung } from '../../services/api/TramDung/apiCreateTramDung.js';
import { notification } from 'antd';
import { getThanhPho } from '../../services/api/ThanhPho/apiThanhPho.js';
import Select from 'react-select';

const CreateTramDung = () => {
  const [thanhPhoOptions, setThanhPhoOptions] = useState([]);
  const [selectedThanhPho, setSelectedThanhPho] = useState(null);
  const [TenTramDung, setTenTramDung] = useState('');
  const [DiaChi, setDiaChi] = useState('');
  const navigate = useNavigate();
  const parternId = localStorage.getItem('userId');
  console.log(parternId);
  const fetchThanhPho = async () => {
    try {
      const res = await getThanhPho();
      const options = res.map((item) => ({
        value: item.code,
        label: item.name,
      }));
      setThanhPhoOptions(options);
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };

  useEffect(() => {
    fetchThanhPho();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!TenTramDung || !DiaChi || !selectedThanhPho) {
      alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    try {
      const res = await createTramDung(
        parternId,
        selectedThanhPho.label,
        TenTramDung,
        DiaChi,
      );
      if (res && res.EC === 0) {
        notification.success({
          message: 'Thêm trạm dừng',
          description: 'Thêm trạm dừng thành công',
        });
        setTenTramDung('');
        setDiaChi('');
        setSelectedThanhPho(null);
        navigate('/waypoint/list');
      } else {
        notification.error({
          message: 'Thêm trạm dừng',
          description: `Thêm thất bại: ${res.EM}`,
        });
      }
    } catch (error) {
      console.error('Error adding tram dung:', error);
      alert('Đã xảy ra lỗi khi kết nối tới máy chủ');
    }
  };

  return (
    <div className="w-full h-full bg-white p-4">
      <h1 className="text-center text-2xl text-black mb-4">Thêm Trạm Dừng</h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-black mb-2">Thành Phố</label>
          <Select
            options={thanhPhoOptions}
            value={selectedThanhPho}
            onChange={setSelectedThanhPho}
            placeholder="Chọn thành phố"
            isClearable
          />
        </div>

        <div className="mb-4">
          <label className="block text-black mb-2">Tên Trạm Dừng</label>
          <input
            type="text"
            value={TenTramDung}
            onChange={(e) => setTenTramDung(e.target.value)}
            className="w-full bg-slate-100 border-black rounded-lg p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black mb-2">Địa Chỉ</label>
          <input
            type="text"
            value={DiaChi}
            onChange={(e) => setDiaChi(e.target.value)}
            className="w-full bg-slate-100 border-black rounded-lg p-2"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 px-4 h-fit py-2 mt-4 hover:bg-blue-700 text-white font-bold rounded"
          >
            Thêm Trạm Dừng
          </button>
          <Link className="px-4 py-4" to={`/waypoint/list`}>
            <button className="bg-red-500 px-4 py-2 hover:bg-red-700 text-white font-bold rounded">
              <FontAwesomeIcon icon={faXmark} /> Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateTramDung;
