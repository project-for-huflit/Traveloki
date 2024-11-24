import { useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom';
import { Modal as AntdModal, notification } from 'antd';
import {
  deleteTuyenXe,
  fetchAllTuyenXe,
} from '../../services/api/TuyenXe/apiDanhSachTuyenXe';
import slugify from 'slugify';
import { useDispatch } from 'react-redux';
import { setSelectedRow } from '../../redux/slice/routeSlice';

const DanhSachTuyenXe = () => {
  const dispatch = useDispatch();
  const [tuyenXe, setTuyenXe] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAllTuyenXe();
        setTuyenXe(res.data || []);
      } catch (error) {
        console.error('Không thể lấy dữ liệu tuyến xe:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('user'));
    const roles = users?.roles?.[0];
    if (roles === 'ADMIN') {
      setIsAdmin(true);
    }
  }, []);

  const showModal = (route) => {
    setRouteToDelete(route);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (routeToDelete) {
      try {
        const res = await deleteTuyenXe(routeToDelete._id);
        if (res && res.EC === 0) {
          notification.success({
            message: 'Xóa tuyến xe',
            description: 'Xóa tuyến xe thành công',
          });
          setTuyenXe((prev) =>
            prev.filter((tuyen) => tuyen._id !== routeToDelete._id),
          );
        } else {
          notification.error({
            message: 'Lỗi xóa tuyến xe',
            description: res.EM || 'Không thể xóa tuyến xe',
          });
        }
      } catch (error) {
        console.error('Error deleting route:', error);
        notification.error({
          message: 'Lỗi hệ thống',
          description: 'Đã xảy ra lỗi khi xóa tuyến xe',
        });
      }
    }
    setIsModalVisible(false);
    setRouteToDelete(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setRouteToDelete(null);
  };

  const handleRowClick = (row) => {
    dispatch(setSelectedRow(row));
  };

  return (
    <div className="w-auto h-full bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-black text-4xl">Danh sách tuyến xe</h1>
        {!isAdmin && (
          <Link to="/road/list/create">
            <Button variant="contained" color="primary">
              Thêm tuyến xe
            </Button>
          </Link>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Mã tuyến
              </TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Điểm khởi hành
              </TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Điểm kết thúc
              </TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Thời gian hoạt động
              </TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                Số trạm dừng
              </TableCell>
              {!isAdmin && (
                <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
                  Hành động
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {tuyenXe.map((route) => (
              <TableRow
                component={Link}
                to={`${slugify(
                  `${route.DiemKhoiHanh}-${route.DiemKetThuc}`,
                  { lower: true, strict: true },
                )}`}
                key={route._id}
                sx={{ '&:hover': { backgroundColor: '#e3f2fd' } }}
                onClick={() => handleRowClick(route)}
              >
                <TableCell>{route.MaTuyen}</TableCell>
                <TableCell>{route.DiemKhoiHanh}</TableCell>
                <TableCell>{route.DiemKetThuc}</TableCell>
                <TableCell>
                  {route.ThoiGianKhoiHanh} - {route.ThoiGianKetThuc}
                </TableCell>
                <TableCell>{route.tramDungs.length}</TableCell>
                {!isAdmin && (
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={(e) => {
                        e.preventDefault();
                        showModal(route);
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
        <p>Bạn có chắc chắn muốn xóa tuyến xe này?</p>
      </AntdModal>
    </div>
  );
};

export default DanhSachTuyenXe;
