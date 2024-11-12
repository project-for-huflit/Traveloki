import { Link } from "react-router-dom";

function profilePanel() {
  const ListInput = [
    {
      label: "Tên phương tiện",
      placeHolder: "Nguyễn",
    },
    {
      label: "Loại phương tiện",
      placeHolder: "Việt Nam",
    },
    {
      label: "Sân bay hoạt động",
      placeHolder: "A",
    },
    {
      label: "Thành phố",
      placeHolder: "HCM",
    },
    {
      label: "Số ghế",
      placeHolder: "nguyenvân@gmail.com",
    },
    {
      label: "Biển Số",
      placeHolder: "q.12",
    },
    {
      label: "Hình ảnh",
      placeHolder: "0374444252",
    },

  ];
  return (
    <div className="w-full">
      <div className="text-[#212121] text-[32px] font-semibold font-['Roboto'] leading-normal mb-4">
        Thông tin chi tiết phương tiện
      </div>
      <div className="">
        <form>
          <div className="grid grid-cols-2 gap-6">
            {ListInput.map((label, index) => (
              <div key={index} className="flex flex-col">
                <label className="mb-2 text-gray-700">{label.label}</label>
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

      <Link to={"#"}>
        <div className="text-[#1c1c1c] text-[16px] font-black font-['Roboto'] underline leading-normal my-4">
          Đổi mật khẩu
        </div>
      </Link>

      <div className="">
        <button className="rounded-2xl py-2 bg-[#1E1E1E] w-full text-white text-2xl font-extrabold font-['Roboto'] leading-normal">
          Cập nhật thông tin
        </button>
      </div>
    </div>
  );
}

export default profilePanel;
