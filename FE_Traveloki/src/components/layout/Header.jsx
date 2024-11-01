import { useEffect, useState } from 'react';

import bird from "../../assets/bird-removebg-preview.png";
import icVN from "../../assets/iconVN.png";
import icPercent from "../../assets/iconPercent.png";
import backgroundImage from "../../assets/introPic.png";
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import DirectToAuthPage from './directToAuthPage'
import ShowProfile from './showProfileMUI';

const Header = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      console.log(user.name);
      // const _user = JSON.parse(user);
      setUser(user.name);
    }
  }, []);
  return (
    <div className="flex justify-center container w-full mb-20">
      <header
        className="fixed top-0 flex left-0 z-50 w-full text-white py-2 border-b border-gray-200"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container max-w-screen-xl translate-x-1/4 flex  items-center">
          <Link to="/home" className="flex">
            <span className="text-2xl font-bold mt-5">Traveloke</span>
            <img src={bird} alt="Traveloki Logo" className="h-16 w-16" />
          </Link>
          <div className="flex items-center">
            <nav className="hidden md:flex space-x-8">
              <a
                  href="#"
                  className="hover:text-gray-300 flex items-center space-x-2"
              >
                <img src={icVN} alt="Vietnam Flag"/>
                <span>VI | VND</span>
              </a>
              <a
                  href="#"
                  className="hover:text-gray-300  flex items-center mr-10"
              >
                Hỗ trợ
              </a>
              <a href="#" className="hover:text-gray-300  flex items-center">
                Hợp tác với chúng tôi
              </a>
              <a
                  href="/user/my-booking"
                  className="hover:text-gray-300  flex items-center"
              >
                Đặt chỗ của tôi
              </a>
              <a
                  href="#"
                  className="hover:text-gray-300 flex items-center space-x-2"
              >
                <img src={icPercent} alt="icon Percent"/>
                <span>Khuyến mãi</span>
              </a>
              {/* <Link
                  to={"/auth/login"}
                  className="hover:text-gray-300 flex items-center space-x-2 border border-white rounded-md p-1 cursor-pointer"
              >
                <FontAwesomeIcon icon={faUser}/>
                <span>Đăng nhập</span>
              </Link>
              <Link
                  to={"/auth/register"}
                  className="hover:text-gray-300 flex items-center space-x-2 border border-white rounded-md p-1 cursor-pointer"
              >
                <FontAwesomeIcon icon={faUser}/>
                <span>Đăng ký</span>
              </Link> */}
              {user ? (<ShowProfile user={user} />) : (<DirectToAuthPage />)}
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
