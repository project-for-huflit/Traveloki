import { NavLink } from 'react-router-dom';
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
import { useAppStore } from '../../appStore.jsx';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
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
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
// const users = JSON.parse(localStorage.getItem('user'));
// const roles = users.roles[0];

const SideNav = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('user'));
    const roles = users?.roles?.[0];
    if (roles === 'ADMIN') {
      setIsAdmin(true);
    }
  }, []);
  const theme = useTheme();
  const open = useAppStore((state) => state.dopen);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box height={30} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* Danh sách phương tiện công cộng */}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <NavLink
              to="/vehicle/list"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-500 bg-gray-200'
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
                    mr: open ? 3 : 'auto',
                  }}
                >
                  <EmojiTransportationIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Danh sách phương tiện công cộng"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>

          {/* Danh sách trạm dừng */}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <NavLink
              to="/waypoint/list"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-500 bg-gray-200'
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
                    mr: open ? 3 : 'auto',
                  }}
                >
                  <AddLocationIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Danh sách trạm dừng"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>

          {/* Danh sách tuyến xe */}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <NavLink
              to="/road/list"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-500 bg-gray-200'
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
                    mr: open ? 3 : 'auto',
                  }}
                >
                  <AltRouteIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Danh sách tuyến xe"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>

          {/* Lịch chạy */}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <NavLink
              to="/schedule/list"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-500 bg-gray-200'
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
                    mr: open ? 3 : 'auto',
                  }}
                >
                  <ScheduleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Lịch chạy"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
          {/* Danh sách sân bay */}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <NavLink
              to="/airport/list"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-500 bg-gray-200'
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
                    mr: open ? 3 : 'auto',
                  }}
                >
                  <LocalAirportIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Danh sách sân bay"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
          {isAdmin && (
            <>
              {/* Danh sách Xe */}
              <ListItem disablePadding sx={{ display: 'block' }}>
                <NavLink
                  to="/detail-car/list"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-blue-500 bg-gray-200'
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
                        mr: open ? 3 : 'auto',
                      }}
                    >
                      <DirectionsCarIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Danh sách Xe"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </NavLink>
              </ListItem>

              {/* Danh sách giao dịch */}
              <ListItem disablePadding sx={{ display: 'block' }}>
                <NavLink
                  to="/transaction/list"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-blue-500 bg-gray-200'
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
                        mr: open ? 3 : 'auto',
                      }}
                    >
                      <FontAwesomeIcon icon={faCoins} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Danh sách giao dịch"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </NavLink>
              </ListItem>

              {/* Dashboard */}
              <ListItem disablePadding sx={{ display: 'block' }}>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-blue-500 bg-gray-200'
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
                        mr: open ? 3 : 'auto',
                      }}
                    >
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Dashboard"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </NavLink>
              </ListItem>
              {/* Tài khoản */}
              <ListItem disablePadding sx={{ display: 'block' }}>
                <NavLink
                  to="/account/list"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-blue-500 bg-gray-200'
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
                        mr: open ? 3 : 'auto',
                      }}
                    >
                      <FontAwesomeIcon icon={faUser} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Tài khoản"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideNav;
