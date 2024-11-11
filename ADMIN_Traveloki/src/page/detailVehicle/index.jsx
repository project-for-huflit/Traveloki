import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setSelectedRow } from '../../redux/slice/vehicleSlice';

function detailVehicle() {


  const navigate = useNavigate();

  const selectedRow = useSelector((store) => store.vehicle.selectedRow);
  console.log('selectedRow::', selectedRow);

  if (!selectedRow) {
    return (
      <div className="mt-20 font-semibold text-2xl">
        Không tìm thấy dữ liệu phương tiện.
      </div>
    );
  }

  const ListInput = [
    {
      label: 'Tên phương tiện',
      placeHolder: `${selectedRow.TenPhuongTien}`,
    },
    {
      label: 'Loại phương tiện',
      placeHolder: `${selectedRow.LoaiPT}`,
    },
    {
      label: 'Sân bay hoạt động',
      placeHolder: `${selectedRow.MaSB.TenSanBay}`,
    },
    {
      label: 'Thành phố',
      placeHolder: `${selectedRow.MaSB.ThanhPho}`,
    },
    {
      label: 'Số ghế',
      placeHolder: `${selectedRow.SoGheToiDa}`,
    },
    {
      label: 'Biển Số',
      placeHolder: `${selectedRow.MaSoXe}`,
    },
    {
      label: 'Hình ảnh',
      placeHolder: `${selectedRow.Image}`,
    },
  ];

  const handleUpdateVehicle = () => {
    alert("i'm fine, OK!")
  }
  return (
    <div className="w-full flex justify-center items-start mt-6">
      {/* Center */}
      <div className="w-[1222px]">
        <div className="w-full px-[42px] py-[41px] border-[#dee0e2] border-[1px] rounded-2xl justify-center items-center flex">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full">
              <div className="text-[#212121] text-[32px] font-semibold font-['Roboto'] leading-normal mb-4">
                Thông tin chi tiết phương tiện công cộng
              </div>
              <div className="">
                <form>
                  <div className="grid grid-cols-2 gap-6">
                    {ListInput.map((label, index) => (
                      <div key={index} className="flex flex-col">
                        <label className="mb-2 text-gray-700">
                          {label.label}
                        </label>
                        <input
                          placeholder={label.placeHolder}
                          type="text"
                          className="p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                </form>
              </div>

              <Link to={'#'}>
                <div className="text-[#1c1c1c] text-[16px] font-black font-['Roboto'] underline leading-normal my-4">
                  Đổi mật khẩu
                </div>
              </Link>

              <div className="">
                <button onClick={handleUpdateVehicle}
                className="rounded-2xl py-2 bg-[#1E1E1E] w-full text-white text-2xl font-extrabold font-['Roboto'] leading-normal">
                  Cập nhật thông tin
                </button>
              </div>
            </div>
            {/* <AdminPanel /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default detailVehicle;
