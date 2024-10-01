import { Outlet} from "react-router-dom";
import SideNav from "./components/layout/SideNav.jsx";
import Box from '@mui/material/Box';
import Header from "./components/layout/Header.jsx";

const App = () => {
  // const [showNav, setShowNav] = React.useState(true);
  //
  // React.useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 640) {
  //       setShowNav(false);
  //     } else {
  //       setShowNav(true);
  //     }
  //   };
  //
  //   window.addEventListener("resize", handleResize);
  //   handleResize();
  //
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    // <div className="h-full w-full">
    //   <Header setShowNav={setShowNav} />
    //   <div className="flex">
    //     {showNav && <SideNav />}
    //     <div className="flex-1">
    //       <Outlet />
    //     </div>
    //   </div>
    //
    //   {!showNav && (
    //     <button
    //       className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg sm:hidden"
    //       onClick={() => setShowNav(true)}
    //     >
    //       Mở SideNav
    //     </button>
    //   )}
    // </div>
    <>
      <Header/>
      <Box height={30}/>
      <Box sx={{ display: 'flex' }}>
        <SideNav />
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
          <Outlet/>
        </Box>
      </Box>
    </>
  );
};

export default App;
