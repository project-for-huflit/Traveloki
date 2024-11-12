import { useEffect, useState } from 'react';
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
import {
  deleteTuyenXe,
  fetchAllTuyenXe,
} from '../../services/api/TuyenXe/apiDanhSachTuyenXe';
import { Link } from 'react-router-dom';
import { Popconfirm } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import slugify from 'slugify';
import { setSelectedRow } from '../../redux/slice/routeSlice';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const DanhSachTuyenXe = () => {
  const dispatch = useDispatch();

  const [tuyenxe, setTuyenxe] = useState([]);

  useEffect(() => {
    const fetchTuyenXe = async () => {
      try {
        const res = await fetchAllTuyenXe();
        setTuyenxe(res.data || []);
      } catch (error) {
        console.error('Không thể lấy dữ liệu phương tiện:', error);
      }
    };
    fetchTuyenXe();
  }, []);

  console.log('check tuyenxe', tuyenxe);
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

  const handleRowClick = (row) => {
    dispatch(setSelectedRow(row));
  };

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
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
            {tuyenxe.map((tuyenXe) => (
              <TableRow
                component={Link}
                to={`${slugify(`${tuyenXe.DiemKhoiHanh}` + `-` + `${tuyenXe.DiemKetThuc}`, { lower: true, strict: true })}`}
                key={tuyenXe._id}
                sx={{ '&:hover': { backgroundColor: '#e3f2fd' } }}
                onClick={() => handleRowClick(tuyenXe)}
              >
                <TableCell>{tuyenXe.MaTuyen}</TableCell>
                <TableCell>{tuyenXe.DiemKhoiHanh}</TableCell>
                <TableCell>{tuyenXe.DiemKetThuc}</TableCell>
                <TableCell>
                  {tuyenXe.ThoiGianKhoiHanh} - {tuyenXe.ThoiGianKetThuc}
                </TableCell>
                <TableCell>{tuyenXe.tramDungs.length}</TableCell>
                {!isAdmin && (
                  <TableCell>
                    <Popconfirm
                      title="Bạn có chắc chắn muốn xóa tuyến xe này?"
                      onConfirm={() => handleDeleteTuyenXe(tuyenXe._id)}
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

      <div className="mt-12 flex justify-center items-center">
        <Stack spacing={2}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
      </div>
    </div>
  );
};

export default DanhSachTuyenXe;
