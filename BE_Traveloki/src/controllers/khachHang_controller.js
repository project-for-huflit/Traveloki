const { KhachHang } = require("../models/khachHang.model");

const { OK, CREATED, SuccessResponse  } = require("../middlewares/success.response")

const asyncHandler = require('../middlewares/asyncHandler.middeware')

class CustomerController {

}
// module.exports = new CustomerController()

const GetKhachHang = async (req, res) => {
  try {
    const khachHang = await KhachHang.find({});
    res.status(200).json({ khachHang });
  } catch (e) {
    res.status(500).json("not get khach hang");
  }
};

module.exports = GetKhachHang;
