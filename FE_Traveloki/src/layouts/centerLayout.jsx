import { Outlet } from "react-router-dom";
const SecondLayout = () => {
  return (
    <div className="w-full h-screen bg-opacity-20 flex justify-center bg-slate-400">
          <div className="w-full h-screen relative bg-white rounded-md">
            <Outlet />
          </div>
    </div>
  );
};

export default SecondLayout;
