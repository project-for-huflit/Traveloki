const BookingHistoryFacade = require("../services/bookingHistoryFacade.service");

const getHistory = async (req, res) => {
  try {
    const { type } = req.params;
    const history = await BookingHistoryFacade.getService(type).getAll();
    res.status(200).json({ history });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy lịch sử", error });
  }
};

const createHistory = async (req, res) => {
  try {
    const { type } = req.params;
    const newHistory = await BookingHistoryFacade.getService(type).create(req.body);
    res.status(201).json({ newHistory });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo lịch sử", error });
  }
};

const deleteHistory = async (req, res) => {
  try {
    const { type, id } = req.params;
    await BookingHistoryFacade.getService(type).delete(id);
    res.status(200).json({ message: "Xóa lịch sử thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa lịch sử", error });
  }
};

const updateHistory = async (req, res) => {
  try {
    const { type, id } = req.params;
    const updatedHistory = await BookingHistoryFacade.getService(type).update(id, req.body);
    res.status(200).json({ updatedHistory });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật lịch sử", error });
  }
};

module.exports = {
  getHistory,
  createHistory,
  deleteHistory,
  updateHistory,
};
