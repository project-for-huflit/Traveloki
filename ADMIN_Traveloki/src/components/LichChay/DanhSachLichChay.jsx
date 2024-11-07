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
import { Modal as AntdModal, notification } from 'antd';
import {
  deleteLichChay,
  fetchAllLichChay,
} from '../../services/api/LichChay/apiDanhSachLichChay.js';

const DanhSachLichChay = () => {
  const [lichChay, setLichChay] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lichChayToDelete, setLichChayToDelete] = useState(null);

  useEffect(() => {
    const DanhSachLichChay = async () => {
      try {
        const res = await fetchAllLichChay();
        setLichChay(res.data || []);
      } catch (error) {
        console.error('Không thể lấy dữ liệu lịch chạy:', error);
      }
    };
    DanhSachLichChay();
  }, []);

  const showModal = (lichChay) => {
    setLichChayToDelete(lichChay);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (lichChayToDelete) {
      try {
        const res = await deleteLichChay(lichChayToDelete._id); // Xóa lịch chạy dựa trên ID
        if (res && res.EC === 0) {
          notification.success({
            message: 'Xóa lịch chạy',
            description: 'Xóa lịch chạy thành công',
          });
          setLichChay((prev) =>
            prev.filter((lichChay) => lichChay._id !== lichChayToDelete._id),
          ); // Cập nhật danh sách sau khi xóa
        } else {
          alert(res.EM);
        }
      } catch (error) {
        console.error('Error deleting phuong tien:', error);
        alert('Đã xảy ra lỗi khi xóa lịch chạy');
      }
    }
    setIsModalVisible(false);
    setLichChayToDelete(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setLichChayToDelete(null);
  };

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('user'));
    const roles = users?.roles?.[0];
    if (roles === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  return (
    <div className="w-auto h-full bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-black text-4xl">Danh sách lịch chạy</h1>
        {!isAdmin && (
          <Link to="/schedule/list/create">
            <Button variant="contained" color="primary">
              Thêm lịch chạy
            </Button>
          </Link>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                STT
              </TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Tuyến
              </TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Loại PT
              </TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Ngày khởi hành
              </TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Số lượng vé
              </TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Giờ hoạt động
              </TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lichChay.map((lichChay, index) => (
              <TableRow
                key={lichChay._id}
                sx={{ '&:hover': { backgroundColor: '#e3f2fd' } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{lichChay.MaTuyen.MaTuyen}</TableCell>
                <TableCell>
                  {lichChay.MaPT.LoaiPT} - {lichChay.MaPT.MaSoXe}
                </TableCell>
                <TableCell>{lichChay.ngayKhoiHanh}</TableCell>
                <TableCell>
                  {lichChay.SLVeConLai}/{lichChay.SLVe}
                </TableCell>
                <TableCell>
                  {lichChay.gioKhoiHanh} - {lichChay.gioKetThuc}
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => showModal(lichChay)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal xác nhận xóa */}
      <AntdModal
        title="Xác nhận xóa"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Có"
        cancelText="Không"
      >
        <p>Bạn có chắc chắn muốn xóa lịch chạy này?</p>
      </AntdModal>
    </div>
  );
};

export default DanhSachLichChay;
