import LeftNavBar from "../Profile/components/leftNavbar";
import RightContent from "./components/RightContent";

function account() {
  return (
    <div className="">
      {/* <p>Your secret token is: {isToken}</p> */}

      {/* <h1 className="text-2xl font-semibold pl-4">Thông tin cá nhân</h1> */}
      <div className=" flex w-full justify-center h-[700px]">
      <div className="flex w-[1222px] justify-between">
        <LeftNavBar />
        <RightContent />
      </div>
    </div>
    </div>
   );
}

export default account;
