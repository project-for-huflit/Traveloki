'use strict';

class BaseVehicleService {
  // Tạo constructor truyền vào tham số type là loại phương tiện
  constructor(type)  {
    this.type = type;
  }
  // Hàm tạo phương tiện
  createVehicle (data){
    throw new Error('This method must be implemented');
  }
}

module.exports = BaseVehicleService;