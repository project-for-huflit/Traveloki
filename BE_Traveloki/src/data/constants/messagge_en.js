const SUCCESS_MESSAGES = {
  PHIEU_DAT_TAU_RETRIEVED: 'Phiếu đặt tàu đã được lấy thành công.',
  USER_LOGGED_IN: 'Đăng nhập thành công.',
  DATA_SAVED: 'Dữ liệu đã được lưu thành công.',
};

const ERROR_MESSAGES = {
  PHIEU_DAT_TAU_NOT_FOUND: 'Không tìm thấy phiếu đặt tàu.',
  SERVER_ERROR: 'Lỗi server, vui lòng thử lại sau.',
  UNAUTHORIZED_ACCESS: 'Bạn không có quyền truy cập vào tài nguyên này.',
  INVALID_INPUT: 'Dữ liệu đầu vào không hợp lệ.',
};

exports.module = {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES
}
