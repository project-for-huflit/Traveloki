import { Outlet } from "react-router-dom";
import Header2 from "../components/layout/Header2";
import Footer from "../components/layout/Footer";
const MainLayout = () => {
  return (
    <div className="bg-[#F2F3F3]">
      <Header2 />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
