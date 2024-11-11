// import { faL } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slice/authSlice';

function showProfile(user) {
  const dispatch = useDispatch();

  const [showFlyMenus, setShowFlyMenus] = useState(false);

  const handleShowHide = () => {
    setShowFlyMenus((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.relative')) {
      setShowFlyMenus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  const handleLogout = () => {
    dispatch(logout());
    window.location.reload()
  };
  return (
    <div className="relative z-10">
      <button onClick={handleShowHide}>
        <div className="text-white">
          <h2>Welcome, {user.user}!</h2>
        </div>
      </button>

      <div
        className="absolute w-40 h-24 bg-slate-50 rounded-lg"
        style={showFlyMenus ? { display: 'block' } : { display: 'none' }}
      >
        <div className="flex flex-col justify-center items-center px-8 py-4">
          <Link to={'#'}>
            <div className="text-black font-sans font-semibold text-xl mb-2 hover:border-b-2">
              Tài khoản
            </div>
          </Link>
          <button onClick={handleLogout}>
            <div className="text-black font-sans font-semibold text-xl hover:border-b-2">
              Đăng xuất
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default showProfile;
