import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-datepicker/dist/react-datepicker.css';
import debounce from 'lodash/debounce';
import {
  getSanBaybyTenSanBay,
  getTuyenDiemSanBay,
  suggestsAirportAPI,
  suggestsTramDungAPI,
  tramDungByDiaChi,
} from '../../services/api/search/api.search';

import icFlight from '../../assets/iconFlight.png';
import icLocation from '../../assets/iconLocation.png';
import icCalender from '../../assets/iconCalender.png';
import icClock from '../../assets/iconClock.png';
import icSearch from '../../assets/iconSearch.png';
import icRotate from '../../assets/iconRotate.png';
import backgroundImage from '../../assets/introPic.png';
import brand1 from '../../assets/Brand1.png';
import brand2 from '../../assets/Brand2.png';
import brand3 from '../../assets/Brand3.png';

const SearchBar = () => {
  const [diemSanBay, setDiemKhoiHanh] = useState('');
  const [diemKetThuc, setDiemKetThuc] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  // Date
  const [selectedDate, setSelectedDate] = useState('');

  const [suggestions, setSuggestions] = useState({
    sanBays: [],
    tramDungs: [],
  });
  const [showAirportSuggestions, setShowAirportSuggestions] = useState(false);
  const [showTramDungSuggestions, setShowTramDungSuggestions] = useState(false);
  const [error, setError] = useState(null);
  const today = new Date().toISOString().split('T')[0];

  const navigate = useNavigate();

  const fetchAirportSuggestions = async (query) => {
    try {
      const response = await suggestsAirportAPI(query);
      setSuggestions((prevSuggestions) => ({
        ...prevSuggestions,
        sanBays: response.data.sanBays,
      }));
    } catch (err) {
      setError('Lỗi khi lấy gợi ý sân bay: ' + err.message);
    }
  };

  //click vào hiển thị dropdown
  const handleInputClick = () => {
    setShowAirportSuggestions(true);
    debouncedFetchAirportSuggestions(diemSanBay); // Hiển thị toàn bộ danh sách sân bay khi nhấp vào ô chọn
  };

  const fetchTramDungSuggestions = async (query) => {
    try {
      const response = await suggestsTramDungAPI(query);
      setSuggestions((prevSuggestions) => ({
        ...prevSuggestions,
        tramDungs: response.data.tramDungs,
      }));
    } catch (err) {
      setError('Lỗi khi lấy gợi ý trạm dừng: ' + err.message);
    }
  };

  const debouncedFetchAirportSuggestions = debounce(
    fetchAirportSuggestions,
    300
  );
  const debouncedFetchTramDungSuggestions = debounce(
    fetchTramDungSuggestions,
    300
  );

  const handleAirportSuggestionClick = (suggestion) => {
    setDiemKhoiHanh(suggestion);
    setShowAirportSuggestions(false);
  };

  const handleTramDungSuggestionClick = (suggestion) => {
    setDiemKetThuc(suggestion);
    setShowTramDungSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest('.suggestion-container-airport') &&
        !event.target.closest('.suggestion-container-tram')
      ) {
        setShowAirportSuggestions(false);
        setShowTramDungSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAirportInputFocus = () => {
    setShowAirportSuggestions(true);
  };

  const handleTramDungInputFocus = () => {
    setShowTramDungSuggestions(true);
  };

  const handleSubmit = async () => {
    if (!diemSanBay || !diemKetThuc || !selectedDate || !selectedHour) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toISOString().split('T')[1].split('.')[0];

    if (
      selectedDate < currentDate ||
      (selectedDate === currentDate && selectedHour <= currentTime)
    ) {
      alert('Vui lòng chọn ngày và giờ lớn hơn hiện tại');
      return;
    }

    try {
      const tramDungResponse = await tramDungByDiaChi(diemKetThuc);
      const tramDungs = tramDungResponse.data.tramDungs || [];

      if (tramDungs.length === 0) {
        alert('Không tìm thấy trạm dừng phù hợp');
        return;
      }

      const sanBayResponse = await getSanBaybyTenSanBay(diemSanBay);
      const sanBay = sanBayResponse.data.sanbays[0];

      if (!sanBay) {
        alert('Không tìm thấy sân bay phù hợp');
        return;
      }

      const maSanBay = sanBay.MaSB;

      const tuyenResponse = await getTuyenDiemSanBay(maSanBay);
      const tuyens = tuyenResponse.data.tuyens || [];
      if (!tuyens.length) {
        alert('Không tìm thấy tuyến xe từ sân bay này');
        return;
      }

      const tuyen = tuyens[0];
      if (tuyen.DiemSanBay !== maSanBay) {
        alert('Chưa có tuyến từ sân bay này đến trạm dừng');
        return;
      }

      const maTuyen = tuyen.MaTuyen;
      const tramDung = tramDungs.find((tram) => tram.MaTuyen === maTuyen);

      if (!tramDung) {
        alert('Chưa có tuyến xe từ sân bay này đến trạm dừng');
        return;
      } else {
        const IDTramS = tramDung._id;
        navigate(
          `/ListMain?SanBay=${encodeURIComponent(
            diemSanBay
          )}&Date=${encodeURIComponent(selectedDate)}&Time=${encodeURIComponent(
            selectedHour
          )}&IDTram=${IDTramS}&MaSB=${maSanBay}`
        );
      }
    } catch (err) {
      console.error(
        'Error fetching tram data:',
        err.response ? err.response.data : err.message
      );
      setError(
        'Lỗi khi lấy trạm dừng: ' +
          (err.response ? err.response.data.message : err.message)
      );
    }
  };

  return (
    <div
      className="h-auto bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div>
        <h1 className="text-white text-4xl text-center pt-28 pb-16">
          Từ Đông Nam Á Đến Thế Giới Trong Tầm Tay Bạn
        </h1>
      </div>
      <div className="container mx-auto pt-12 pb-52 flex flex-col justify-center">
        <div className="flex justify-center">
          <div className="inline-flex relative">
            {/* From Airport */}
            <div
              className="flex flex-col items-start py-2 max-w-md relative"
              // ref={containerRef}
            >
              <label className="text-white flex items-center space-x-2">
                <span>Từ sân bay</span>
              </label>
              <div className="flex items-center bg-white shadow rounded-l-lg mt-3 w-full">
                <img src={icFlight} alt="icon-flight" className="h-6 w-6 m-3" />
                <input
                  className="bg-transparent outline-none mx-2 w-64 "
                  type="text"
                  // placeholder="Ví dụ sân bay quốc tế Narita"
                  // value={selectedAirport}
                  // onClick={handleInputClick}
                  // onChange={handleInputChange}
                  value={diemSanBay}
                  onChange={(e) => {
                    setDiemKhoiHanh(e.target.value);
                    debouncedFetchAirportSuggestions(e.target.value);
                    setShowAirportSuggestions(true);
                  }}
                  onClick={handleInputClick}
                  placeholder="Sân bay khởi hành"
                  onFocus={handleAirportInputFocus}
                />
              </div>
              {/** @LOQ-burh
              * region showAirportSuggestions
               */}
              {showAirportSuggestions && (
                <ul className="w-[296px] max-w-[296px] p-2 top-[5rem] bg-gray-100 z-0 h-fit min-h-2.5 absolute overflow-auto mt-6 rounded-lg">
                  {/* {suggestions.sanBays.length > 0 ? (

                  ) : (
                    <li className=" hover:bg-blue-100 p-2 border-b-gray-400 border-0 border-b-[1px] w-full">
                    Không tìm thấy sân bay nào
                    </li>
                  )} */
                    suggestions.sanBays.map((sanBay, index) => (
                    <li
                      className=" hover:bg-blue-100 p-2 rounded-md border-b-gray-400 border-0 border-b-2 "
                      key={index}
                      onClick={() => handleAirportSuggestionClick(sanBay)}
                    >
                      {sanBay}
                    </li>
                  ))
                  }

                </ul>
              )}
            </div>

            {/* Icon rotate */}
            <div className="absolute z-20 left-[47.5%]">
              <img
                src={icRotate}
                alt="icon-rotate"
                className=" h-8 w-8 mt-[3.2rem]"
              />
            </div>

            {/* Arrived Locate */}
            <div
              className="flex flex-col items-start py-2 relative"
              // ref={containerRefTD}
            >
              <label className="text-white flex items-center space-x-2">
                <span>Đến khu vực địa chỉ tòa nhà</span>
              </label>
              <div className="flex items-center bg-white shadow mt-3 ">
                <img
                  src={icLocation}
                  alt="icon-flight"
                  className="h-6 w-6 my-3 mr-3 ml-5"
                />
                <input
                  className="bg-transparent outline-none mx-2 w-64"
                  type="text"
                  value={diemKetThuc}
                  onChange={(e) => {
                    setDiemKetThuc(e.target.value);
                    debouncedFetchTramDungSuggestions(e.target.value);
                    setShowTramDungSuggestions(true);
                  }}
                  placeholder="Đến khu vực địa chỉ tòa nhà"
                  onFocus={handleTramDungInputFocus}
                />
              </div>
              {showTramDungSuggestions && (
                <ul className="w-[304px] max-w-[304px] p-2 top-[5rem] bg-gray-100 z-0 h-fit min:h-1/4 absolute overflow-auto mt-6 rounded-lg">
                  {/* {suggestions.tramDungs.length > 0 ? (

                  ) : (
                    <li className=" hover:bg-blue-100 p-2 border-b-gray-400 border-0 border-b-[1px] w-full">
                    Không tìm thấy trạm dừng nào
                    </li>
                  )} */
                    suggestions.tramDungs.map((suggestion, index) => (
                    <li
                      className=" hover:bg-blue-100 p-2 rounded-md border-b-gray-400 border-0 border-b-2 "
                      key={index}
                      onClick={() => handleTramDungSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))
                  }

                </ul>
              )}
            </div>
          </div>

          {/* Pick-up Date */}
          <div className="flex flex-col items-start py-2 relative">
            <label className="text-white flex items-center space-x-2">
              <span>Ngày khởi hành</span>
            </label>
            <div className="flex items-center bg-white shadow  mt-3">
              <img src={icCalender} alt="icon-flight" className="h-6 w-6 m-3" />
              {/* <input
              type="text"
              className="bg-transparent outline-none mx-2 w-52"
            /> */}
              <DatePicker
                minDate={today}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                selected={selectedDate}
                onChange={(e) => setSelectedDate(e)} // .target.value
              />
            </div>
          </div>
          {/* Pick-up Time + Button */}
          <div
            className="flex flex-col items-start py-2 relative"
            // ref={containerRefTime}
          >
            <label className="text-white flex items-center space-x-2">
              <span>Giờ khởi hành</span>
            </label>
            <div className="inline-flex">
              <div
                className="flex items-center w-[12rem] bg-white shadow  mt-3"
                // onClick={() => setShowDropdownTime(!showDropdownTime)}
              >
                <img src={icClock} alt="icon-flight" className="h-6 w-6 m-3" />
                <input
                  type="time"
                  placeholder="Giờ"
                  className="bg-transparent outline-none mx-2 text-center"
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(e.target.value)}
                />
              </div>
              {/* Search Button */}
              <div className="text-white flex items-center mt-3">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-900 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-200"
                >
                  <img
                    src={icSearch}
                    alt="icon-search"
                    className="h-6 w-6 m-1"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted by */}
        <div className="flex items-center justify-center mt-10 pb-24 text-center">
          <label className="text-white flex items-center space-x-2 px-2">
            <span>Trusted by</span>
          </label>
          <img src={brand1} alt="brand1" className="h-10 w-10 m-1" />
          <img src={brand2} alt="brand2" className="h-10 w-10 m-1" />
          <img src={brand3} alt="brand3" className="h-10 w-16 m-1" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
