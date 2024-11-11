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
    alert("i'm fine, OK!");
  };
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

                  {/* ==================================================================================== */}
                  <div className="bg-gray-300 h-[80vh] sm:px-8 py-8 mt-8 rounded-lg">
                    <main className="container mx-auto max-w-screen-lg h-full">
                      {/* <!-- file upload modal --> */}
                      <article
                        aria-label="File Upload Modal"
                        className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
                        onDrop="dropHandler(event);"
                        onDragOver="dragOverHandler(event);"
                        onDragLeave="dragLeaveHandler(event);"
                        onDragEnter="dragEnterHandler(event);"
                      >
                        {/* <!-- overlay --> */}
                        <div
                          id="overlay"
                          className="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md"
                        >
                          <i>
                            <svg
                              className="fill-current w-12 h-12 mb-3 text-blue-700"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
                            </svg>
                          </i>
                          <p className="text-lg text-blue-700">
                            Drop files to upload
                          </p>
                        </div>

                        {/* <!-- scroll area --> */}
                        <section className="h-full overflow-auto p-8 w-full flex flex-col">
                          <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                            <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                              <span>Drag and drop your</span>&nbsp;
                              <span>files anywhere or</span>
                            </p>
                            <input
                              id="hidden-input"
                              type="file"
                              multiple
                              className="hidden"
                            />
                            <button
                              id="button"
                              className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                            >
                              Upload a file
                            </button>
                          </header>

                          <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                            To Upload
                          </h1>

                          <ul
                            id="gallery"
                            className="flex flex-1 flex-wrap -m-1"
                          >
                            <li
                              id="empty"
                              className="h-full w-full text-center flex flex-col items-center justify-center"
                            >
                              <img
                                className="mx-auto w-32"
                                src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                                alt="no data"
                              />
                              <span className="text-small text-gray-500">
                                No files selected
                              </span>
                            </li>
                          </ul>
                        </section>

                        {/* <!-- sticky footer --> */}
                        <footer className="flex justify-end px-8 pb-8 pt-4">
                          <button
                            id="submit"
                            className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
                          >
                            Upload now
                          </button>
                          <button
                            id="cancel"
                            className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                          >
                            Cancel
                          </button>
                        </footer>
                      </article>
                    </main>
                  </div>

                  {/* <!-- using two similar templates for simplicity in js code --> */}
                  <template id="file-template">
                    <li className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
                      <article
                        tabIndex="0"
                        className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline elative bg-gray-100 cursor-pointer relative shadow-sm"
                      >
                        <img
                          alt="upload preview"
                          className="img-preview hidden w-full h-full sticky object-cover rounded-md bg-fixed"
                        />

                        <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                          <h1 className="flex-1 group-hover:text-blue-800"></h1>
                          <div className="flex">
                            <span className="p-1 text-blue-800">
                              <i>
                                <svg
                                  className="fill-current w-4 h-4 ml-auto pt-1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                                </svg>
                              </i>
                            </span>
                            <p className="p-1 size text-xs text-gray-700"></p>
                            <button className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md text-gray-800">
                              <svg
                                className="pointer-events-none fill-current w-4 h-4 ml-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  className="pointer-events-none"
                                  d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                                />
                              </svg>
                            </button>
                          </div>
                        </section>
                      </article>
                    </li>
                  </template>

                  <template id="image-template">
                    <li className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
                      <article
                        tabIndex="0"
                        className="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm"
                      >
                        <img
                          alt="upload preview"
                          className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
                        />

                        <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                          <h1 className="flex-1"></h1>
                          <div className="flex">
                            <span className="p-1">
                              <i>
                                <svg
                                  className="fill-current w-4 h-4 ml-auto pt-"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
                                </svg>
                              </i>
                            </span>

                            <p className="p-1 size text-xs"></p>
                            <button className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md">
                              <svg
                                className="pointer-events-none fill-current w-4 h-4 ml-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  className="pointer-events-none"
                                  d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                                />
                              </svg>
                            </button>
                          </div>
                        </section>
                      </article>
                    </li>
                  </template>
                  {/* ========================================================================================================= */}
                </form>
              </div>

              <Link to={'#'}>
                <div className="text-[#1c1c1c] text-[16px] font-black font-['Roboto'] underline leading-normal my-8">
                  {/* Đổi mật khẩu */}
                </div>
              </Link>

              <div className="">
                <button
                  onClick={handleUpdateVehicle}
                  className="rounded-2xl py-2 bg-[#1976D2] hover:bg-[#3381cf] w-full text-white text-2xl font-bold font-['Roboto'] leading-normal"
                >
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
