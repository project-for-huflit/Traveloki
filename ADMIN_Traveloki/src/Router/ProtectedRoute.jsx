import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({children}) => {
//     const user = useSelector((state) => state.user);
//     let location = useLocation();

//     if(!user.state.isAuthenticated) {
//         return <Navigate to="/auth/login" state={{ from: location}} replace />
//     }
//  return children

// };

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
