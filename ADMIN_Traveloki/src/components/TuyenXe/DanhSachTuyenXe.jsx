import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTuyenXe, fetchAllTuyenXe } from "../../services/api/TuyenXe/apiDanhSachTuyenXe";
import { Link } from "react-router-dom";
import { Popconfirm } from "antd";

const DanhSachTuyenXe = () => {
  const [tuyenxe, setTuyenxe] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const formatDateTime = (isoString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(isoString).toLocaleString("vi-VN", options);
  };

  useEffect(() => {
    fetchTuyenXe();
  }, []);

  const fetchTuyenXe = async () => {
    try {
      const res = await fetchAllTuyenXe();
      setTuyenxe(res.tuyen || []);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTuyenXe = async (_id) => {
    try {
      const res = await deleteTuyenXe(_id);
      if (res.ok) {
        alert("Xóa thành công");
        setTuyenxe(prev => prev.filter((tuyenXe) => tuyenXe._id !== _id));
      } else {
        const { message } = await res.json();
        alert(`Xóa thất bại: ${message}`);
      }
    } catch (error) {
      console.error("Error deleting route:", error);
      alert("Đã xảy ra lỗi khi xóa tuyến");
    }
  };

  if (isLoading)
    return (
      <div className="text-center text-4xl translate-y-1/2 h-full font-extrabold">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-4xl translate-y-1/2 h-full font-extrabold">
        Error: {error}
      </div>
    );

  return (
    <div className="w-auto h-full bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-black text-4xl">Danh sách tuyến xe</h1>
        <Link to="/road/list/create">
          <Button variant="contained" color="primary">Thêm tuyến xe</Button>
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>Mã tuyến xe</TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>Điểm khởi hành</TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>Điểm kết thúc</TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>Thời gian khởi hành</TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>Thời gian kết thúc</TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tuyenxe.map((tuyenXe) => (
              <TableRow key={tuyenXe._id} sx={{ '&:hover': { backgroundColor: '#e3f2fd' } }}>
                <TableCell>{tuyenXe.MaTuyen}</TableCell>
                <TableCell>{tuyenXe.DiemSanBay}</TableCell>
                <TableCell>{tuyenXe.DiemKetThuc}</TableCell>
                <TableCell>{formatDateTime(tuyenXe.ThoiGianKhoiHanh)}</TableCell>
                <TableCell>{formatDateTime(tuyenXe.ThoiGianKetThuc)}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DanhSachTuyenXe;
