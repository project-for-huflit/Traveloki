import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faBus, faTrain } from "@fortawesome/free-solid-svg-icons";
// import DatXeCar from "./DatXeCar";
// import DatXeBus from "./DatXeBus";
// import DatXeTrain from "./DatXeTau";

const RightContent = () => {
  const [selected, setSelected] = useState("Car");
  const handleClick = (option) => {
    setSelected(option);
  };

  return (
    <div className="w-[70%] mt-10 h-[600px] overflow-y-auto">
      <div className="flex w-full h-fit border mt-6 font-bold justify-center p-4 rounded-lg bg-white">
        <span
          onClick={() => handleClick("Car")}
          className={`cursor-pointer text-2xl px-2 ${
            selected === "Car"
              ? "border-b-2 border-[#0094F3] text-[#0094F3]"
              : "text-gray-500"
          }`}
        >
          <FontAwesomeIcon icon={faCar} /> Car
        </span>
        <span
          onClick={() => handleClick("Bus")}
          className={`mx-9 px-2 text-2xl cursor-pointer ${
            selected === "Bus"
              ? "border-b-2 border-[#0094F3] text-[#0094F3]"
              : "text-gray-500"
          }`}
        >
          <FontAwesomeIcon icon={faBus} /> Shuttle Bus
        </span>
        <span
          onClick={() => handleClick("Train")}
          className={`cursor-pointer text-2xl px-2 ${
            selected === "Train"
              ? "border-b-2 border-[#0094F3] text-[#0094F3]"
              : "text-gray-500"
          }`}
        >
          <FontAwesomeIcon icon={faTrain} /> Airport Train
        </span>

        <div className="mt-4">
        <div id="Avatar" className="grid grid-cols-[1fr_80px] lg:grid-cols-[1fr_80px] border-b-[1px] py-6 " </div>

        {/* <div className="flex flex-col lg:grid lg:grid-cols-[200px_1fr]">
        <p className="text-gray-900 font-bold text-lg">Avatar Profile</p>
        <p >Avatar create unique for your account</p>
        </div>
        
        <div role="presentation" tabindex="0" className="lg:w-fit flex justify-center items-center">
        {/* <input multiple="" tabindex="-1" type="file" style="border: 0px; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; margin: 0px -1px -1px 0px; overflow: hidden; padding: 0px; position: absolute; width: 1px; white-space: nowrap;"/> */}
        </div>
        </div> */}
      </div>
      {/* {selected === "Car" && <DatXeCar />}
      {selected === "Bus" && <DatXeBus />}
      {selected === "Train" && <DatXeTrain />} */}
    </div>
  );
};

export default RightContent;
