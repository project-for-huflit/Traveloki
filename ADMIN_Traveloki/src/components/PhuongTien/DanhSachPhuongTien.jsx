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
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import {
  fetchAllPhuongTien,
  deletePhuongTien,
} from '../../services/api/PhuongTien/apiDanhSachPhuongTien'; // API của phương tiện
import { Modal as AntdModal, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { setSelectedRow } from '../../redux/slice/vehicleSlice';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const DanhSachPhuongTien = () => {
  const dispatch = useDispatch();
  const [phuongTien, setPhuongTien] = useState([]); // Trạng thái lưu danh sách phương tiện
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal
  const [phuongTienToDelete, setPhuongTienToDelete] = useState(null); // Trạng thái lưu phương tiện cần xóa

  useEffect(() => {
    const danhSachPhuongTien = async () => {
      try {
        const res = await fetchAllPhuongTien();
        setPhuongTien(res.data || []);
      } catch (error) {
        console.error('Không thể lấy dữ liệu phương tiện:', error);
      }
    };
    danhSachPhuongTien();
  }, []);

  // Hàm hiển thị Modal xác nhận xóa
  const showModal = (phuongTien) => {
    setPhuongTienToDelete(phuongTien);
    setIsModalVisible(true);
  };

  // Hàm xử lý xóa phương tiện
  const handleOk = async () => {
    if (phuongTienToDelete) {
      try {
        const res = await deletePhuongTien(phuongTienToDelete._id); // Xóa phương tiện dựa trên ID
        console.log("res",res)
        if (res) {
          notification.success({
            message: 'Xóa phương tiện',
            description: 'Xóa phương tiện thành công',
          });
          setPhuongTien((prev) =>
            prev.filter(
              (phuongTien) => phuongTien._id !== phuongTienToDelete._id
            )
          ); // Cập nhật danh sách sau khi xóa
        } else {
          alert(res.EM);
        }
      } catch (error) {
        console.error('Error deleting phuong tien:', error);
        alert('Đã xảy ra lỗi khi xóa phương tiện');
      }
    }
    setIsModalVisible(false); // Ẩn Modal sau khi xóa
    setPhuongTienToDelete(null); // Reset phương tiện cần xóa
  };

  // Hàm hủy bỏ xóa
  const handleCancel = () => {
    setIsModalVisible(false); // Ẩn Modal
    setPhuongTienToDelete(null); // Reset phương tiện cần xóa
  };

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('user'));
    const roles = users?.roles?.[0];
    if (roles === 'ADMIN') {
      setIsAdmin(true);
    }
  }, []);

  // const slug = slugify(title, { lower: true, strict: true })
  // const productPath = `${slug}`;
  //<Link to={`${slugify(phuongTien.TenPhuongTien, { lower: true, strict: true })}`} >


  const handleRowClick = (row) => {
    // row.preventDefault()
    dispatch(setSelectedRow(row));
  };

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  return (
    <div className="w-auto h-full bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-black text-4xl">Danh sách phương tiện công cộng</h1>
        {!isAdmin && (
          <Link to="/vehicle/list/create">
            <Button variant="contained" color="primary">
              Thêm phương tiện
            </Button>
          </Link>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Mã PT
              </TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Tên Phương Tiện
              </TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Loại PT
              </TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Sân bay hoạt động
              </TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Số ghế{' '}
              </TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Biển Số
              </TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Hình ảnh
              </TableCell>
              {!isAdmin && (
                <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                  Hành động
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {phuongTien.map((phuongTien) => (
              <TableRow
                // component={Link}
                // to={`${slugify(phuongTien.TenPhuongTien, { lower: true, strict: true })}`} // URL đến chi tiết phương tiện
                key={phuongTien._id}
                sx={{
                  '&:hover': { backgroundColor: '#e3f2fd' },
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
                // onClick={() => handleRowClick(phuongTien)}
              >
                <TableCell>{phuongTien.MaPT}</TableCell>
                <TableCell>{phuongTien.TenPhuongTien}</TableCell>
                <TableCell>{phuongTien.LoaiPT}</TableCell>
                <TableCell>{phuongTien.MaSB.TenSanBay}</TableCell>
                <TableCell>{phuongTien.SoGheToiDa}</TableCell>
                <TableCell>{phuongTien.MaSoXe}</TableCell>
                <TableCell>
                  <img
                    src={phuongTien.Image}
                    alt={phuongTien.TenPhuongTien}
                    style={{ width: '100px', height: 'auto' }}
                  />
                </TableCell>
                {!isAdmin && (
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation(); // Ngăn sự kiện click lan ra hàng
                        showModal(phuongTien);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="mt-12 flex justify-center items-center">
        <Stack spacing={2}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
      </div>

      {/* Modal xác nhận xóa */}
      <AntdModal
        title="Xác nhận xóa"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa phương tiện này?</p>
      </AntdModal>
    </div>
  );
};

export default DanhSachPhuongTien;
