import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function secondLayout() {
  return (
    <div className="bg-[#F2F3F3]">
      <div className="w-full">
          <Header />
          <div className="w-full flex justify-center">
            <div className="w-3/4 h-[65%] min-h-[80vh] relative bg-white rounded-md mt-6">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
    </div>
   );
}

export default secondLayout;
