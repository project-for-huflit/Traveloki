import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { fetchAllPhuongTien, deletePhuongTien } from "../../services/api/PhuongTien/apiDanhSachPhuongTien"; // API của phương tiện
import { Modal as AntdModal, notification } from "antd";

const DanhSachPhuongTien = () => {
  const [phuongTien, setPhuongTien] = useState([]); // Trạng thái lưu danh sách phương tiện
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal
  const [phuongTienToDelete, setPhuongTienToDelete] = useState(null); // Trạng thái lưu phương tiện cần xóa

  useEffect(() => {
    const danhSachPhuongTien = async () => {
      try {
        const res = await fetchAllPhuongTien();
        setPhuongTien(res.data || []);
      } catch (error) {
        console.error("Không thể lấy dữ liệu phương tiện:", error);
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
        if (res && res.EC === 0) {
          notification.success({
            message: "Xóa phương tiện",
            description: "Xóa phương tiện thành công"
          });
          setPhuongTien((prev) => prev.filter((phuongTien) => phuongTien._id !== phuongTienToDelete._id)); // Cập nhật danh sách sau khi xóa
        } else {
          alert(res.EM);
        }
      } catch (error) {
        console.error("Error deleting phuong tien:", error);
        alert("Đã xảy ra lỗi khi xóa phương tiện");
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

  return (
    <div className="w-auto h-full bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-black text-4xl">Danh sách phương tiện</h1>
        <Link to="/vehicle/list/create">
          <Button variant="contained" color="primary">Thêm phương tiện</Button>
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>Mã PT</TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>Tên Phương Tiện</TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>Loại PT</TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>Sân bay hoạt động</TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>Số ghế </TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>Biển Số</TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>Hình ảnh</TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {phuongTien.map((phuongTien) => (
              <TableRow key={phuongTien._id} sx={{ '&:hover': { backgroundColor: '#e3f2fd' } }}>
                <TableCell>{phuongTien.MaPT}</TableCell>
                <TableCell>{phuongTien.TenPhuongTien}</TableCell>
                <TableCell>{phuongTien.LoaiPT}</TableCell>
                <TableCell>{phuongTien.MaSB.TenSanBay}</TableCell>
                <TableCell>{phuongTien.SoGheToiDa}</TableCell>
                <TableCell>{phuongTien.MaSoXe}</TableCell>
                <TableCell> <img
                  src={phuongTien.Image}
                  alt={phuongTien.TenPhuongTien}
                  style={{width: '100px', height: 'auto'}}
                /></TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => showModal(phuongTien)}>
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
        <p>Bạn có chắc chắn muốn xóa phương tiện này?</p>
      </AntdModal>
    </div>
  );
};

export default DanhSachPhuongTien;
