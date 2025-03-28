const Vehicle = require('./vehicle.service');

class Bus extends Vehicle {
    constructor(options){
        super(options);
    }

    info(){
        console.log(`${this.tenPhuongTien} (${this.maSoXe}) - ${this.soGheToiDa} chỗ - ${this.maSB}`);
    }
}

module.exports = Bus;
