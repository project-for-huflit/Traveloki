import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Popconfirm } from 'antd';
import { setSelectedRow } from '../../redux/slice/routeSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTuyenXe } from '../../services/api/TuyenXe/apiDanhSachTuyenXe';

function detailRoute() {
  const navigate = useNavigate();
  const [tuyenxe, setTuyenxe] = useState([]);
  const selectedRow = useSelector((store) => store.route.selectedRow);
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
      label: 'Điểm khởi hành',
      placeHolder: `${selectedRow.DiemKhoiHanh}`,
    },
    {
      label: 'Điểm kết thúc',
      placeHolder: `${selectedRow.DiemKetThuc}`,
    },
    {
      label: 'Thời gian khởi hành',
      placeHolder: `${selectedRow.ThoiGianKhoiHanh}`,
    },
    {
      label: 'Thời gian kết thúc',
      placeHolder: `${selectedRow.ThoiGianKetThuc}`,
    },
  ];

  const listWaypoint = [{}];

  const handleUpdateVehicle = () => {
    alert("i'm fine, OK!");
  };

  const handleDeleteTuyenXe = async (_id) => {
    try {
      const res = await deleteTuyenXe(_id);
      if (res.ok) {
        alert('Xóa thành công');
        setTuyenxe((prev) => prev.filter((tuyenXe) => tuyenXe._id !== _id));
      } else {
        const { message } = await res.json();
        alert(`Xóa thất bại: ${message}`);
      }
    } catch (error) {
      console.error('Error deleting route:', error);
      alert('Đã xảy ra lỗi khi xóa tuyến');
    }
  };
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('user'));
    const roles = users?.roles?.[0];
    if (roles === 'ADMIN') {
      setIsAdmin(true);
    }
  }, []);
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
              <div className="mb-8">
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

              <div className="text-[#1c1c1c] text-[18px] font-black font-['Roboto'] leading-normal my-8">
                  Danh sách trạm dừng
              </div>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                      <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                        Mã trạm dừng
                      </TableCell>
                      <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                      Tên trạm dừng
                      </TableCell>
                      <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                        Quãng đường
                      </TableCell>
                      <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                        Giá vé
                      </TableCell>
                      {!isAdmin && (
                        <TableCell
                          sx={{ color: '#1a73e8', fontWeight: 'bold' }}
                        >
                          Hành động
                        </TableCell>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedRow.tramDungs.map((tram) => (
                      <TableRow
                        key={tram._id}
                        sx={{ '&:hover': { backgroundColor: '#e3f2fd' } }}
                      >
                        <TableCell>{tram.MaTramDung}</TableCell>
                        <TableCell>{tram.TenTramDung}</TableCell>
                        <TableCell>{tram.SoKM}</TableCell>
                        <TableCell>{tram.GiaVe}</TableCell>
                        {!isAdmin && (
                          <TableCell>
                            <Popconfirm
                              title="Bạn có chắc chắn muốn xóa tuyến xe này?"
                              onConfirm={() => handleDeleteTuyenXe(tram._id)}
                              okText="Có"
                              cancelText="Không"
                            >
                              <IconButton color="error">
                                <DeleteIcon />
                              </IconButton>
                            </Popconfirm>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

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
          </div>
        </div>
      </div>
    </div>
  );
}

export default detailRoute;
