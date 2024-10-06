import { Link, useNavigate  } from "react-router-dom";
import logoTravelokiWhite from "../../assets/logoTravelokiWhite.png";
import icVN from "../../assets/iconVN.png";
import icPercent from "../../assets/iconPercent.png";
import backgroundImage from "../../assets/introPic.png";
import icUser from "../../assets/iconUser.png";

const Header2 = () => {
    // const handleButtonClickMyBooking = () => {
    //   window.location.href = '/my-booking'; // URL của trang my booking
    // };

  const history = useNavigate ();
  const navigateToLoginPage = () => history('/auth/login');
  const navigateToRegisterPage = () => history('/auth/register');

  return (
    <header
      className="mx-auto text-white py-2 border-b border-gray-200"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container max-w-screen-xl mx-auto flex justify-between items-center">
        <Link to="/">
          <div className="flex items-center">
            <img
              src={logoTravelokiWhite}
              alt="Traveloki Logo"
              className="h-8"
            />
          </div>
        </Link>
        <div className="flex items-center">
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="hover:text-gray-300 flex items-center space-x-2"
            >
              <img src={icVN} alt="Vietnam Flag" />
              <span>VI | VND</span>
            </a>
            <a
              href="#"
              className="hover:text-gray-300 flex items-center space-x-2"
            >
              <img src={icPercent} alt="icon Percent" />
              <span>Khuyến mãi</span>
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
            <a href="/user/my-booking" className="hover:text-gray-300  flex items-center">
              Đặt chỗ của tôi
            </a>
            <div className="flex space-x-4">
              <button
              onClick={navigateToLoginPage}
              type="button"
              className="border border-white text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200 flex items-center">
                <img src={icUser} alt="icon User" className="mr-2" />
                Đăng nhập
              </button>
              <button
              onClick={navigateToRegisterPage}
              type="button"
              className="border border-white text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200">
                Đăng ký
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header2
