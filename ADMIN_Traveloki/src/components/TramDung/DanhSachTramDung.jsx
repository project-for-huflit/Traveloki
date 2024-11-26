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
  fetchTramDungPartern,
  fetchAllTramDung,
  deleteTramDung,
} from '../../services/api/TramDung/apiDanhSachTramDung';
import { Modal as AntdModal, notification } from 'antd';

import { useDispatch } from 'react-redux';
import slugify from 'slugify';
import { setSelectedRow } from '../../redux/slice/vehicleSlice';

const DanhSachTramDung = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('user'));
    const roles = users?.roles?.[0];
    if (roles === 'ADMIN') {
      setIsAdmin(true);
    }
  }, []);
  const dispatch = useDispatch();

  const [tramDung, setTramDung] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tramToDelete, setTramToDelete] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      const danhSachTramDung = async () => {
        try {
          const res = await fetchTramDungPartern(userId);
          setTramDung(res.data.tramDung);
        } catch (error) {
          console.error('Không thể lấy dữ liệu trạm dừng:', error);
        }
      };
      danhSachTramDung();
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      const danhSachTramDung = async () => {
        try {
          const res = await fetchAllTramDung();
          setTramDung(res.data);
        } catch (error) {
          console.error('Không thể lấy dữ liệu trạm dừng:', error);
        }
      };
      danhSachTramDung();
    }
  }, [isAdmin]);

  const showModal = (tram) => {
    setTramToDelete(tram);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (tramToDelete) {
      try {
        const res = await deleteTramDung(tramToDelete._id);
        if (res && res.EC === 0) {
          notification.success({
            message: 'Xóa trạm dừng',
            description: 'Xóa trạm dừng thành công',
          });
          setTramDung((prev) =>
            prev.filter((tram) => tram._id !== tramToDelete._id),
          );
        } else {
          alert(res.EM);
        }
      } catch (error) {
        console.error('Error deleting tram dung:', error);
        alert('Đã xảy ra lỗi khi xóa trạm dừng');
      }
    }
    setIsModalVisible(false);
    setTramToDelete(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setTramToDelete(null);
  };

  const handleRowClick = (row) => {
    dispatch(setSelectedRow(row));
  };

  return (
    <div className="w-auto h-full bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-black text-4xl">Danh sách trạm dừng</h1>
        {!isAdmin && (
          <Link to="/waypoint/list/create">
            <Button variant="contained" color="primary">
              Thêm trạm dừng
            </Button>
          </Link>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Mã Trạm
              </TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Thành phố
              </TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Tên Trạm Dừng
              </TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Địa Chỉ
              </TableCell>
              {!isAdmin && (
                <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                  Hành động
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {tramDung.map((tram) => (
              <TableRow
                component={Link}
                to={`${slugify(tram.TenTramDung, { lower: true, strict: true })}`}
                key={tram._id}
                sx={{ '&:hover': { backgroundColor: '#e3f2fd' } }}
                onClick={() => handleRowClick(tram)}
              >
                <TableCell>{tram.MaTramDung}</TableCell>
                <TableCell>{tram.ThanhPho}</TableCell>
                <TableCell>{tram.TenTramDung}</TableCell>
                <TableCell>{tram.DiaChi}</TableCell>
                {!isAdmin && (
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={(e) => {
                        e.preventDefault();
                        showModal(tram);
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

      {/* Modal xác nhận xóa */}
      <AntdModal
        title="Xác nhận xóa"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Có"
        cancelText="Không"
      >
        <p>Bạn có chắc chắn muốn xóa trạm dừng này?</p>
      </AntdModal>
    </div>
  );
};

export default DanhSachTramDung;
