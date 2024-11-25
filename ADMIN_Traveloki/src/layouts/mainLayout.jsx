import { Outlet } from 'react-router-dom';
import SideNav from './components/layout/SideNav.jsx';
import Box from '@mui/material/Box';
import Header from './components/layout/Header.jsx';
import { useNavigate } from 'react-router-dom';

function mainLayout() {
  
  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default mainLayout;
