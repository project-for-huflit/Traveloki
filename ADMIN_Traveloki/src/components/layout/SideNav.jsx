import {useNavigate, NavLink} from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useAppStore} from "../../appStore.jsx";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const SideNav = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  //const [open, setOpen] = useState(false);
  const open = useAppStore((state) => state.dopen);

  return (
    // <div className="bg-custom-gradient w-1/4 p-0 m-0 min-h-screen">
    //   <h1 className="font-extrabold text-white text-center pt-4">
    //     DANH MỤC QUẢN LÝ
    //   </h1>
    //   <div className="p-4">
    //     <ul>
    //       <li>
    //         <a
    //           href="/DashBoard"
    //           className="route text-white text-xl font-extrabold hover:text-black"
    //         >
    //           <FontAwesomeIcon icon={faChartLine} /> DashBoard
    //         </a>
    //       </li>
    //       <li className="pt-6">
    //         <a
    //           href="/DanhSachSanBay"
    //           className="route text-white text-xl font-extrabold hover:text-black"
    //         >
    //           <FontAwesomeIcon icon={faPlane} /> Danh sách sân bay
    //         </a>
    //       </li>
    //       <li className="pt-6">
    //         <a
    //           href="/DanhSachTuyenXe"
    //           className="route text-white text-xl font-extrabold hover:text-black"
    //         >
    //           <FontAwesomeIcon icon={faRoute} /> Danh sách tuyến xe
    //         </a>
    //       </li>
    //       <li className="pt-6">
    //         <a
    //           href="/PhuongTien"
    //           className="route text-white text-xl font-extrabold hover:text-black"
    //         >
    //           <FontAwesomeIcon icon={faBus} /> Danh sách phương tiện
    //         </a>
    //       </li>
    //       <li className="pt-6">
    //         <a
    //           href="/DanhSachTramDung"
    //           className="route text-white text-xl font-extrabold hover:text-black"
    //         >
    //           <FontAwesomeIcon icon={faMapLocationDot} /> Danh sách Trạm Dừng
    //         </a>
    //       </li>
    //       <li className="pt-6">
    //         <a
    //           href="/ListDetailCar"
    //           className="route text-white text-xl font-extrabold hover:text-black"
    //         >
    //           <FontAwesomeIcon icon={faCar} /> Danh sách Chi Tiết Xe
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box height={30}/>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem  disablePadding sx={{ display: 'block' }}>
            <NavLink
              to="/DashBoard"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-500 bg-gray-200' // Màu khi active
                  : 'text-gray-700 hover:bg-gray-100'
              }
            >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  mr: open ? 3 : "auto",
                }}
              >
                <DashboardIcon/>
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem  disablePadding sx={{ display: 'block' }}>
            <NavLink
              to="/DanhSachSanBay"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-500 bg-gray-200' // Màu khi active
                  : 'text-gray-700 hover:bg-gray-100'
              }
            >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  mr: open ? 3 : "auto",
                }}
              >
                <LocalAirportIcon />
              </ListItemIcon>
              <ListItemText primary="Danh sách sân bay" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem  disablePadding sx={{ display: 'block' }} >
            <NavLink
              to="/DanhSachTuyenXe"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-500 bg-gray-200' // Màu khi active
                  : 'text-gray-700 hover:bg-gray-100'
              }
            >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  mr: open ? 3 : "auto",
                }}
              >
                <AltRouteIcon />
              </ListItemIcon>
              <ListItemText primary="Danh sách tuyến xe" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem  disablePadding sx={{ display: 'block' }}>
            <NavLink
              to="/PhuongTien"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-500 bg-gray-200' // Màu khi active
                  : 'text-gray-700 hover:bg-gray-100'
              }
            >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  mr: open ? 3 : "auto",
                }}
              >
                <EmojiTransportationIcon />
              </ListItemIcon>
              <ListItemText primary="Danh sách phương tiện" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem  disablePadding sx={{ display: 'block' }}>
            <NavLink
              to="/DanhSachTramDung"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-500 bg-gray-200' // Màu khi active
                  : 'text-gray-700 hover:bg-gray-100'
              }
            >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  mr: open ? 3 : "auto",
                }}
              >
                <AddLocationIcon />
              </ListItemIcon>
              <ListItemText primary="Danh sách Trạm Dừng" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem  disablePadding sx={{ display: 'block' }}>
            <NavLink
              to="/ListDetailCar"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-500 bg-gray-200' // Màu khi active
                  : 'text-gray-700 hover:bg-gray-100'
              }
            >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  mr: open ? 3 : "auto",
                }}
              >
                <DirectionsCarIcon />
              </ListItemIcon>
              <ListItemText primary="Danh sách Chi Tiết Xe" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            </NavLink>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default SideNav;
