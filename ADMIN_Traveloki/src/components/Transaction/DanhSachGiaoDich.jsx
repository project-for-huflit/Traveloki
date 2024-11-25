import { useState, useEffect } from 'react';
import { getUser } from '../../services/api/Account/apiGetUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatXeCar from './DatXeCar';
import DatXeBus from './DatXeBus';
import DatXeTrain from './DatXeTau';
import { faBus, faCar, faTrain } from '@fortawesome/free-solid-svg-icons';

const DanhSachGiaoDich = () => {
  const [detailCar, setDetailCar] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState('Car');
  const handleClick = (option) => {
    setSelected(option);
  };
  const fetchDetailCar = async () => {
    try {
      const res = await getUser();
      console.log('API Response:', res);
      setDetailCar(res.data.users);
    } catch (error) {
      setError('Không thể lấy dữ liệu từ máy chủ');
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
    <div className="w-[100%] mt-10 h-[600px]">
      <div className="flex w-full h-fit border mt-6 font-bold justify-center p-4 rounded-lg bg-white">
        <span
          onClick={() => handleClick('Car')}
          className={`cursor-pointer text-2xl px-2 ${
            selected === 'Car'
              ? 'border-b-2 border-[#0094F3] text-[#0094F3]'
              : 'text-gray-500'
          }`}
        >
          <FontAwesomeIcon icon={faCar} /> Car
        </span>
        <span
          onClick={() => handleClick('Bus')}
          className={`mx-9 px-2 text-2xl cursor-pointer ${
            selected === 'Bus'
              ? 'border-b-2 border-[#0094F3] text-[#0094F3]'
              : 'text-gray-500'
          }`}
        >
          <FontAwesomeIcon icon={faBus} /> Shuttle Bus
        </span>
        <span
          onClick={() => handleClick('Train')}
          className={`cursor-pointer text-2xl px-2 ${
            selected === 'Train'
              ? 'border-b-2 border-[#0094F3] text-[#0094F3]'
              : 'text-gray-500'
          }`}
        >
          <FontAwesomeIcon icon={faTrain} /> Airport Train
        </span>
      </div>
      {selected === 'Car' && <DatXeCar />}
      {selected === 'Bus' && <DatXeBus />}
      {selected === 'Train' && <DatXeTrain />}
    </div>
  );
};

export default DanhSachGiaoDich;
