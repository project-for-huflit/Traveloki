import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faBus } from '@fortawesome/free-solid-svg-icons';
// import DatXeCar from "./DatXeCar";
// import DatXeBus from "./DatXeBus";
// import DatXeTrain from "./DatXeTau";
import Profile from './profile';
import MethodPayment from './methodPayment';
const RightContent = () => {
  const [selected, setSelected] = useState('profile');
  const handleClick = (option) => {
    setSelected(option);
  };

  console.log('selected::', selected)
  const result = (selected === 'profile') ? (<Profile />) : (<MethodPayment />)
  return (
    <div className="w-[70%] h-[600px] overflow-y-auto">
      <div className="flex w-full h-fit border mt-4 font-bold justify-center p-4 rounded-lg bg-white">
        <span
          onClick={() => handleClick('profile')}
          className={`cursor-pointer text-2xl px-2 ${
            selected === 'profile'
              ? 'border-b-2 border-[#0094F3] text-[#0094F3]'
              : 'text-gray-500'
          }`}
        >
          <FontAwesomeIcon icon={faCar} /> Thông tin cá nhân
        </span>
        <span
          onClick={() => handleClick('methodPayment')}
          className={`mx-9 px-2 text-2xl cursor-pointer ${
            selected === 'methodPayment'
              ? 'border-b-2 border-[#0094F3] text-[#0094F3]'
              : 'text-gray-500'
          }`}
        >
          <FontAwesomeIcon icon={faBus} /> Phương thức thanh toán
        </span>
      </div>

      <div className="mt-4">
        {result}
      </div>
    </div>
  );
};

export default RightContent;
