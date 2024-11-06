import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header2";
import Footer from "../components/layout/Footer";

function secondLayout() {
  return (
    <div className="bg-[#F2F3F3]">
      <div className="w-full">
          <Header />
          <div className="w-full flex justify-center bg-white pb-8">
            <div className="w-3/4 h-[65%] min-h-[80vh] relative  rounded-md mt-6">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
    </div>
   );
}

export default secondLayout;
