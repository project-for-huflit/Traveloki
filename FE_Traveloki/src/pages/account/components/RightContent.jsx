import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faBus } from '@fortawesome/free-solid-svg-icons';
// import DatXeCar from "./DatXeCar";
// import DatXeBus from "./DatXeBus";
// import DatXeTrain from "./DatXeTau";
// import Profile from './profile';
// import MethodPayment from './methodPayment';
const RightContent = () => {

  // const ListInput =
  return (
    <div className="w-[70%] h-[600px] overflow-y-auto">
      <div className="flex w-full h-fit border mt-4 font-bold justify-center p-4 rounded-lg bg-white">
        <span
          className={`cursor-pointer text-2xl px-2 border-b-2 border-[#0094F3] text-[#0094F3]`}
        >
          <FontAwesomeIcon icon={faCar} /> Thông tin cá nhân
        </span>
      </div>


    </div>
  );
};

export default RightContent;
