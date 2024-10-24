import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
// import { use } from "../../../../BE_Traveloki/src/routes/booking/bookingCar-routes";
function Paymentsuccess() {
    return (
        <div className="w-[35%] mx-auto mt-10 p-6 rounded-lg shadow-md">
                <FontAwesomeIcon className="text-[#3abb42] w-[60px] h-[60px]" icon={faCircleCheck}></FontAwesomeIcon>
            <div className="text-left mt-5">
                <h1 className="text-[25px] font-[700] mb-2">Chuyển thành công</h1>
                <p className="text-[20px] font-[700]">tới TRUONG DH KINH TE QUOC DAN</p>
                <p className="text-[20px] mb-4 font-bold">VND 250,000</p>
            </div>
            <div className="text-left">
                <p className="text-[16px] font-[500] text-gray-600 mb-1">Thông tin chi tiết</p>
                <p className="text-[14px] font-medium ">Ngân hàng TMCP Đầu tư và Phát triển Việt Nam</p>
                <p className="text-[14px] font-medium mb-1">2111 0006 6789 89</p>

                <p className="text-[16px] font-[500] text-gray-600 mt-4 mb-1">Lời nhắn</p>
                <p className="text-[14px] font-medium mb-1">IC A1.2 10210769 Pham Anh Thu CT CNQT</p>

                <p className="text-[16px] font-[500] text-gray-600 mt-4 mb-1">Ngày thực hiện</p>
                <p className="text-[14px] font-medium mb-1">10 tháng 1, 2023</p>

                <p className="text-[16px] font-[500] text-gray-600 mt-4 mb-1">Mã giao dịch</p>
                <p className="text-[14px] font-medium mb-4">FT23010622153667</p>
            </div>
            <div className="text-center w-[100%]">
            <Link  to={"/"}>
            <button className="bg-black text-white py-2 px-4 rounded-lg w-[100%] text-[16px] mt-5 pt-4 pb-4 font-[600]">Hoàn thành</button>
            </Link>
            </div>
        </div>
    );
}

export default Paymentsuccess;
