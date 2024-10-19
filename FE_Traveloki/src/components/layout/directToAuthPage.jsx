import icUser from "../../assets/iconUser.png";
import { useNavigate  } from "react-router-dom";
function directToAuthPage() {
  const history = useNavigate ();
  const navigateToLoginPage = () => history('/auth/login');
  const navigateToRegisterPage = () => history('/auth/register');

  return (
    <div className="flex space-x-4">
      <button
        onClick={navigateToLoginPage}
        type="button"
        className="border border-white text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200 flex items-center"
      >
        <img src={icUser} alt="icon User" className="mr-2" />
        Đăng nhập
      </button>
      <button
        onClick={navigateToRegisterPage}
        type="button"
        className="border border-white text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
      >
        Đăng ký
      </button>
    </div>
  );
}

export default directToAuthPage;
